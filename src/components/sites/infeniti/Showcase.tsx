import { SITE, clients, testimonials, works } from "./content";
import { RevealHeading } from "./RevealHeading";
import { Container, CtaButton } from "./ui";
import s from "./Showcase.module.css";

/** Cuberto LogoreelSection + "Selected work" (inverse) + testimonials fan. */
export function Showcase() {
  const left = works.filter((_, i) => i % 2 === 0);
  const right = works.filter((_, i) => i % 2 === 1);

  return (
    <>
      <section className={s.logoreel}>
        <Container size="lg">
          <h2 className={s.logoHeader}>Trusted by Leading Clients</h2>
          <div className={s.logos}>
            {clients.map((c) => (
              <div key={c.src} className={s.logo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${s.summary} ${s.inverse} ${s.joined}`}>
        <div className={s.fillBg} aria-hidden />
        <Container size="lg" className={s.content}>
          <RevealHeading className={s.header} text="Our Best Works" />
          <div className={s.cards}>
            {[left, right].map((col, ci) => (
              <div key={ci} className={s.col}>
                {col.map((w) => (
                  <a key={w.slug} href={w.href} className={s.card} data-cursor="icon">
                    <span className={s.preview}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={w.src} alt={`${w.title} project preview`} width={1600} height={757} loading="lazy" />
                    </span>
                    <span className={s.cardTitle}>{w.title}</span>
                    <span className={s.cardDate}>{w.date}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className={s.more}>
            <CtaButton href={`${SITE}/work`} variant="outline">
              View Works
            </CtaButton>
          </div>
        </Container>
      </section>

      <section className={`${s.summary} ${s.fillSection}`}>
        <div className={s.fillBg} aria-hidden />
        <Container size="lg" className={s.content}>
          <RevealHeading className={`${s.header} ${s.center}`} text="Real People, Real Results Feedback" />
          <div className={s.testimonials}>
            {testimonials.map((t) => (
              <figure key={t.name} className={s.testimonial}>
                <span className={s.quotes} aria-hidden />
                <blockquote className={s.quote}>{t.text}</blockquote>
                <span className={s.divider} aria-hidden />
                <figcaption className={s.author}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt="" width={48} height={48} loading="lazy" />
                  <span>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
