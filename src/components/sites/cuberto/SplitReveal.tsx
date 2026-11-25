"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { InView } from "./InView";
import s from "./ui.module.css";

type Tag = "div" | "h1" | "h2" | "h3" | "p";

function countWords(node: ReactNode): number {
  let n = 0;
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      n += String(child).split(/\s+/).filter(Boolean).length;
    } else if (isValidElement<{ children?: ReactNode }>(child)) {
      n += countWords(child.props.children);
    }
  });
  return n;
}

/**
 * Cuberto's text reveal (GSAP SplitText "words" + mask): every word rises from 120% below its own
 * mask, 1.7s expo.out, when the block's top enters the viewport. By default the word delays spread
 * over 0.6s in total (`stagger: { amount: .6 }`); pass `stagger` for a fixed per-word delay.
 * Inline elements (links, <br>) are kept and their text split too.
 */
export function SplitReveal({
  as = "div",
  className,
  children,
  stagger,
  shown,
}: {
  as?: Tag;
  className?: string;
  children: ReactNode;
  stagger?: number;
  /** Drive the reveal from a parent instead of the block's own visibility. */
  shown?: boolean;
}) {
  const total = countWords(children);
  const step = stagger ?? (total > 1 ? 0.6 / (total - 1) : 0);
  let index = 0;

  const split = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part, i) => {
            if (!part) return null;
            if (/^\s+$/.test(part)) return " ";
            const delay = (index++ * step).toFixed(3);
            return (
              <span key={i} className={s.mask}>
                <span className={s.splitWord} style={{ "--d": `${delay}s` } as CSSProperties}>
                  {part}
                </span>
              </span>
            );
          });
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.type !== "br") {
        return cloneElement(child as ReactElement<{ children?: ReactNode }>, undefined, split(child.props.children));
      }
      return child;
    });

  return (
    <InView as={as} className={cn(className, s.split)} shownClassName={s.splitShown} shown={shown}>
      {split(children)}
    </InView>
  );
}
