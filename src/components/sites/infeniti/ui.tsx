import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import s from "./ui.module.css";

export function Container({
  children,
  size,
  className,
}: {
  children: ReactNode;
  size?: "lg";
  className?: string;
}) {
  return <div className={cn(s.container, size === "lg" && s.containerLg, className)}>{children}</div>;
}

export function Roll({ text }: { text: string }) {
  return (
    <span className={s.roll}>
      <span data-text={text}>{text}</span>
    </span>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function linkProps(href: string) {
  return isExternal(href) && !href.includes("infeniti.io")
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
}

export function CtaButton({
  href,
  children,
  variant = "fill",
  size,
  className,
}: {
  href: string;
  children: string;
  variant?: "fill" | "outline";
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <a
      {...linkProps(href)}
      className={cn(s.cta, variant === "fill" ? s.fill : s.outline, size && s[size], className)}
    >
      {variant === "outline" && <span className={s.border} aria-hidden />}
      <span className={s.ripple} aria-hidden>
        <span />
      </span>
      <Roll text={children} />
    </a>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MoreButton({ href, children, className }: { href: string; children: string; className?: string }) {
  return (
    <a {...linkProps(href)} className={cn(s.more, className)}>
      <Roll text={children} />
      <span className={s.moreIcon} aria-hidden>
        <ArrowUpRight />
      </span>
    </a>
  );
}

export function RoundButton({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a {...linkProps(href)} className={s.round} aria-label={label}>
      {children}
    </a>
  );
}

export { s as uiStyles };
