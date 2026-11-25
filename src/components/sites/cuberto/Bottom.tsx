import { cn } from "@/lib/utils";
import { Divider } from "../infeniti/Divider";
import { RevealHeading } from "../infeniti/RevealHeading";
import { ORIGIN, faqs, posts } from "./content";
import { Footer, Outro } from "./Footer";
import { Container, CtaButton } from "./ui";
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

/** "Why Cuberto" tiles, Insights, FAQ, then the shared OutroSection and Footer. */
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

      <Outro />
      <Footer />
    </>
  );
}
