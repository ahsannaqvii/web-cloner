"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasEntered } from "./InView";
import { afterUncover } from "./PageTransition";

/** Scales each tile up from 0 with a stagger when the grid enters the viewport (Cuberto tiles). */
export function TilePop({
  children,
  className,
  itemSelector,
}: {
  children: ReactNode;
  className?: string;
  itemSelector: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(itemSelector));
    items.forEach((el) => {
      el.style.transform = "scale(0)";
    });
    return afterUncover(() => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!hasEntered(entry)) return;
          items.forEach((el, i) => {
            el.style.transition = `transform 1s cubic-bezier(0.34, 1.3, 0.64, 1) ${i * 0.08}s`;
            el.style.transform = "scale(1)";
          });
          io.disconnect();
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      io.observe(root);
      return () => io.disconnect();
    });
  }, [itemSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
