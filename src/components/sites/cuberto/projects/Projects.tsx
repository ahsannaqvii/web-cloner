"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { InView, hasEntered } from "../InView";
import { SplitReveal } from "../SplitReveal";
import { Container, Roll, SmartLink } from "../ui";
import { filters, projects, type Category } from "./content";
import s from "./Projects.module.css";

type FilterId = "all" | Category;

const FADE_OUT = 250; // ms, items fade before the list is swapped
const STAGGER = 0.1; // s between cards that enter the viewport together

/**
 * Cards rise 70px (2s expo.out) and fade in (1s) once they scroll into view. Cards entering in the
 * same observer callback are staggered 0.1s apart, like GSAP's ScrollTrigger.batch on the source.
 */
function useBatchReveal(root: React.RefObject<HTMLElement | null>, deps: unknown) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const io = new IntersectionObserver((entries) => {
      entries
        .filter(hasEntered)
        .map((e) => e.target as HTMLElement)
        .sort((a, b) => items.indexOf(a) - items.indexOf(b))
        .forEach((item, i) => {
          item.style.setProperty("--delay", `${(i * STAGGER).toFixed(2)}s`);
          item.classList.add(s.itemShown);
          io.unobserve(item);
        });
    });
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [root, deps]);
}

/** cuberto.com/projects — "Our projects" heading, category filters and the project grid. */
export function Projects() {
  const [active, setActive] = useState<FilterId>("all");
  const [shown, setShown] = useState<FilterId>("all");
  const [fading, setFading] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Heading, intro and filters belong to the page-enter timeline on the source, so they play on load
  // whatever the scroll position.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useBatchReveal(list, shown);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Source: underline moves at once; the grid fades out (.25s), is replaced by the matching
  // cards, which reveal again as they enter, and fades back in (.2s).
  const choose = (id: FilterId) => {
    if (id === active) return;
    setActive(id);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(id);
      setFading(false);
    }, FADE_OUT);
  };

  const visible = projects.filter((p) => shown === "all" || p.categories.includes(shown));

  return (
    <section className={s.section}>
      <Container size="lg">
        <div className={s.header}>
          <SplitReveal as="h1" stagger={0.1} shown={entered}>
            Our projects
          </SplitReveal>
        </div>
        <SplitReveal className={s.text} shown={entered}>
          <p>We help bring ideas to life and create digital products that work.</p>
        </SplitReveal>

        <InView className={s.filters} shownClassName={s.filtersShown} shown={entered}>
          {filters.map((f, i) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              role="button"
              aria-pressed={active === f.id}
              className={cn(s.filter, active === f.id && s.filterActive)}
              style={{ "--i": i } as CSSProperties}
              onClick={(e) => {
                e.preventDefault();
                choose(f.id);
              }}
            >
              <Roll text={f.title} />
            </a>
          ))}
        </InView>

        <div ref={list} key={shown} className={cn(s.items, fading && s.itemsFading)}>
          {visible.map((p) => (
            <div key={p.slug} className={s.item} data-card>
              <SmartLink href={p.href} className={s.card} data-cursor="icon">
                <span className={s.preview}>
                  <span className={s.media}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      srcSet={`${p.img2x} 2x`}
                      alt={p.caption}
                      loading="lazy"
                      style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                    />
                  </span>
                </span>
                <span className={s.caption}>
                  <b>{p.name}</b> – {p.caption}
                </span>
              </SmartLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
