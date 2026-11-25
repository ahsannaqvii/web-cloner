"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ORIGIN, ROUTES, navLinks, services } from "./content";
import { Container, CtaButton, CubertoLogo, Roll, SmartLink } from "./ui";
import s from "./Navbar.module.css";

export function Navbar() {
  const [fixed, setFixed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Cuberto: header scrolls away, then returns fixed (with blurred fill) when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const threshold = window.innerHeight * 0.2;
      setFixed(y > threshold);
      setVisible(y > threshold && y < last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn(s.navbar, fixed && s.fixed, visible && s.visible, open && s.open)}>
      <div className={s.fill} aria-hidden />
      <div className={s.strip}>
        <Container className={s.container}>
          <div className={s.grid}>
            <Link href={ROUTES.home} className={s.logo} aria-label="Digital Design &amp; Development Agency">
              <CubertoLogo />
            </Link>

            <div className={s.toggleCol}>
              <button
                type="button"
                className={s.toggle}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
              </button>
            </div>

            <div className={s.menuCol}>
              <div className={s.menuInner}>
                <nav className={s.menu} aria-label="Main">
                  <div className={s.title}>Menu</div>
                  <div className={s.navs}>
                    <div
                      className={s.nav}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        type="button"
                        className={s.navToggle}
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                      >
                        <Roll text="Services" />
                        <svg className={s.arrow} viewBox="0 0 8 5" aria-hidden>
                          <path d="M.5.5 4 4 7.5.5" fill="none" stroke="currentColor" />
                        </svg>
                      </button>
                      <div className={s.dropdown}>
                        <div className={s.dropdownContent}>
                          <div className={s.links}>
                            {services.map((item) => (
                              <a key={item.title} href={item.href}>
                                {item.title}
                              </a>
                            ))}
                                                      </div>
                        </div>
                      </div>
                    </div>
                    {navLinks.map((l) => {
                      // Sub-pages (a case study under /projects) keep their section underlined.
                      const current = pathname === l.href || pathname.startsWith(`${l.href}/`);
                      return (
                        <div key={l.title} className={cn(s.nav, current && s.current)}>
                          <SmartLink
                            href={l.href}
                            className={s.navToggle}
                            aria-current={current ? "page" : undefined}
                            onClick={() => setOpen(false)}
                          >
                            <Roll text={l.title} />
                          </SmartLink>
                        </div>
                      );
                    })}
                  </div>
                  <div className={s.actions}>
                    <CtaButton href={`${ORIGIN}/contacts/`} fill size="md" className={s.action}>
                      Contacts
                    </CtaButton>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
