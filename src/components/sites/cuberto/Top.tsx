import { RevealHeading } from "../infeniti/RevealHeading";
import { CtaButton, Container } from "./ui";
import s from "./Top.module.css";

const SHOWREEL_HREF = "https://higgsfield.ai/@cuberto/projects/talent-contest";

/** TopheadSection + PreviewSection + "What we do" OverviewSection. */
export function Top() {
  return (
    <>
      <section className={s.tophead}>
        <Container>
          <RevealHeading as="h1" className={s.title} text="Digital design & development agency" />
          <p className={s.text}>
            We design and build digital products, brands and websites for companies ready to move beyond the ordinary.
          </p>
        </Container>
      </section>

      <section className={s.preview}>
        <Container>
          <div className={s.main}>
            <div className={s.media}>
              <video src="/sites/cuberto/video/showreel-mask.mp4" autoPlay loop muted playsInline preload="metadata" />
            </div>
            <div className={s.content}>
              <div className={s.info}>
                <h2 className={s.header}>AI Video Production</h2>
                <p className={s.previewText}>
                  We create branded video ads and promotional films using AI, motion design and editing
                </p>
              </div>
              <div className={s.action}>
                <CtaButton href={SHOWREEL_HREF} fill inverse size="md">
                  Explore
                </CtaButton>
              </div>
            </div>
            <a
              className={s.link}
              href={SHOWREEL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AI Video Production"
            />
          </div>
        </Container>
      </section>

      <section className={s.overview}>
        <Container size="lg">
          <div className={s.grid}>
            <div className={s.left}>
              <h2 className={s.caption}>What we do</h2>
            </div>
            <div className={s.right}>
              <p className={s.overviewText}>
                Since 2010, we&apos;ve partnered with startups, scale-ups and global companies to design brands,
                websites and digital products that combine beautiful visuals with measurable business results.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
