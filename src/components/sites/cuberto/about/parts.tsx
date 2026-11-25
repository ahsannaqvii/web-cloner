import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Divider } from "../../infeniti/Divider";
import { InView } from "../InView";
import { SplitReveal } from "../SplitReveal";
import { Container } from "../ui";
import { Parallax } from "./Parallax";
import { PreviewFrame } from "./PreviewFrame";
import s from "./About.module.css";

/* Section building blocks shared by the About page and the case studies. */

/** Desktop-only line break (cuberto `<br class="-gxs">`). */
export const Br = () => <br className={s.desktopBreak} />;

/** Elastic divider that draws in from the left (scaleX 0 → 1, 3s expo.out) as it scrolls into view. */
export function DrawDivider({ className }: { className: string }) {
  return (
    <InView className={cn(className, s.draw)} shownClassName={s.drawShown}>
      <Divider />
    </InView>
  );
}

/** PreviewSection: full-width rounded media with scroll parallax. `lg` crops taller on phones. */
export function Preview({ lg, children, overlay }: { lg?: boolean; children: ReactNode; overlay?: ReactNode }) {
  return (
    <section className={s.preview}>
      <Container>
        <PreviewFrame lg={lg}>
          <Parallax className={s.media}>{children}</Parallax>
          {overlay}
        </PreviewFrame>
      </Container>
    </section>
  );
}

/** Small uppercase caption; words rise 0.1s apart. */
export function Caption({ as = "h3", children }: { as?: "h2" | "h3"; children: ReactNode }) {
  return (
    <div className={s.caption}>
      <SplitReveal as={as} stagger={0.1}>
        {children}
      </SplitReveal>
    </div>
  );
}

/** Large section header; words spread over 0.6s (or `stagger` apart). */
export function Header({ className, stagger, children }: { className: string; stagger?: number; children: ReactNode }) {
  return (
    <div className={className}>
      <SplitReveal as="h2" stagger={stagger}>
        {children}
      </SplitReveal>
    </div>
  );
}
