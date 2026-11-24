"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import s from "./ui.module.css";

/**
 * 1px line that bends toward the pointer while hovered and springs back on leave
 * (Cuberto's elastic Divider).
 */
export function Divider({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const p = path.current;
    if (!el || !p || !matchMedia("(pointer: fine)").matches) return;

    let width = el.offsetWidth;
    let target = { x: width / 2, y: 0 };
    let cur = { x: width / 2, y: 0 };
    let vel = 0;
    let hovering = false;
    let raf = 0;

    const draw = () => p.setAttribute("d", `M0,100 Q${cur.x},${100 + cur.y * 2} ${width},100`);

    const tick = () => {
      if (hovering) {
        cur = { x: cur.x + (target.x - cur.x) * 0.3, y: cur.y + (target.y - cur.y) * 0.3 };
        vel = 0;
      } else {
        // damped spring back to 0
        vel = (vel - cur.y * 0.12) * 0.86;
        cur.y += vel;
      }
      draw();
      if (hovering || Math.abs(cur.y) > 0.05 || Math.abs(vel) > 0.05) raf = requestAnimationFrame(tick);
      else {
        cur.y = 0;
        draw();
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      hovering = true;
      target = { x: e.clientX - r.left, y: Math.max(-40, Math.min(40, e.clientY - r.top)) };
      kick();
    };
    const onLeave = () => {
      hovering = false;
      kick();
    };
    const onResize = () => {
      width = el.offsetWidth;
      draw();
    };

    draw();
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={wrap} className={cn(s.divider, className)} aria-hidden>
      <svg preserveAspectRatio="none">
        <path ref={path} d="M0,100 L10000,100" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
