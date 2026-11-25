"""Turn downloaded cuberto.com/projects/<slug>/ pages into src/components/sites/cuberto/cases/cases.json.

Usage: python3 scripts/cuberto-cases.py <dir-with-slug.html-files>

Each case study is a sequence of the site's section components (Tophead, Preview, Overview,
Splitshow, Feedback, Nextcase). Media paths are rewritten to /sites/cuberto/cases/... and must
already exist under public/ (see docs/research/cuberto/page-brief.md).
"""

import html
import json
import os
import re
import sys
from html.parser import HTMLParser

PUBLIC = "public/sites/cuberto/cases"
LOCAL = "/sites/cuberto/cases"
VOID = {"br", "img", "source", "meta", "link", "input", "hr"}


class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    @property
    def cls(self):
        return self.attrs.get("class", "").split()

    def find_all(self, pred):
        out = []
        for c in self.children:
            if isinstance(c, Node):
                if pred(c):
                    out.append(c)
                out.extend(c.find_all(pred))
        return out

    def find(self, pred):
        r = self.find_all(pred)
        return r[0] if r else None

    def kids(self):
        return [c for c in self.children if isinstance(c, Node)]


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", [])
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def has(cls):
    return lambda n: cls in n.cls


def local(src):
    """Source /assets/projects/... URL → local public path (query stripped, real extension)."""
    path = src.split("?")[0].replace("/assets/projects/", "", 1)
    if not os.path.exists(os.path.join(PUBLIC, path)):
        stem = os.path.splitext(path)[0]
        for ext in (".png", ".jpg", ".webp", ".mp4"):
            if os.path.exists(os.path.join(PUBLIC, stem + ext)):
                path = stem + ext
                break
        else:
            raise SystemExit(f"missing media {src}")
    return f"{LOCAL}/{path}"


def media(n):
    v = n.find(lambda x: x.tag == "video")
    if v:
        return {"type": "video", "src": local(v.attrs["src"])}
    img = n.find(lambda x: x.tag == "img")
    return {"type": "image", "src": local(img.attrs["src"])}


def inline(n):
    """Rich inline content: strings, {"br": "desktop"|"always"}, {"a"|"strong"|"b": [...], "href"}."""
    out = []
    for c in n.children:
        if isinstance(c, str):
            t = re.sub(r"\s+", " ", c)
            if t:
                out.append(t)
        elif c.tag == "br":
            out.append({"br": "desktop" if "-gxs" in c.cls else "always"})
        elif c.tag in ("a", "strong", "b", "em", "span"):
            node = {"tag": c.tag, "children": inline(c)}
            if c.tag == "a":
                node["href"] = c.attrs.get("href")
            out.append(node if c.tag != "span" else {"tag": "span", "children": node["children"]})
    # trim
    while out and isinstance(out[0], str) and not out[0].strip():
        out.pop(0)
    if out and isinstance(out[0], str):
        out[0] = out[0].lstrip()
    while out and isinstance(out[-1], str) and not out[-1].strip():
        out.pop()
    if out and isinstance(out[-1], str):
        out[-1] = out[-1].rstrip()
    return out


def blocks(text_node):
    """Paragraphs and lists inside a `.text` element (the source nests <ul> in <p>)."""
    out = []
    for c in text_node.kids():
        if c.tag == "p":
            lists = c.find_all(lambda x: x.tag == "ul")
            if lists:
                items = [inline(li) for li in lists[0].find_all(lambda x: x.tag == "li")]
                out.append({"ul": items})
                continue
            content = inline(c)
            if content:
                out.append({"p": content})
        elif c.tag == "ul":
            out.append({"ul": [inline(li) for li in c.find_all(lambda x: x.tag == "li")]})
    return out


def tophead(sec):
    left = sec.find(has("-left"))
    h1 = left.find(lambda x: x.tag == "h1")
    h2 = left.find(lambda x: x.tag == "h2")
    out = {"name": "".join(t for t in inline(h1) if isinstance(t, str)), "title": inline(h2)}
    details = sec.find(has("details"))
    if details:
        out["details"] = []
        for d in details.find_all(has("detail")):
            cta = d.find(has("CtaButton"))
            a = d.find(lambda x: x.tag == "a")
            if cta:
                label = cta.find(lambda x: x.tag == "span" and "data-text" in x.attrs).attrs["data-text"]
                out["details"].append({"cta": label, "href": cta.attrs["href"]})
            elif a:
                out["details"].append({"text": html.unescape(a.attrs.get("title") or "".join(inline(a))), "href": a.attrs["href"]})
            else:
                out["details"].append({"text": "".join(t for t in inline(d) if isinstance(t, str))})
    return out


def preview(sec):
    main = sec.find(has("main"))
    out = {"type": "preview", "media": media(main)}
    if "-lg" in main.cls:
        out["lg"] = True
    if "-static" in main.cls:
        out["static"] = True
    label = main.find(has("label"))
    if label:
        out["label"] = "".join(t for t in inline(label) if isinstance(t, str))
    return out


