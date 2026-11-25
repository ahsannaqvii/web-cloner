"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ScrollTrigger "top bottom" semantics: an element has entered once its top is above the viewport's
 * bottom, including elements already scrolled past (e.g. after the browser restores scroll on reload).
 */
export function hasEntered(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.boundingClientRect.top < (entry.rootBounds?.bottom ?? window.innerHeight);
}

/**
 * Adds `shownClassName` once the element's top enters the viewport (ScrollTrigger "top bottom",
 * once) and leaves the animation itself to CSS. Pass `shown` to drive it from a parent instead
 * (e.g. carousel slides that are clipped sideways but should reveal with the carousel).
 */
export function InView({
  as: Tag = "div",
  children,
  className,
  shownClassName,
  shown: controlled,
  style,
}: {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "section";
  children?: ReactNode;
  className?: string;
  shownClassName: string;
  shown?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const shown = controlled ?? inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || controlled !== undefined) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!hasEntered(entry)) return;
      setInView(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [controlled]);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className, shown && shownClassName)} style={style}>
      {children}
    </Tag>
  );
}
