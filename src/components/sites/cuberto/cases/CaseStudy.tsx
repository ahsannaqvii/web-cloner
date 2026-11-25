import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Footer } from "../Footer";
import { InView } from "../InView";
import { SplitReveal } from "../SplitReveal";
import { Arrow, Container, CtaButton } from "../ui";
import { ROUTES } from "../content";
import { Parallax } from "../about/Parallax";
import { Caption, DrawDivider, Header, Preview } from "../about/parts";
import a from "../about/About.module.css";
import type {
  Case,
  FeedbackSection,
  Media,
  OverviewSection,
  PreviewSection,
  Section,
  SplitshowSection,
} from "./content";
import { getCase } from "./content";
import { Nextcase } from "./Nextcase";
import { renderBlocks, renderInline } from "./Rich";
import s from "./Case.module.css";

const SPLIT_SIZE: Record<string, string | undefined> = {
  xs: a.splitXs,
  sm: a.splitSm,
  ms: a.splitMs,
  md: a.splitMd,
  ml: a.splitMl,
  lg: a.splitLg,
};

function MediaEl({ media, lazy = true }: { media: Media; lazy?: boolean }) {
  if (media.type === "video") return <video src={media.src} autoPlay loop muted playsInline preload="metadata" />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt="" loading={lazy ? "lazy" : undefined} />;
}

