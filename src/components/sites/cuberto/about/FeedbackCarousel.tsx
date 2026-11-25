"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { InView, hasEntered } from "../InView";
import { SplitReveal } from "../SplitReveal";
import { CtaButton } from "../ui";
import type { Feedback } from "./content";
import s from "./About.module.css";

const SPACE = 30; // Swiper spaceBetween (px)
const SPEED = 1000; // Swiper speed (ms)

function Star() {
  return (
    <svg fill="none" viewBox="0 0 16 16" style={{ color: "#FFC861" }}>
      <path
        fill="currentColor"
        d="M6.66 1.7a1.62 1.62 0 0 1 2.68 0l1.45 2.2q.35.49.93.65l2.6.67c1.11.29 1.55 1.6.82 2.46l-1.7 2.03q-.37.46-.35 1.06l.15 2.6c.06 1.12-1.08 1.93-2.16 1.52l-2.5-.94a1.6 1.6 0 0 0-1.15 0l-2.5.94c-1.09.4-2.23-.4-2.17-1.52l.15-2.6q.03-.6-.36-1.06L.85 7.68a1.53 1.53 0 0 1 .83-2.46l2.6-.67q.59-.16.93-.65z"
      />
    </svg>
  );
}

function Slide({ item, shown, onNext }: { item: Feedback; shown: boolean; onNext: () => void }) {
  return (
    <blockquote className={s.quote} cite={item.review}>
      <InView className={s.author} shownClassName={s.authorShown} shown={shown}>
        <div className={s.authorLine} />
        <div className={s.authorName}>
          <b>{item.name}</b>, {item.company}
        </div>
      </InView>
      {/* Clicking the quote shows the next one; the cursor turns into a long arrow over it. */}
      <div className={s.quoteBody} data-cursor="next" onClick={onNext}>
        <SplitReveal className={s.text} shown={shown}>
          <p className={s.quoteText}>{item.text}</p>
        </SplitReveal>
      </div>
      {item.review && (
        <div className={s.action}>
          <CtaButton href={item.review} fill size="xs" icon={<Star />}>
            {["5.0", "Google"]}
          </CtaButton>
        </div>
      )}
    </blockquote>
  );
}

/**
 * Cuberto's testimonial Swiper: one slide per view, loops, dragged with grab cursor, 1s
 * cubic-bezier(.16,1,.3,1) settle. Clones at both ends make the loop seamless.
 */
export function FeedbackCarousel({ items }: { items: Feedback[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(1); // index into [last clone, ...items, first clone]
  const [animate, setAnimate] = useState(true);
  const [drag, setDrag] = useState(0);
  const [shown, setShown] = useState(false);
  const dragging = useRef<{ x: number; t: number; id: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const n = items.length;

  const go = useCallback((next: number) => {
    setAnimate(true);
    setPos(next);
  }, []);

  // Every slide reveals together when the carousel scrolls into view (hidden slides are clipped sideways).
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!hasEntered(entry)) return;
      setShown(true);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // After landing on a clone, jump to its real twin without a transition.
  useEffect(() => {
    if (pos !== 0 && pos !== n + 1) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setPos(pos === 0 ? n : 1);
    }, SPEED);
    return () => clearTimeout(t);
  }, [pos, n]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || pos === 0 || pos === n + 1) return;
    suppressClick.current = false;
    dragging.current = { x: e.clientX, t: performance.now(), id: e.pointerId, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    // Capture only once it is a real drag, so taps on the review link still click.
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setAnimate(false);
    }
    if (d.moved) setDrag(dx);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d || d.id !== e.pointerId) return;
    dragging.current = null;
    if (!d.moved) return;
    suppressClick.current = true;
    const dx = e.clientX - d.x;
    const width = viewport.current?.offsetWidth ?? 1;
    const fast = Math.abs(dx) / (performance.now() - d.t) > 0.3 && Math.abs(dx) > 10;
    setDrag(0);
    if (fast || Math.abs(dx) > width * 0.5) go(pos + (dx < 0 ? 1 : -1));
    else go(pos);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(Math.min(pos + 1, n + 1));
    if (e.key === "ArrowLeft") go(Math.max(pos - 1, 0));
  };

  const slides = [items[n - 1], ...items, items[0]];
  const style = {
    transform: `translate3d(calc(${-pos} * (100% + ${SPACE}px) + ${drag}px), 0, 0)`,
    transition: animate ? `transform ${SPEED}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
  } as CSSProperties;

  return (
    <div
      ref={viewport}
      className={s.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client feedback"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className={s.items}
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {slides.map((item, i) => (
          <div
            key={i}
            className={s.item}
            style={{ marginRight: SPACE }}
            aria-hidden={i !== pos}
            inert={i !== pos}
          >
            <Slide item={item} shown={shown} onNext={() => pos < n + 1 && go(pos + 1)} />
          </div>
        ))}
      </div>
    </div>
  );
}
