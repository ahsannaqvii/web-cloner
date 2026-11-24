"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "./ui";
import s from "./Cursor.module.css";

type Mode = "default" | "pointer" | "icon" | "hidden";

/**
 * Cuberto-style cursor follower: a circle that eases toward the pointer and grows over
 * links (pointer) or shows an arrow over media cards (`data-cursor="icon"`).
 */
export function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("hidden");
  const [active, setActive] = useState(false);

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
      const iconEl = t?.closest("[data-cursor='icon']");
      const link = t?.closest("a, button, summary, [role='button']");
      setMode(iconEl ? "icon" : link ? "pointer" : "default");
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
        <ArrowUpRight />
      </span>
    </div>
  );
}
