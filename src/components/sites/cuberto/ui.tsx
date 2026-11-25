import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import s from "./ui.module.css";

export function Container({ children, size, className }: { children: ReactNode; size?: "lg"; className?: string }) {
  return <div className={cn(s.container, size === "lg" && s.containerLg, className)}>{children}</div>;
}

export function Roll({ text }: { text: string }) {
  return (
    <span className={s.roll}>
      <span data-text={text}>{text}</span>
    </span>
  );
}

export function ext(href: string) {
  return /^https?:/.test(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}

/** Client-side navigation for cloned local routes; a new tab for cuberto.com pages not cloned yet. */
export function SmartLink({ href, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a {...ext(href)} {...props} />;
}

export function CtaButton({
  href,
  children,
  fill = false,
  inverse = false,
  size,
  icon,
  className,
}: {
  href: string;
  /** One label, or several that roll independently (e.g. "5.0", "Google"). */
  children: string | string[];
  fill?: boolean;
  inverse?: boolean;
  size?: "md" | "sm" | "xs";
  icon?: ReactNode;
  className?: string;
}) {
  const labels = typeof children === "string" ? [children] : children;
  return (
    <SmartLink href={href} className={cn(s.cta, fill && s.fill, inverse && s.inverse, size && s[size], className)}>
      {!fill && <span className={s.border} aria-hidden />}
      <span className={s.ripple} aria-hidden>
        <span />
      </span>
      {icon && (
        <span className={s.ctaIcon} aria-hidden>
          {icon}
        </span>
      )}
      {labels.map((label) => (
        <Roll key={label} text={label} />
      ))}
    </SmartLink>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M3 13 13 3m0 8.65V3H4.35" />
    </svg>
  );
}

export function MoreButton({ href, children }: { href: string; children: string }) {
  return (
    <SmartLink href={href} className={s.more}>
      <Roll text={children} />
      <span className={s.moreIcon} aria-hidden>
        <Arrow />
      </span>
    </SmartLink>
  );
}

export function RoundButton({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className={s.round} aria-label={label}>
      {children}
    </SmartLink>
  );
}

export function CubertoLogo() {
  return (
    <svg fill="none" viewBox="0 0 94 20" aria-hidden>
      <path fill="currentColor" d="M6.82 16.14c-2.11 0-3.85-1.88-3.85-4.15 0-2.27 1.74-4.14 3.85-4.14a3.8 3.8 0 0 1 3.28 1.97l2.54-1.68a6.75 6.75 0 0 0-5.81-3.49C3.08 4.65 0 7.97 0 12c0 4.03 3.08 7.35 6.83 7.35A6.75 6.75 0 0 0 12.57 16l-2.5-1.74a3.87 3.87 0 0 1-3.25 1.88Z" />
      <path fill="currentColor" d="M23.62 13.35a2.81 2.81 0 0 1-2.83 2.78h-.34a2.8 2.8 0 0 1-2.83-2.78v-8.4h-3.33v8.51a5.92 5.92 0 0 0 5.97 5.87H21c3.3 0 5.97-2.62 5.97-5.87v-8.5h-3.33v8.39Z" />
      <path fill="currentColor" d="M35.98 4.6c-1.4 0-2.72.46-3.81 1.23V0h-3.05v11.95c0 4.06 3.07 7.35 6.87 7.35 3.79 0 6.86-3.3 6.86-7.35 0-4.07-3.08-7.36-6.87-7.36Zm0 11.49c-2.13 0-3.86-1.86-3.86-4.15 0-2.28 1.73-4.14 3.86-4.14s3.86 1.86 3.86 4.14c.01 2.29-1.72 4.15-3.86 4.15Z" />
      <path fill="currentColor" d="M57.89 13.19a8.04 8.04 0 0 0 0-2.5c-.55-3.46-3.37-6.1-6.76-6.1-3.8 0-6.86 3.3-6.86 7.35 0 4.06 3.06 7.35 6.86 7.35 2.39 0 4.5-1.32 5.73-3.3l-.02-.01-2.5-1.75a3.8 3.8 0 0 1-3.22 1.86 3.91 3.91 0 0 1-3.7-2.9H57.9ZM51.13 7.8c1.73 0 3.2 1.22 3.69 2.9h-7.38a3.9 3.9 0 0 1 3.69-2.9Z" />
      <path fill="currentColor" d="M62.74 4.96H59.7v13.96h3.04v-6.33c0-3.33 2-4.62 4.49-4.63v-3c-1.74 0-3.28.48-4.49 1.3v-1.3Z" />
      <path fill="currentColor" d="M79.1 18.46c-.95.53-2.03.82-3.13.82-3.73 0-6.8-3.28-6.83-7.29V0h3.05v4.96h5.24v3h-5.24v4.03c.02 2.25 1.68 4.1 3.78 4.1a3.5 3.5 0 0 0 1.47-.33l1.66 2.7Z" />
      <path fill="currentColor" d="M86.14 4.6c-3.79 0-6.86 3.29-6.86 7.34 0 4.06 3.07 7.35 6.86 7.35 3.8 0 6.87-3.3 6.87-7.35 0-4.06-3.08-7.35-6.87-7.35Zm0 11.49c-2.13 0-3.86-1.86-3.86-4.15 0-2.28 1.73-4.14 3.86-4.14 2.14 0 3.87 1.86 3.87 4.14 0 2.29-1.73 4.15-3.87 4.15Z" />
    </svg>
  );
}
