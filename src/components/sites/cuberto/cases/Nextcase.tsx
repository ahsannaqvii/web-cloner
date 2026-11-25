"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Media } from "./content";
import s from "./Case.module.css";

const LOOP = 15; // s for one "Next project" item to scroll by (Reeller speed)
const MULTIPLIER = 0.3; // scroll delta → time scale (Reeller scroller plugin)
const COPIES = 4;

/**
 * NextcaseSection: an endless "Next project" marquee linking to the next case study. Scrolling
 * speeds it up in the opposite direction, then it eases back to normal speed (expo.out, 1s), as
 * the source's Reeller "scroller" plugin does. Hovering shows the next project's media in the cursor.
 */
export function Nextcase({ href, name, media }: { href: string; name: string; media: Media }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let scale = 1; // current time scale
    let target = 1;
    let dir = 1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      const delta = -(y - lastY); // reversed: scrolling down runs the reel backwards
      lastY = y;
      if (delta) {
        const v = delta * MULTIPLIER;
        target = v > 0 ? Math.max(1, v) : Math.min(-1, v);
        dir = Math.sign(delta);
      } else {
        target = dir;
      }
      // expo.out over ~1s ≈ closing most of the gap quickly, then settling.
      scale += (target - scale) * (1 - Math.exp(-dt * 7));
      const item = el.firstElementChild as HTMLElement | null;
      const w = item?.offsetWidth ?? 0;
      if (w) {
        x -= (w / LOOP) * scale * dt;
        x = ((x % w) - w) % w;
        el.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={s.nextcase}>
      <Link
        href={href}
        className={s.reel}
        aria-label={`Open the next project: ${name}`}
        data-cursor="media"
        data-cursor-type={media.type}
        data-cursor-src={media.src}
      >
        <div ref={track} className={s.reelItems}>
          {Array.from({ length: COPIES }, (_, i) => (
            <div key={i} className={s.reelItem} aria-hidden={i > 0}>
              Next project
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
