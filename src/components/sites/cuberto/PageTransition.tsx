"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import s from "./PageTransition.module.css";

const SHOW = 700; // ms, white panel grows from the bottom (power4.inOut)
const HIDE = 400; // ms, panel fades out on the new page

/** Fired on `window` once the new page is uncovered; scroll reveals wait for it. */
export const PAGE_ENTER = "cuberto:page-enter";

/** True while the transition covers the page (`html.loader`, as on the source). */
export function isPageCovered() {
  return document.documentElement.classList.contains("loader");
}

/**
 * Runs `start` now, or once the transition uncovers the page, so entrance animations play in view
 * (the source plays each section's enter timeline after the loader hides). Returns a cleanup.
 */
export function afterUncover(start: () => void | (() => void)) {
  let cleanup: void | (() => void);
  if (!isPageCovered()) {
    cleanup = start();
    return () => cleanup?.();
  }
  const run = () => {
    cleanup = start();
  };
  window.addEventListener(PAGE_ENTER, run, { once: true });
  return () => {
    window.removeEventListener(PAGE_ENTER, run);
    cleanup?.();
  };
}

/**
 * Cuberto's "Loader" page transition. Clicking a link to another local page dims the page and grows
 * a white panel up from the bottom; the route changes underneath, then the panel fades away and
 * the new page's entrance animations play. Lives in the /cuberto layout so it survives navigation.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "show" | "covered" | "hide">("idle");
  const pending = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Intercept clicks on local links before next/link handles them (it skips prevented events).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith("/cuberto")) return;
      if (url.pathname === location.pathname) return; // same page (e.g. #hash): let it be
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      if (pending.current) return;
      pending.current = url.pathname + url.search + url.hash;
      document.documentElement.classList.add("loader");
      setState("show");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setState("covered");
        router.push(pending.current!);
      }, SHOW);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // The new route has rendered under the panel: uncover it.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.classList.remove("loader");
      window.dispatchEvent(new Event(PAGE_ENTER));
      setState("hide");
      timer.current = setTimeout(() => setState("idle"), HIDE);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      document.documentElement.classList.remove("loader");
    },
    [],
  );

  return (
    <div className={cn(s.loader, s[state])} aria-hidden>
      <div className={s.backdrop} />
      <div className={s.fill} />
    </div>
  );
}
