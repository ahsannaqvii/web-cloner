"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Arrow } from "./ui";
import s from "./Cursor.module.css";

type Mode = "default" | "pointer" | "icon" | "next" | "media" | "hidden";

/**
 * Cuberto-style cursor follower: a circle that eases toward the pointer and grows over
 * links (pointer), shows an arrow over media cards (`data-cursor="icon"`) or a long
 * right arrow over items that advance a carousel (`data-cursor="next"`), or a 36rem circle with
 * an image or video over `data-cursor="media"` (`data-cursor-src`, `data-cursor-type`).
 */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("hidden");
  const [active, setActive] = useState(false);
  const [media, setMedia] = useState<{ src: string; type: string } | null>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let raf = 0;
    let first = true;

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (el.current) el.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (first) {
        cur.x = pos.x;
        cur.y = pos.y;
        first = false;
      }
      const t = e.target instanceof Element ? e.target : null;
      const iconEl = t?.closest<HTMLElement>("[data-cursor]");
      const link = t?.closest("a, button, summary, [role='button']");
      const icon = iconEl?.dataset.cursor;
      if (icon === "media" && iconEl?.dataset.cursorSrc) {
        const next = { src: iconEl.dataset.cursorSrc, type: iconEl.dataset.cursorType ?? "image" };
        setMedia((m) => (m?.src === next.src ? m : next));
        setMode("media");
        return;
      }
      setMode(icon === "icon" || icon === "next" ? icon : link ? "pointer" : "default");
    };
    const onLeave = () => setMode("hidden");
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={el} className={cn(s.cursor, s[mode], active && s.active)} aria-hidden>
      <span className={s.glyph}>
        <Arrow />
      </span>
      <span className={s.mediaWrap} aria-hidden>
        <span className={s.mediaBox}>
          {media?.type === "video" ? (
            <video key={media.src} src={media.src} autoPlay muted loop playsInline />
          ) : media ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt="" />
          ) : null}
        </span>
      </span>
      <span className={cn(s.glyph, s.glyphNext)}>
        <svg viewBox="0 0 32 12">
          <path fill="none" stroke="currentColor" strokeMiterlimit="10" d="m26.28.33 5 5.67-5 5.67M0 6h31.32" />
        </svg>
      </span>
    </div>
  );
}
