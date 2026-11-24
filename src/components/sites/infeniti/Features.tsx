"use client";

import { useEffect, useRef } from "react";
import { SITE, features } from "./content";
import { RevealHeading } from "./RevealHeading";
import { Container, MoreButton } from "./ui";
import s from "./Features.module.css";

/** Brand-coloured stand-ins for Cuberto's per-card illustrations (concentric glows). */
function FeatureArt({ index }: { index: number }) {
  const rings = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMaxYMax slice" aria-hidden>
      <defs>
        <linearGradient id={`fa-${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a2cf36" stopOpacity="0" />
          <stop offset="1" stopColor="#a2cf36" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {rings.map((r) => {
        const k = 1 - r * 0.18;
        const fill = `url(#fa-${index})`;
        const op = 0.25 + r * 0.15;
        if (index % 4 === 0)
          return (
            <rect key={r} x={300 + r * 50} y={r * 20} width={40} height={340} rx={4} fill={fill} opacity={op} />
          );
        if (index % 4 === 1)
          return <circle key={r} cx={430} cy={340} r={300 * k} fill={fill} opacity={op} />;
        if (index % 4 === 2)
          return (
            <rect
              key={r}
              x={430 - 260 * k}
              y={340 - 300 * k}
              width={520 * k}
              height={600 * k}
              rx={90 * k}
              fill={fill}
              opacity={op}
            />
          );
        return (
          <path
            key={r}
            d={`M${430 - 280 * k},340 L430,${340 - 320 * k} L${430 + 280 * k},340 Z`}
            fill={fill}
            opacity={op}
          />
        );
      })}
    </svg>
  );
}

export function Features() {
  const list = useRef<HTMLDivElement>(null);

  // Cards darken from grey to ink as they scroll into the upper part of the viewport.
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-feature]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of items) {
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.3)));
        el.style.setProperty("--p", p.toFixed(3));
        el.classList.toggle(s.active, p > 0.5);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={s.section}>
      <Container size="lg">
        <RevealHeading className={s.header} text="Beyond Standard Software" />
        <div ref={list} className={s.items}>
          {features.map((f, i) => (
            <article key={f.title} className={s.item} data-feature>
              <div className={s.fill} aria-hidden />
              <div className={s.bg} aria-hidden>
                <FeatureArt index={i} />
              </div>
              <div className={s.head}>
                <span className={s.num} aria-hidden />
                <h3 className={s.title}>{f.title}</h3>
              </div>
              <div className={s.accordion}>
                <div className={s.content}>
                  <p className={s.text}>{f.text}</p>
                  <div className={s.action}>
                    <MoreButton href={`${SITE}/service`}>Explore</MoreButton>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
