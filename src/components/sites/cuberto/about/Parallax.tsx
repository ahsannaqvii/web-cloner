"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { hasEntered } from "../InView";
import { afterUncover } from "../PageTransition";

/**
 * Cuberto's media parallax: the media sits at scale(1.05) and slides from -10% to +10% while its frame
 * travels from the bottom of the viewport to the top (GSAP scrub "top bottom" → "bottom top").
 * `shownClassName` is added once the frame enters the viewport (Splitshow's 1s fade-in).
 */
export function Parallax({
  children,
  className,
  shownClassName,
}: {
  children: ReactNode;
  className?: string;
  shownClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.transform = `translate3d(0, ${(-10 + 20 * p).toFixed(3)}%, 0) scale(1.05)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const stopReveal = afterUncover(() => {
      const io = new IntersectionObserver(([entry]) => {
        if (!hasEntered(entry)) return;
        setShown(true);
        io.disconnect();
      });
      io.observe(frame);
      return () => io.disconnect();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      stopReveal();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={cn(className, shown && shownClassName)}>
      {children}
    </div>
  );
}