def overview(sec):
    out = {"type": "overview"}
    if sec.attrs.get("id"):
        out["id"] = sec.attrs["id"]
    container = sec.find(has("Container"))
    for c in container.kids():
        if "header" in c.cls:
            out["header"] = inline(c.find(lambda x: x.tag in ("h2", "h3")))
        elif "divider" in c.cls:
            out["divider"] = True
        elif "grid" in c.cls:
            cap = c.find(has("caption"))
            if cap:
                h = cap.find(lambda x: x.tag in ("h2", "h3"))
                out["caption"] = {"tag": h.tag, "content": inline(h)}
            text = c.find(has("text"))
            if text:
                out["text"] = blocks(text)
            links = c.find(has("links"))
            if links:
                out["links"] = [
                    {"label": "".join(t for t in inline(a) if isinstance(t, str)) or a.find(lambda x: x.tag == "span").children[0].strip(),
                     "href": a.attrs["href"]}
                    for a in links.find_all(lambda x: x.tag == "a")
                ]
        elif "tiles" in c.cls:
            out["tiles"] = []
            for t in c.find_all(lambda x: "tile" in x.cls):
                cap = t.find(has("tile__caption"))
                body = t.find(has("tile__text"))
                out["tiles"].append({
                    "highlighted": "-highlighted" in t.cls,
                    "caption": "".join(s for s in inline(cap.find(lambda x: x.tag == "h3")) if isinstance(s, str)),
                    "text": blocks(body),
                })
    return out


def splitshow(sec):
    cols = []
    for col in sec.find(has("items")).kids():
        items = []
        for it in col.kids():
            prev = it.find(has("preview"))
            size = next((c[1:] for c in prev.cls if c.startswith("-")), None)
            item = {"media": media(prev)}
            if size:
                item["size"] = size
            cap = it.find(has("caption"))
            if cap:
                item["caption"] = inline(cap)
            items.append(item)
        cols.append({"side": "right" if "-right" in col.cls else "left", "items": items})
    return {"type": "splitshow", "cols": cols}


def feedback(sec):
    cap = sec.find(has("caption")).find(lambda x: x.tag in ("h2", "h3"))
    q = sec.find(lambda x: x.tag == "blockquote")
    name_el = q.find(has("author__name"))
    b = name_el.find(lambda x: x.tag == "b")
    rest = "".join(s for s in name_el.children if isinstance(s, str)).strip().lstrip(",").strip()
    out = {
        "type": "feedback",
        "caption": inline(cap),
        "name": "".join(s for s in inline(b) if isinstance(s, str)),
        "role": rest,
        "text": blocks(q.find(has("text"))),
    }
    cta = q.find(has("CtaButton"))
    if cta:
        out["review"] = cta.attrs["href"]
    return out


def parse(path):
    t = Tree()
    t.feed(open(path, encoding="utf-8").read())
    main = t.root.find(lambda n: n.tag == "main")
    title_el = t.root.find(lambda n: n.tag == "title")
    desc = t.root.find(lambda n: n.tag == "meta" and n.attrs.get("name") == "description")
    case = {"slug": os.path.basename(path)[:-5], "metaTitle": "".join(title_el.children).strip(),
            "metaDescription": desc.attrs.get("content", "") if desc else "", "sections": []}
    for sec in main.kids():
        if sec.tag != "section":
            continue
        kind = sec.cls[0]
        if kind == "TopheadSection":
            case.update(tophead(sec))
        elif kind == "PreviewSection":
            case["sections"].append(preview(sec))
        elif kind == "OverviewSection":
            case["sections"].append(overview(sec))
        elif kind == "SplitshowSection":
            case["sections"].append(splitshow(sec))
        elif kind == "FeedbackSection":
            case["sections"].append(feedback(sec))
        elif kind == "NextcaseSection":
            a = sec.find(has("reel"))
            case["next"] = a.attrs["href"].strip("/").split("/")[-1]
            # Cursor media while hovering the reel: the next project's card video, or its cover image
            # (already downloaded for the Projects page as covers/<slug>@2x.*).
            if "data-cursor-video" in a.attrs:
                case["nextMedia"] = {"type": "video", "src": local(a.attrs["data-cursor-video"])}
            else:
                covers = "public/sites/cuberto/projects/covers"
                name = next(f for f in os.listdir(covers) if f.startswith(case["next"] + "@2x."))
                case["nextMedia"] = {"type": "image", "src": f"/sites/cuberto/projects/covers/{name}"}
        else:
            raise SystemExit(f"{path}: unknown section {kind}")
    return case


if __name__ == "__main__":
    src = sys.argv[1]
    order = re.findall(r'slug: "([a-z]+)"', open("src/components/sites/cuberto/projects/content.ts").read())
    cases = [parse(os.path.join(src, f"{s}.html")) for s in order]
    out = "src/components/sites/cuberto/cases/cases.json"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    json.dump(cases, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{len(cases)} cases, {sum(len(c['sections']) for c in cases)} sections -> {out}")
