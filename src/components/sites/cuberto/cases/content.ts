import data from "./cases.json";

/** Rich text from the source markup: text runs, line breaks and inline elements. */
export type Inline =
  | string
  | { br: "desktop" | "always" }
  | { tag: "a" | "strong" | "b" | "em" | "span"; href?: string | null; children: Inline[] };

export type Block = { p: Inline[] } | { ul: Inline[][] };

export type Media = { type: "image" | "video"; src: string };

export type PreviewSection = { type: "preview"; media: Media; lg?: boolean; static?: boolean; label?: string };

export type OverviewSection = {
  type: "overview";
  id?: string;
  header?: Inline[];
  divider?: boolean;
  caption?: { tag: string; content: Inline[] };
  text?: Block[];
  links?: { label: string; href: string }[];
  tiles?: { highlighted: boolean; caption: string; text: Block[] }[];
};

export type SplitshowSection = {
  type: "splitshow";
  cols: { side: "left" | "right"; items: { media: Media; size?: string; caption?: Inline[] }[] }[];
};

export type FeedbackSection = {
  type: "feedback";
  caption: Inline[];
  name: string;
  role: string;
  text: Block[];
  review?: string;
};

export type Section = PreviewSection | OverviewSection | SplitshowSection | FeedbackSection;

export type Detail = { text?: string; href?: string; cta?: string };

export type Case = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  name: string;
  title: Inline[];
  details?: Detail[];
  sections: Section[];
  next: string;
  /** Shown inside the cursor while hovering the "Next project" reel. */
  nextMedia: Media;
};

/**
 * All 22 cuberto.com case studies, generated from the source pages by scripts/cuberto-cases.py.
 * Media lives in public/sites/cuberto/cases/<slug>/.
 */
export const cases = data as Case[];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
