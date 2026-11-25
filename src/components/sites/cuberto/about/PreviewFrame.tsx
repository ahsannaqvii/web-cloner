"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import s from "./About.module.css";

/**
 * PreviewSection `.main`. On screen at load it opens from `inset(5% 10%)` at scale .9 (2.5s expo.out);
 * otherwise it fades in over 1s when its top enters the viewport.
 */
export function PreviewFrame({ lg, children }: { lg?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "enter" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time measurement on mount
      setState("enter");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setState("shown");
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(s.main, lg && s.mainLg, state === "enter" && s.mainEnter, state === "shown" && s.mainShown)}
    >
      {children}
    </div>
  );
}
