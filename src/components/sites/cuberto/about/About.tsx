import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { Footer, Outro } from "../Footer";
import { InView } from "../InView";
import { SplitReveal } from "../SplitReveal";
import { Container } from "../ui";
import { benefits, counters, feedback, media, partners, splitshows } from "./content";
import { FeedbackCarousel } from "./FeedbackCarousel";
import { BenefitIcon } from "./icons";
import { Parallax } from "./Parallax";
import { Br, Caption, DrawDivider, Header, Preview } from "./parts";
import s from "./About.module.css";

function Splitshow({ pair }: { pair: (typeof splitshows)[number] }) {
  return (
    <section className={s.splitshow}>
      <Container size="lg">
        <div className={s.splitItems}>
          {pair.map((img, i) => (
            <div key={img.src} className={cn(s.col, i === 1 && s.colRight)}>
              <div className={cn(s.splitPreview, img.sm && s.splitSm)}>
                <Parallax className={s.splitMedia} shownClassName={s.splitMediaShown}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} srcSet={`${img.src2x} 2x`} alt="" loading="lazy" />
                </Parallax>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** cuberto.com/about — "Creativity meets technology". */
export function About() {
  return (
    <>
      <section className={s.tophead}>
        <Container>
          <SplitReveal as="h1" className={s.title}>
            Creativity
            <Br /> meets technology
          </SplitReveal>
        </Container>
      </section>

      <Preview lg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.hero} alt="" />
      </Preview>

      <section className={s.overview} id="goal">
        <Container size="lg">
          <div className={s.grid}>
            <div className={s.left}>
              <Caption as="h2">Our goal</Caption>
            </div>
            <div className={s.right}>
              <SplitReveal className={s.text}>
                <p>
                  From the moment our company was founded, we have helped our clients find exceptional solutions for
                  their businesses, creating memorable brands and digital products. Our expertise grows with each year,
                  and our accumulated experience empowers us to develop products exactly as they should be.
                </p>
              </SplitReveal>
            </div>
          </div>
        </Container>
      </section>

      <Splitshow pair={splitshows[0]} />

      <section className={s.overview} id="advantage">
        <Container size="lg">
          <Header className={s.header}>
            Simply put, we dare
            <Br /> what others don&apos;t
          </Header>
          <DrawDivider className={s.divider} />
          <div className={s.grid}>
            <div className={s.left}>
              <Caption>
                Simply put, we dare
                <br className={s.desktopBreak} /> what others don&apos;t
              </Caption>
            </div>
            <div className={s.right}>
              <SplitReveal className={s.text}>
                <p>
                  We make things, and we&apos;re awesome at it. Cuberto is a tight-knit team of experts who are ready
                  to tackle the most intricate puzzles when it comes to websites and mobile apps development. We love
                  what we do and we bet on the success of each and every project we undertake.
                </p>
                <p>
                  Mainstream? No, thanks. Because it&apos;s not just work, it&apos;s passion. It&apos;s not just
                  clients, it&apos;s people. Every project we take on is important to us, and every client is a big
                  deal. We take care of your projects, your deadlines, and your nerves no matter what, and that’s a
                  promise.
                </p>
              </SplitReveal>
              <InView className={s.counters} shownClassName={s.countersShown}>
                {counters.map((c, i) => (
                  <div key={c.title} className={s.counter} style={{ "--i": i } as CSSProperties}>
                    <span className={s.counterValue}>
                      {c.value}
                      {c.unit}
                    </span>
                    <div className={s.counterTitle}>{c.title}</div>
                  </div>
                ))}
              </InView>
            </div>
          </div>
        </Container>
      </section>

      <Preview>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.office} alt="" loading="lazy" />
      </Preview>

      <section className={s.overview} id="awwwards">
        <Container size="lg">
          <Header className={s.header}>
            Agency of the Year
            <Br /> according to
            <Br /> Awwwards
          </Header>
          <DrawDivider className={s.divider} />
          <div className={s.grid}>
            <div className={s.left}>
              <Caption>
                Agency of the Year
                <br className={s.desktopBreak} /> according to
                <br className={s.desktopBreak} /> Awwwards
              </Caption>
            </div>
            <div className={s.right}>
              <SplitReveal className={s.text}>
                <p>
                  We know winning isn’t everything. However, among the many awards we’ve received, we highlight the
                  most prestigious and respected among international design communities: the{" "}
                  <a href="https://www.awwwards.com/cuberto/" target="_blank" rel="noopener noreferrer">
                    Awwwards
                  </a>{" "}
                  Agency of the Year trophy and the{" "}
                  <a href="https://dribbble.com/cuberto" target="_blank" rel="noopener noreferrer">
                    Dribbble
                  </a>{" "}
                  100K Club Member Award.
                </p>
              </SplitReveal>
            </div>
          </div>
        </Container>
      </section>

      <Preview lg>
        <video src={media.video} autoPlay loop muted playsInline preload="metadata" />
      </Preview>

      <section className={cn(s.overview, s.noGrid)} id="partners">
        <Container size="lg">
          <Header className={s.header}>
            We work with
            <Br /> people from all
            <Br /> over the world
          </Header>
          <InView className={s.logos} shownClassName={s.logosShown}>
            {partners.map((p, i) => (
              <div
                key={p.file}
                className={cn(s.logo, p.desktopOnly && s.desktopOnly)}
                style={{ "--i": i } as CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} loading="lazy" />
              </div>
            ))}
          </InView>
        </Container>
      </section>

      <section className={s.feedback}>
        <Container size="lg">
          <DrawDivider className={s.divider} />
          <div className={s.grid}>
            <div className={s.left}>
              <Caption as="h2">
                Feedback from
                <br className={s.desktopBreak} /> our clients
              </Caption>
            </div>
            <div className={s.right}>
              <FeedbackCarousel items={feedback} />
            </div>
          </div>
        </Container>
      </section>

      <Splitshow pair={splitshows[1]} />

      <section className={cn(s.summary, s.summaryFill, s.inverse)} id="benefits">
        <div className={cn(s.fill, s.fillJoined)} aria-hidden />
        <div className={s.summaryContent}>
          <Container size="lg">
            <Header className={s.summaryHeader} stagger={0.2}>
              Benefits of
              <Br /> working with us
            </Header>
            {benefits.map((b) => (
              <div key={b.title}>
                <DrawDivider className={s.summaryDivider} />
                <div className={s.summaryGrid}>
                  <div className={s.summaryLeft}>
                    <div className={cn(s.icon, s[b.motion])}>
                      <BenefitIcon name={b.icon} />
                    </div>
                  </div>
                  <div className={s.summaryRight}>
                    <div className={s.info}>
                      <div className={cn(s.summaryCaption, s.offset)}>
                        <h3>{b.title}</h3>
                      </div>
                      <SplitReveal className={s.summaryText}>
                        <p>{b.text}</p>
                      </SplitReveal>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Container>
        </div>
      </section>

      <section className={cn(s.summary, s.summaryFill)} id="history">
        <div className={s.fill} aria-hidden />
        <div className={s.summaryContent}>
          <Container size="lg">
            <Header className={s.summaryHeader} stagger={0.2}>
              Get to know us,
              <br /> see what&apos;s up
            </Header>
            <DrawDivider className={s.summaryDivider} />
            <div className={cn(s.summaryGrid, s.compact)}>
              <div className={s.summaryLeft}>
                <div className={s.summaryCaption}>
                  <h3>
                    Get to know us,
                    <br /> see what&apos;s up
                  </h3>
                </div>
              </div>
              <div className={s.summaryRight}>
                <div className={s.info}>
                  <SplitReveal className={s.summaryText}>
                    <p>
                      Two brothers, Roman and Dmitri, founded the company in 2010. Initially, we were a small boutique
                      studio developing designs for sites and mobile applications.
                    </p>
                    <p>
                      Today, Cuberto has grown to a full-cycle agency with attested design expertise. We are the
                      Awwwards Agency of the Year, are in the TOP 10 design agencies according to the most popular
                      design communities in the world, receive international awards for our exceptional products,
                      work with large companies all over the world, teach our own design courses, and gladly share our
                      expertise with you.
                    </p>
                  </SplitReveal>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Outro />
      <Footer />
    </>
  );
}
