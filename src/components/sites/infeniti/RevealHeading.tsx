"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import s from "./ui.module.css";

/** Splits a heading into words that rise into place when it enters the viewport (Cuberto header reveal). */
export function RevealHeading({
  text,
  as = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  const Tag = as;
  return (
    <Tag ref={ref} className={cn(className, revealed && s.revealed)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className={s.word}>
            <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
