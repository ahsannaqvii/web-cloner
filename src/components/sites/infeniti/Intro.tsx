import { CALENDLY, SITE } from "./content";
import { RevealHeading } from "./RevealHeading";
import { Container, CtaButton, Roll } from "./ui";
import s from "./Intro.module.css";

/** Cuberto TopheadSection + PreviewSection + first OverviewSection. */
export function Intro() {
  return (
    <>
      <section className={s.tophead}>
        <Container>
          <p className={s.eyebrow}>Software Should Work Your Way</p>
          <RevealHeading as="h1" className={s.title} text="Software Built Around Your Business" />
          <p className={s.text}>Custom software for businesses that have outgrown off-the-shelf solutions.</p>
        </Container>
      </section>

      <section className={s.preview}>
        <Container>
          <div className={s.main}>
            <div className={s.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sites/infeniti/work/hero-showcase.webp"
                alt="The Infeniti team reviewing a project together"
                width={3200}
                height={3669}
              />
            </div>
            <span className={s.label}>Infeniti</span>
            <div className={s.content}>
              <div className={s.info}>
                <h2 className={s.header}>Our Bold and Brilliant Thinkers</h2>
              </div>
              <div className={s.action}>
                <CtaButton href={`${SITE}/about`} size="md" variant="fill">
                  Learn More
                </CtaButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className={s.overview}>
        <Container>
          <div className={s.grid}>
            <div className={s.left}>
              <h2 className={s.caption}>About Infeniti</h2>
            </div>
            <div className={s.right}>
              <p className={s.overviewText}>
                Infeniti builds custom enterprise software for complex businesses that have outgrown standard
                solutions. Combining product thinking, engineering, and business understanding, we create
                technology designed around your operations and built for long-term growth.
              </p>
              <div className={s.links}>
                <a href={`${SITE}/service`} className={s.link}>
                  <Roll text="What We Offer" />
                </a>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.link}>
                  <Roll text="Book A Consultation" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