function Tophead({ c }: { c: Case }) {
  return (
    <section className={s.tophead}>
      <Container>
        <div className={s.topGrid}>
          <div>
            <div className={s.name}>
              <SplitReveal as="h1" stagger={0.1}>
                {c.name}
              </SplitReveal>
            </div>
            <div className={s.title}>
              <SplitReveal as="h2">{renderInline(c.title)}</SplitReveal>
            </div>
          </div>
          {c.details && (
            <div className={s.topRight}>
              <InView className={s.details} shownClassName={s.detailsShown}>
                {c.details.map((d, i) => (
                  <div key={i} className={s.detail} style={{ "--i": i } as CSSProperties}>
                    {d.cta && d.href ? (
                      <CtaButton href={d.href} fill size="xs" icon={<Arrow />} iconAfter>
                        {d.cta}
                      </CtaButton>
                    ) : d.href ? (
                      <a href={d.href} target="_blank" rel="noopener noreferrer" title={d.text}>
                        {d.text}
                      </a>
                    ) : (
                      d.text
                    )}
                  </div>
                ))}
              </InView>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function PreviewBlock({ p, first }: { p: PreviewSection; first: boolean }) {
  if (p.static) {
    // `-static` previews skip the parallax.
    return (
      <section className={a.preview}>
        <Container>
          <div className={cn(a.main, p.lg && a.mainLg, a.mainShown)}>
            <div className={cn(a.media, s.static)}>
              <MediaEl media={p.media} lazy={!first} />
            </div>
            {p.label && <div className={s.label}>{p.label}</div>}
          </div>
        </Container>
      </section>
    );
  }
  return (
    <Preview lg={p.lg} overlay={p.label && <div className={s.label}>{p.label}</div>}>
      <MediaEl media={p.media} lazy={!first} />
    </Preview>
  );
}

function Overview({ o }: { o: OverviewSection }) {
  const hasGrid = Boolean(o.caption || o.text);
  return (
    <section className={cn(a.overview, !hasGrid && a.noGrid)} id={o.id}>
      <Container size="lg">
        {o.header && <Header className={a.header}>{renderInline(o.header)}</Header>}
        {o.divider && <DrawDivider className={a.divider} />}
        {hasGrid && (
          <div className={a.grid}>
            <div className={a.left}>
              {o.caption && (
                <Caption as={o.caption.tag === "h2" ? "h2" : "h3"}>{renderInline(o.caption.content)}</Caption>
              )}
            </div>
            <div className={a.right}>
              {o.text && (
                <SplitReveal className={a.text}>
                  {o.text.map((b, i) =>
                    "p" in b ? (
                      <p key={i}>{renderInline(b.p)}</p>
                    ) : (
                      <ul key={i} className={s.list}>
                        {b.ul.map((li, j) => (
                          <li key={j}>{renderInline(li)}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </SplitReveal>
              )}
              {o.links && (
                <InView className={s.links} shownClassName={s.linksShown}>
                  {o.links.map((l, i) => (
                    <a
                      key={l.href}
                      className={s.link}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ "--i": i } as CSSProperties}
                    >
                      <span>{l.label}</span>
                    </a>
                  ))}
                </InView>
              )}
            </div>
          </div>
        )}
        {o.tiles && (
          <InView className={s.tiles} shownClassName={s.tilesShown}>
            {o.tiles.map((t, i) => (
              <div
                key={i}
                className={cn(s.tile, t.highlighted && s.tileHighlighted)}
                style={{ "--i": i } as CSSProperties}
              >
                <div className={s.tileCaption}>
                  <h3>{t.caption}</h3>
                </div>
                <div className={s.tileText}>{renderBlocks(t.text)}</div>
              </div>
            ))}
          </InView>
        )}
      </Container>
    </section>
  );
}

function Splitshow({ sp }: { sp: SplitshowSection }) {
  return (
    <section className={a.splitshow}>
      <Container size="lg">
        <div className={a.splitItems}>
          {sp.cols.map((col, ci) => (
            <div key={ci} className={cn(a.col, col.side === "right" && a.colRight)}>
              {col.items.map((it, ii) => (
                <div key={ii}>
                  <div className={cn(a.splitPreview, it.size && SPLIT_SIZE[it.size])}>
                    <Parallax className={a.splitMedia} shownClassName={a.splitMediaShown}>
                      <MediaEl media={it.media} />
                    </Parallax>
                  </div>
                  {it.caption && <div className={s.splitCaption}>{renderInline(it.caption)}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** A case study's single client quote (the source's carousel with one slide, so no dragging). */
function Feedback({ f }: { f: FeedbackSection }) {
  return (
    <section className={a.feedback}>
      <Container size="lg">
        <DrawDivider className={a.divider} />
        <div className={a.grid}>
          <div className={a.left}>
            <Caption as="h2">{renderInline(f.caption)}</Caption>
          </div>
          <div className={a.right}>
            <blockquote className={a.quote} cite={f.review}>
              <InView className={a.author} shownClassName={a.authorShown}>
                <div className={a.authorLine} />
                <div className={a.authorName}>
                  <b>{f.name}</b>
                  {f.role ? `, ${f.role}` : null}
                </div>
              </InView>
              <SplitReveal className={cn(a.text, s.quoteMarks)}>{renderBlocks(f.text)}</SplitReveal>
              {f.review && (
                <div className={a.action}>
                  <CtaButton href={f.review} fill size="xs" icon={<Star />}>
                    {["5.0", "Google"]}
                  </CtaButton>
                </div>
              )}
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Star() {
  return (
    <svg fill="none" viewBox="0 0 16 16" style={{ color: "#FFC861" }}>
      <path
        fill="currentColor"
        d="M6.66 1.7a1.62 1.62 0 0 1 2.68 0l1.45 2.2q.35.49.93.65l2.6.67c1.11.29 1.55 1.6.82 2.46l-1.7 2.03q-.37.46-.35 1.06l.15 2.6c.06 1.12-1.08 1.93-2.16 1.52l-2.5-.94a1.6 1.6 0 0 0-1.15 0l-2.5.94c-1.09.4-2.23-.4-2.17-1.52l.15-2.6q.03-.6-.36-1.06L.85 7.68a1.53 1.53 0 0 1 .83-2.46l2.6-.67q.59-.16.93-.65z"
      />
    </svg>
  );
}

function SectionBlock({ sec, first }: { sec: Section; first: boolean }) {
  switch (sec.type) {
    case "preview":
      return <PreviewBlock p={sec} first={first} />;
    case "overview":
      return <Overview o={sec} />;
    case "splitshow":
      return <Splitshow sp={sec} />;
    case "feedback":
      return <Feedback f={sec} />;
  }
}

/** cuberto.com/projects/<slug>: tophead, the project's sections, the "Next project" reel and footer. */
export function CaseStudy({ c }: { c: Case }) {
  const next = getCase(c.next);
  return (
    <>
      <Tophead c={c} />
      {c.sections.map((sec, i) => (
        <SectionBlock key={i} sec={sec} first={i === 0} />
      ))}
      <Nextcase href={`${ROUTES.projects}/${c.next}`} name={next?.name ?? c.next} media={c.nextMedia} />
      <Footer />
    </>
  );
}
