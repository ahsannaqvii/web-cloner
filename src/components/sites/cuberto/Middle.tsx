import { cn } from "@/lib/utils";
import { RevealHeading } from "../infeniti/RevealHeading";
import { ROUTES, logos, testimonials, workColumns } from "./content";
import { Container, CtaButton } from "./ui";
import { WorkCard } from "./WorkCard";
import s from "./Middle.module.css";

/** LogoreelSection + "Selected work" (inverse) + "Trusted by our clients". */
export function Middle() {
  return (
    <>
      <section className={s.logoreel}>
        <Container size="lg">
          <h2 className={s.logoHeader}>Trusted by remarkable global brands</h2>
          <div className={s.logos}>
            {logos.map((l) => {
              // eslint-disable-next-line @next/next/no-img-element
              const img = <img src={l.src} alt={`${l.name} logo`} width={300} height={126} loading="lazy" />;
              return l.href ? (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.logo}
                  data-cursor="icon"
                >
                  <span className={s.logoImg}>{img}</span>
                </a>
              ) : (
                <div key={l.name} className={s.logo}>
                  <span className={s.logoImg}>{img}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={cn(s.summary, s.inverse, s.joined)}>
        <div className={s.fillBg} aria-hidden />
        <Container size="lg" className={s.content}>
          <RevealHeading className={s.header} text="Selected work" />
          <div className={s.cards}>
            {workColumns.map((col, ci) => (
              <div key={ci} className={s.col}>
                {col.map((w) => (
                  <WorkCard key={w.slug + ci} {...w} />
                ))}
              </div>
            ))}
          </div>
          <div className={s.more}>
            <CtaButton href={ROUTES.projects} inverse>
              View all projects
            </CtaButton>
          </div>
        </Container>
      </section>

      <section className={cn(s.summary, s.fillSection)}>
        <div className={s.fillBg} aria-hidden />
        <Container size="lg" className={s.content}>
          <RevealHeading className={cn(s.header, s.center)} text="Trusted by our clients" />
          <div className={s.testimonials}>
            {testimonials.map((t) => (
              <figure key={t.logo} className={s.testimonial}>
                <span className={s.quotes} aria-hidden />
                <blockquote className={s.quote}>{t.text}</blockquote>
                <span className={s.divider} aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.testimonialLogo} src={t.logoSrc} alt={`${t.logo} logo`} loading="lazy" />
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
