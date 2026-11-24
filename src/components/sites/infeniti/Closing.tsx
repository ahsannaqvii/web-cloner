import { BriefcaseBusiness, CalendarClock, Globe, Layers, Rocket } from "lucide-react";
import { CALENDLY, SITE, footerNav, services, socials } from "./content";
import { Divider } from "./Divider";
import { RevealHeading } from "./RevealHeading";
import { ArrowUpRight, Container, CtaButton, Roll, RoundButton } from "./ui";
import s from "./Closing.module.css";

const tiles = [
  { icon: Rocket, value: "85+", caption: "Projects Delivered", highlighted: true },
  { icon: BriefcaseBusiness, value: "40+", caption: "Clients Served" },
  { icon: Layers, value: "05", caption: "Industries Served", highlighted: true },
  { icon: CalendarClock, value: "08", caption: "Years of Experience" },
  { icon: Globe, value: "08+", caption: "Countries Covered · KSA · US · UK · PAK" },
];

function SocialIcon({ name }: { name: (typeof socials)[number]["name"] }) {
  if (name === "Facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" />
      </svg>
    );
  if (name === "LinkedIn")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.9 8.8H3.6V20h3.3zM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8M20.4 13.6c0-3-.6-5.1-4.1-5.1-1.7 0-2.8.9-3.2 1.8V8.8H10V20h3.3v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.3z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Cuberto "Why" tiles + FAQ-styled service list + OutroSection + Footer. */
export function Closing() {
  return (
    <>
      <section className={s.why}>
        <Container size="lg">
          <Divider className={s.topDivider} />
          <div className={s.grid}>
            <div className={s.left}>
              <h2 className={s.caption}>Why Infeniti</h2>
            </div>
            <div className={s.right}>
              <p className={s.text}>
                Built for businesses that expect more. Purpose-built software designed around complex workflows,
                teams and operational requirements.
              </p>
            </div>
          </div>
          <div className={s.tiles}>
            {tiles.map(({ icon: Icon, value, caption, highlighted }) => (
              <div key={caption} className={`${s.tile} ${highlighted ? s.highlighted : ""}`}>
                <Icon className={s.tileIcon} strokeWidth={1.4} aria-hidden />
                <p className={s.tileText}>
                  <strong>{value}</strong>
                  <br />
                  <small>{caption}</small>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={s.faq}>
        <div className={s.faqFill} aria-hidden />
        <Container size="lg" className={s.faqContent}>
          <div className={s.faqHead}>
            <RevealHeading className={s.faqHeader} text="What We Offer" />
            <CtaButton href={`${SITE}/service`} variant="outline" size="sm" className={s.faqMore}>
              All services
            </CtaButton>
          </div>
          {services.map((item, i) => (
            <div key={item.title + i}>
              <Divider className={s.faqDivider} />
              <a href={item.href} className={s.faqItem}>
                <span className={s.faqIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.faqTitle}>{item.title}</span>
                <span className={s.faqArrow} aria-hidden>
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          ))}
          <Divider className={s.faqDivider} />
        </Container>
      </section>

      <section className={s.outro}>
        <div className={s.outroBg} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sites/infeniti/hero-bg.webp" alt="" loading="lazy" />
        </div>
        <Container className={s.outroContent}>
          <RevealHeading className={s.outroHeader} text="Have a business problem worth solving?" />
          <p className={s.outroText}>Tell us what you&apos;re building, or what isn&apos;t working.</p>
          <div className={s.outroAction}>
            <CtaButton href={`${SITE}/contact`} size="md">
              Explore
            </CtaButton>
          </div>
        </Container>
      </section>

      <footer className={s.footer}>
        <Container>
          <div className={s.footerGrid}>
            <div>
              <div className={s.locations}>
                <div className={s.location}>
                  <div className={s.locationAction}>
                    <CtaButton href={`${SITE}/contact`} variant="outline" size="sm">
                      Contact Now
                    </CtaButton>
                  </div>
                  <p className={s.locationCaption}>Countries covered</p>
                  <p className={s.locationAddress}>KSA · US · UK · PAK</p>
                </div>
                <div className={s.location}>
                  <div className={s.locationAction}>
                    <CtaButton href={CALENDLY} variant="outline" size="sm">
                      Book A Consultation
                    </CtaButton>
                  </div>
                  <p className={s.locationCaption}>Discovery call</p>
                  <p className={s.locationAddress}>Talk to our team</p>
                </div>
              </div>
            </div>
            <nav className={s.navs} aria-label="Footer">
              {footerNav.map((n) => (
                <a key={n.title} href={n.href} className={s.nav}>
                  <Roll text={n.title} />
                </a>
              ))}
            </nav>
          </div>
          <div className={s.bgrid}>
            <div className={s.legal}>
              <a href={`${SITE}/privacy-policy`} className={s.legalLink}>
                Privacy policy
              </a>
              <span className={s.copy}>© 2026 Infeniti</span>
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
    </>
  );
}
