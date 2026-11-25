import { cn } from "@/lib/utils";
import { Divider } from "../infeniti/Divider";
import { RevealHeading } from "../infeniti/RevealHeading";
import { ORIGIN, faqs, footerNav, posts, socials } from "./content";
import { Container, CtaButton, Roll, RoundButton } from "./ui";
import { TilePop } from "./TilePop";
import s from "./Bottom.module.css";

const icon = (d: string, round = true) => (
  <svg fill="none" viewBox="0 0 40 40" aria-hidden>
    <path
      stroke="currentColor"
      strokeLinecap={round ? "round" : undefined}
      strokeLinejoin="round"
      strokeWidth="2.5"
      d={d}
    />
  </svg>
);

const tiles = [
  {
    highlighted: true,
    icon: icon("m20 6 4.64 9.54L35 17.08l-7.5 7.43L29.27 35 20 30.04 10.73 35l1.77-10.49L5 17.08l10.37-1.54z"),
    value: "15+",
    small: "Years of experience",
  },
  {
    icon: icon(
      "M11.73 16.45H9.71a3.38 3.38 0 0 1 0-6.75h2.02m0 6.75V7h16.2v9.45m-16.2 0a8.1 8.1 0 0 0 16.2 0m0 0h2.03a3.38 3.38 0 0 0 0-6.75h-2.03M9.03 34h21.6m-13.5-9.9v3.15c0 .74-.63 1.32-1.3 1.63-1.6.73-2.75 2.74-2.75 5.12m9.45-9.9v3.15c0 .74.64 1.32 1.31 1.63 1.6.73 2.74 2.74 2.74 5.12",
    ),
    text: "Recognized by leading design awards",
  },
  {
    highlighted: true,
    icon: icon(
      "M34.95 25.15h-7.03a3.1 3.1 0 0 0-3.1 3.1v7.04M12.42 7.08v2.57a4.65 4.65 0 0 0 4.65 4.65 3.1 3.1 0 0 1 3.1 3.1 3.1 3.1 0 0 0 5.29 2.2c.58-.59.9-1.38.9-2.2 0-1.7 1.4-3.1 3.1-3.1h4.92M18.62 35.92V29.8a3.1 3.1 0 0 0-3.1-3.1 3.1 3.1 0 0 1-3.1-3.1v-1.55a3.1 3.1 0 0 0-3.1-3.1H4.74m30.93 1.55a15.5 15.5 0 1 1-31 0 15.5 15.5 0 0 1 31 0",
    ),
    value: "300+",
    small: "Projects delivered worldwide",
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 40 40" aria-hidden>
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M8.92 26.08h22.16V32a2 2 0 0 1-2 2H10.92a2 2 0 0 1-2-2zM7.33 15.83a4 4 0 0 1 4-4h17.34a4 4 0 0 1 4 4v8.25a2 2 0 0 1-2 2H9.33a2 2 0 0 1-2-2z"
        />
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M20 19.75h.02v.02H20zM15.25 7.5c0-1.1.9-2 2-2h5.5a2 2 0 0 1 2 2v4.33h-9.5z"
        />
      </svg>
    ),
    text: "Long-term partnerships with global brands",
  },
  {
    icon: icon(
      "M27.38 13.08C26.05 7.69 23.32 4 20.16 4c-4.46 0-8.08 7.39-8.08 16.5S15.7 37 20.16 37q.83 0 1.62-.33m3.54-13.35 6.17 3.07-3 6.29m2.98-6.29c-2.91 1.46-6.9 2.36-11.3 2.36C11.23 28.75 4 25.05 4 20.5s7.24-8.25 16.16-8.25c7.82 0 14.34 2.83 15.84 6.6",
    ),
    text: "Strategy, design & development – all in\u2011house",
  },
];

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

/** "Why Cuberto" tiles, Insights, FAQ, OutroSection and Footer. */
export function Bottom() {
  return (
    <>
      <section className={s.why}>
        <Container size="lg">
          <Divider className={s.topDivider} />
          <div className={s.grid}>
            <div className={s.left}>
              <h2 className={s.caption}>Why Cuberto</h2>
            </div>
            <div className={s.right}>
              <p className={s.text}>
                For over 15 years, we&apos;ve been helping startups, scale-ups and global companies transform
                ambitious ideas into successful digital products. Our work has earned international recognition, but
                what matters most to us is building long-term partnerships and delivering measurable business value.
              </p>
            </div>
          </div>
          <TilePop className={s.tiles} itemSelector={`.${s.tile}`}>
            {tiles.map((t, i) => (
              <div key={i} className={cn(s.tile, t.highlighted && s.highlighted)}>
                <div className={s.tileIcon}>{t.icon}</div>
                <p className={s.tileText}>
                  {t.value ? (
                    <>
                      <strong>{t.value}</strong>
                      <br />
                      <small>{t.small}</small>
                    </>
                  ) : (
                    t.text
                  )}
                </p>
              </div>
            ))}
          </TilePop>
        </Container>
      </section>

      <section className={cn(s.dark, s.insights)}>
        <div className={cn(s.fill, s.fillJoined)} aria-hidden />
        <Container size="lg" className={s.inner}>
          <div className={s.insightsHead}>
            <RevealHeading className={s.header} text="Insights" />
            <div className={s.offset}>
              <CtaButton href={`${ORIGIN}/blog/`} inverse>
                Visit blog
              </CtaButton>
            </div>
          </div>
          <div className={s.entries}>
            {posts.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={s.entry}>
                <span className={s.thumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} loading="lazy" />
                </span>
                <span className={s.category}>{p.category}</span>
                <span className={s.entryTitle}>{p.title}</span>
                <span className={s.date}>{p.date}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn(s.dark, s.faq)}>
        <div className={s.fill} aria-hidden />
        <Container size="lg" className={s.inner}>
          <RevealHeading className={s.header} text="FAQ" />
          {faqs.map((f) => (
            <div key={f.q}>
              <Divider className={s.faqDivider} />
              <details className={s.item}>
                <summary className={s.toggle}>
                  <span>{f.q}</span>
                  <span className={s.arr} aria-hidden />
                </summary>
                <div className={s.itemContent}>
                  <div className={s.itemText}>
                    {f.a.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          ))}
          <Divider className={s.faqDivider} />
        </Container>
      </section>

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
                <a key={n.title} href={n.href} target="_blank" rel="noopener noreferrer" className={s.nav}>
                  <Roll text={n.title} />
                </a>
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
    </>
  );
}
