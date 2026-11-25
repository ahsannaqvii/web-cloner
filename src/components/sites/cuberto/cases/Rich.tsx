import type { ReactNode } from "react";
import type { Block, Inline } from "./content";
import s from "../about/About.module.css";

/** Renders parsed inline content. `<br class="-gxs">` breaks only on desktop, like the source. */
export function renderInline(nodes: Inline[]): ReactNode[] {
  return nodes.map((n, i) => {
    if (typeof n === "string") return n;
    if ("br" in n) return n.br === "desktop" ? <br key={i} className={s.desktopBreak} /> : <br key={i} />;
    const children = renderInline(n.children);
    switch (n.tag) {
      case "a":
        return (
          <a key={i} href={n.href ?? undefined} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      case "strong":
        return <strong key={i}>{children}</strong>;
      case "b":
        return <b key={i}>{children}</b>;
      case "em":
        return <em key={i}>{children}</em>;
      default:
        return <span key={i}>{children}</span>;
    }
  });
}

/** Paragraphs and bullet lists of a `.text` block. */
export function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((b, i) =>
    "p" in b ? (
      <p key={i}>{renderInline(b.p)}</p>
    ) : (
      <ul key={i}>
        {b.ul.map((li, j) => (
          <li key={j}>{renderInline(li)}</li>
        ))}
      </ul>
    ),
  );
}
