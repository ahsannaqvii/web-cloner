"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/** Page-wide Lenis smooth scrolling, as on cuberto.com (`html.lenis`). */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true });
    window.lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
  return null;
}
