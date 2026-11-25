"use client";

import { useEffect, useRef } from "react";
import { features } from "./content";
import { Container, MoreButton } from "./ui";
import s from "./Features.module.css";

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
      // Phones: a single accordion card is open at a time — the last one past the threshold.
      if (!matchMedia("(width >= 768px)").matches) {
        let current = 0;
        items.forEach((el, i) => {
          if (el.getBoundingClientRect().top < vh * 0.6) current = i;
        });
        items.forEach((el, i) => {
          el.style.setProperty("--p", i === current ? "1" : "0");
          el.classList.toggle(s.active, i === current);
        });
        return;
      }
      for (const el of items) {
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (vh * 0.68 - top) / (vh * 0.2)));
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
        <div ref={list} className={s.items}>
          {features.map((f) => (
            <article key={f.title} className={s.item} data-feature>
              <div className={s.fill} aria-hidden />
              <div className={s.bg} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.bg} alt="" width={600} height={374} loading="lazy" />
              </div>
              <div className={s.head}>
                <span className={s.num} aria-hidden />
                <h3 className={s.title}>{f.title}</h3>
              </div>
              <div className={s.accordion}>
                <div className={s.content}>
                  <p className={s.text}>{f.text}</p>
                  <div className={s.action}>
                    <MoreButton href={f.href}>Explore</MoreButton>
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
