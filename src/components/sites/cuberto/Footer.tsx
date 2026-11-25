import { RevealHeading } from "../infeniti/RevealHeading";
import { ORIGIN, footerNav, socials } from "./content";
import { Container, CtaButton, Roll, RoundButton, SmartLink } from "./ui";
import s from "./Footer.module.css";

function SocialIcon({ name }: { name: (typeof socials)[number]["name"] }) {
  const paths: Record<string, [string, string]> = {
    Dribbble: [
      "0 0 32 32",
      "M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm10.43 7.55a13.38 13.38 0 0 1 3 8 22.6 22.6 0 0 0-9-.09c-.48-1.12-1-2.2-1.48-3.21a26.68 26.68 0 0 0 7.48-4.7zm-1.81-1.84A23.78 23.78 0 0 1 17.75 10a62.59 62.59 0 0 0-4.55-7.14 13.57 13.57 0 0 1 2.8-.29 13.35 13.35 0 0 1 8.62 3.14zm-14-2a60.23 60.23 0 0 1 4.68 7.22 42.76 42.76 0 0 1-12.36 1.94 13.5 13.5 0 0 1 7.67-9.17zm-8 11.75h.08a46.59 46.59 0 0 0 8.14-.75 39.89 39.89 0 0 0 5.7-1.47c.47.92.93 1.9 1.38 2.93a24 24 0 0 0-6.28 3.11 28.44 28.44 0 0 0-5.84 5.4A13.35 13.35 0 0 1 2.57 16l.01-.55zm5 11a25.86 25.86 0 0 1 5.52-5.13 21.88 21.88 0 0 1 5.72-2.82 49.37 49.37 0 0 1 2.7 9.7A13.21 13.21 0 0 1 16 29.43a13.35 13.35 0 0 1-8.39-2.96zm16.31.37a53.48 53.48 0 0 0-2.53-8.92 20.31 20.31 0 0 1 7.86.26 13.46 13.46 0 0 1-5.34 8.67z",
    ],
    GitHub: [
      "0 0 32 32",
      "M16.05 0A16.22 16.22 0 0 0 0 16.43 16.38 16.38 0 0 0 11 32c.86.11 1.07-.33 1.07-.76v-2.87c-4.49 1-5.45-2.19-5.45-2.19a4.63 4.63 0 0 0-1.82-2.41c-1.5-1 .1-1 .1-1a3.37 3.37 0 0 1 2.46 1.65c1.4 2.51 3.75 1.75 4.71 1.31a3.05 3.05 0 0 1 1.07-2.19c-3.53-.44-7.27-1.86-7.27-8.11a6.64 6.64 0 0 1 1.6-4.38 5.84 5.84 0 0 1 .13-4.37S9 6.24 12 8.32a16.92 16.92 0 0 1 4.06-.54 17 17 0 0 1 4.07.54c3.1-2.08 4.39-1.64 4.39-1.64a5.82 5.82 0 0 1 .1 4.38 6.13 6.13 0 0 1 1.61 4.38c0 6.36-3.75 7.67-7.28 8.11A4.25 4.25 0 0 1 20 26.62v4.49a.77.77 0 0 0 1.07.76A16.29 16.29 0 0 0 32 16.32 16 16 0 0 0 16.05 0z",
    ],
    YouTube: [
      "0 0 32 22.5",
      "M31.33 3.55A4 4 0 0 0 28.5.72C26 .05 16 .05 16 .05S6 .05 3.5.72A4 4 0 0 0 .67 3.55a41.51 41.51 0 0 0-.67 7.7A41.51 41.51 0 0 0 .67 19a4 4 0 0 0 2.83 2.78c2.49.67 12.5.67 12.5.67s10 0 12.5-.67A4 4 0 0 0 31.33 19a41.51 41.51 0 0 0 .67-7.7 41.51 41.51 0 0 0-.67-7.75zM12.8 16.05v-9.6l8.31 4.8z",
    ],
    LinkedIn: [
      "0 0 32 30.48",
      "M32 18.72v11.76h-7V19.59c0-2.83-1-4.59-3.45-4.59a3.1 3.1 0 0 0-3.26 2.39 3.24 3.24 0 0 0-.22 1.53v11.56h-7V10h7v2.83a7 7 0 0 1 6.09-3.48c4.57.01 7.84 3.06 7.84 9.37zM3.92 0C1.52 0 0 1.52 0 3.48A3.5 3.5 0 0 0 3.7 7c2.4 0 3.92-1.56 3.92-3.52A3.37 3.37 0 0 0 3.92 0zM.44 30.48h7V10h-7z",
    ],
  };
  const [vb, d] = paths[name];
  return (
    <svg viewBox={vb} aria-hidden>
      <path fill="currentColor" d={d} />
    </svg>
  );
}

/** OutroSection: "Have a product to build or rethink?" over the blurred background. */
export function Outro() {
  return (
    <section className={s.outro}>
      <div className={s.outroBg} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sites/cuberto/outro-bg.jpg" alt="" loading="lazy" />
      </div>
      <Container className={s.outroContent}>
        <RevealHeading className={s.outroHeader} text="Have a product to build or rethink?" />
        <p className={s.outroText}>
          Tell us where the product is today, what you are trying to achieve and what is getting in the way.
        </p>
        <div className={s.outroAction}>
          <CtaButton href={`${ORIGIN}/contacts/`} fill inverse size="md">
            Get in touch
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}

/** Site footer: contact pills, offices, nav, legal and socials. */
export function Footer() {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerGrid}>
          <div className={s.locations}>
            <div>
              <div className={s.locationAction}>
                <CtaButton href="mailto:info@cuberto.com" inverse size="sm">
                  info@cuberto.com
                </CtaButton>
              </div>
              <p className={s.locationCaption}>Main office</p>
              <p className={s.locationAddress}>
                901 N Pitt Street
                <br />
                Alexandria VA, 22314
              </p>
            </div>
            <div>
              <div className={s.locationAction}>
                <CtaButton href="tel:+13015499309" inverse size="sm">
                  +1 301 549 9309
                </CtaButton>
              </div>
              <p className={s.locationCaption}>Second office</p>
              <p className={s.locationAddress}>
                Na Perstyne
                <br />
                342/1, 11000 Prague
              </p>
            </div>
          </div>
          <nav className={s.navs} aria-label="Footer">
            {footerNav.map((n) => (
              <SmartLink key={n.title} href={n.href} className={s.nav}>
                <Roll text={n.title} />
              </SmartLink>
            ))}
          </nav>
        </div>
        <div className={s.bgrid}>
          <div className={s.legal}>
            <a href={`${ORIGIN}/privacy/`} target="_blank" rel="noopener noreferrer" className={s.legalLink}>
              Privacy Policy
            </a>
            <span className={s.copy}>2026, Cuberto</span>
          </div>
          <div className={s.socials}>
            {socials.map((so) => (
              <RoundButton key={so.name} href={so.href} label={so.name}>
                <SocialIcon name={so.name} />
              </RoundButton>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
