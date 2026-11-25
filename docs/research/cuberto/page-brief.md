# cuberto.com reference clone

| Source | Local | Files |
|---|---|---|
| https://cuberto.com/ | `/cuberto` | `src/app/cuberto/page.tsx`, `src/components/sites/cuberto/*` |
| https://cuberto.com/about/ | `/cuberto/about` | `src/app/cuberto/about/page.tsx`, `src/components/sites/cuberto/about/*` |
| https://cuberto.com/projects/ | `/cuberto/projects` | `src/app/cuberto/projects/page.tsx`, `src/components/sites/cuberto/projects/*` |
| https://cuberto.com/projects/<slug>/ (22 case studies) | `/cuberto/projects/<slug>` | `src/app/cuberto/projects/[slug]/page.tsx`, `src/components/sites/cuberto/cases/*` |

`/` stays the Infeniti homepage. This clone is a local reference, and its pages set `noindex`.

Shared between both pages (`src/components/sites/cuberto/`):
- Navbar: marks the current page with an underline.
- Cursor: includes a `data-cursor="next"` long-arrow mode.
- `Footer.tsx`: the Outro section and the footer.
- `SplitReveal` / `InView`: scroll reveals.
- `ui.tsx`: `CtaButton`, which has an `xs` size and an icon slot. Its `SmartLink` navigates client-side for local routes and opens cuberto.com in a new tab otherwise.

`ROUTES` in `content.ts` lists the paths that have a local clone. Every other link points to the live site.

## Content and assets

All text is Cuberto's real copy:
- `content.ts` for the homepage.
- `about/content.ts` for the About page.

Every asset was downloaded from cuberto.com.

`public/sites/cuberto/` holds the homepage assets:
- Showreel video.
- 5 feature backgrounds.
- 12 client logos.
- 10 project covers and their hover videos.
- 5 testimonial logos.
- 3 blog thumbnails.
- The outro background.
- The Suisse Intl regular and medium web fonts.

`public/sites/cuberto/about/` holds the About page assets:
- 2 office photos (1920×1080).
- The office video `screenshot-3.mp4`.
- 4 split photos at 1x and 2x.
- 9 partner logo SVGs.
- The long-arrow cursor icon, from `/assets/sprites/svgsprites.svg`, inlined in `Cursor.tsx`.

No dummy content was needed.

**Licensing:** Suisse Intl and all media belong to Cuberto. They are fine for local study but must not be deployed or published.

## Page transition

`PageTransition.tsx` reproduces the source's `.Loader`. It is mounted in `src/app/cuberto/layout.tsx`, so it persists across `/cuberto` routes.

How it works:
1. Clicking a link to another `/cuberto` page (no new tab, no modifier keys, a different path) is intercepted before next/link handles it.
2. A 30% black backdrop fades in (0.5s) while a white panel grows up from the bottom: scaleY 0→1, 0.7s, power4.inOut.
3. The route changes under the panel, and the page scrolls to the top.
4. The backdrop drops at once and the panel fades out over 0.4s.
5. Entrance and scroll reveals wait for the page to be uncovered (`afterUncover`, the `html.loader` class), so the new page's animations play in view, as the source plays them after the loader hides.

Not animated, as on the source: browser back and forward, same-page links, external links, and anything when reduced motion is preferred.

Verified (2026-11-25):
- The panel's timing was sampled during a real click.
- Rapid double clicks give one transition.
- Cards, the reel, the logo, the navbar and the footer all transition.
- The production build passes.

## Case studies (`/cuberto/projects/<slug>`)

All 22 case studies use the same section components: Tophead, Preview, Overview, Splitshow, Feedback (13 of them) and Nextcase. So they are built as one data-driven page rather than 22 hand-written ones.

How the data is produced:
- `scripts/cuberto-cases.py` parses the downloaded source pages into `cases/cases.json`: rich text with desktop-only and always line breaks, links, bold and lists, plus media paths, details, tiles, captions, the feedback quote and the next project.
- To regenerate, re-download the pages into a folder and run `python3 scripts/cuberto-cases.py <folder>`.

How the pages are built:
- `cases/CaseStudy.tsx` renders the sections, reusing the About page's building blocks (`about/parts.tsx`, `about/About.module.css`).
- Case-only parts are in `cases/Case.module.css`: tophead details, preview label, overview links and tiles, split sizes and captions, and the reel.
- The route pre-renders all 22 slugs with `generateStaticParams`. `dynamicParams = false` makes any other slug a 404.

Media: 426 files (141 MB) in `public/sites/cuberto/cases/<slug>/`, at the base resolution only. The source's `@1.5x` images (screens 1600px and wider) and `@2x` split images (retina) were not downloaded. Three source files had cache-busting query strings in their names, and daoway's `main.jpg` is really a PNG; these were saved as `main.png`, `screenshot/1.png` and `screenshot/4.mp4`.

Next-project reel, from the source's Reeller setup:
- One "Next project" item scrolls by every 15s, set in Suisse Intl light (300, now loaded).
- Scrolling runs it in reverse at 0.3× the scroll delta, then it eases back to normal speed and keeps the last direction.
- Hovering shows the next project in a 36rem cursor circle and inverts the text. It is the card video for 10 projects and the cover image for the other 12, as on the source.

Verified (2026-11-25):
- Every section's top and height on all 22 pages was compared with the live pages, in a 1440×900 frame and a 375×812 frame. Total heights match exactly on all 44 comparisons.
- Visual checks on FIND (details, Project button, tiles), Kzero ("Old site" label), Cisco (split captions) and Datalight (reel and cursor video).
- Navigation: Projects-page cards, homepage cards and the reel all open the local case study in the same tab, at the top, with Projects underlined.
- All 22 routes return 200, an unknown slug returns 404, and all 438 media URLs load.

Also changed:
- Project cards on the Projects page and the homepage now route locally.
- The navbar underlines its section on sub-pages.
- The cursor gained a `data-cursor="media"` image/video mode.

## Projects page

Source structure: an EntrylistSection (an "Our projects" heading, an intro line, 4 filter tabs and 22 project cards), then the shared Outro and Footer. The card list in `projects/content.ts` was generated from the source markup: names, captions, categories (`web`, `app`, `branding`) and the one `object-position` override (Kelvin Zero). Covers are in `public/sites/cuberto/projects/covers/` at 1x and 2x. Some of the source's `.jpg` URLs actually serve PNG data, so those files are saved as `.png`.

The Projects page also loads Suisse Intl bold (700, for the project names). Semibold (600) was added to the layout too; the About page's small buttons use it.

Motion and behavior, from the source's `EntrylistSection` and `Card` scripts:

| Element | Behavior |
|---|---|
| Heading, intro, filters | Part of the page-enter timeline, so they play on load at any scroll position. Heading words are 0.1s apart. Filters rise 30px (50px on screens wider than 1000px) and fade in, power3.out 1s, 0.04s apart, starting at 0.2s. |
| Cards | Rise 70px (2s expo.out) and fade in (1s) as they scroll in. Cards entering together are staggered 0.1s apart (ScrollTrigger.batch). |
| Filter click | The underline moves at once. The grid fades out (0.25s), is replaced by the matching cards (which reveal again) and fades back in (0.2s). |
| Card hover | The preview scales to .98 and the image to 1.05 (1.2s expo.out). The cursor shows the ↗ arrow. |

Cards link to the live case studies on cuberto.com in a new tab, since those pages aren't cloned.

Verified (2026-11-25):
- At 1440×900 and 375×812, every measured position matches the source (8,622px and 12,196px total).
- The Branding filter shows the same 6 projects and the same 3,726px height as the source.
- All 22 cards reveal on a wheel scroll.
- These links reach `/cuberto/projects` at the top of the page: navbar Projects, the homepage's "View all projects" button, and footer Projects on the About page.

Also fixed while building this: scroll reveals now also count elements already scrolled past, matching ScrollTrigger. Before this, reloading mid-page left content above the viewport hidden on both the About and Projects pages.

## About page sections

Source section order:
1. Tophead
2. Preview (lg)
3. Overview "Our goal"
4. Splitshow
5. Overview "advantage": header, divider, text and counters
6. Preview
7. Overview "awwwards"
8. Preview video (lg)
9. Overview "partners" logo grid
10. Feedback carousel
11. Splitshow
12. Summary "benefits", inverse
13. Summary "history"
14. Outro
15. Footer

The CSS values come from the source's own component stylesheets:
- `PreviewSection`
- `OverviewSection`
- `SummarySection`
- the inline `SplitshowSection`
- `FeedbackSection`, read from the CSSOM

### Motion

These values come from the source's GSAP modules (`transitions.*.js` and each section's script). Unless noted otherwise, each animation runs once and starts when the element's top enters the viewport.

| Element | Behavior |
|---|---|
| Headers, captions, text | SplitText words rise from 120%, 1.7s expo.out. Word delays spread over 0.6s in total. Captions use 0.1s per word; Summary headers use 0.2s. |
| Counters | Rise 70px (2s expo.out) and fade in (1s), 0.1s apart. |
| Partner logos | Fade in over 2s, 0.1s apart. |
| Preview frame on screen at load | Opens from `inset(5% 10%)` at scale .9 over 2.5s (expo.out). |
| Other preview frames | Fade in over 1s. |
| Preview and split media | Scale 1.05 and translate from −10% to 10% across the viewport, scroll-scrubbed. Split photos also fade in over 1s. |
| Dividers | Draw in from the left, scaleX 0→1 over 3s (expo.out). |
| Feedback carousel | Swiper settings: 1 slide per view, loops, 30px space, 1s speed, grab cursor. Clicking a quote shows the next one, and hovering it switches the cursor to a long arrow. |
| Benefit icons | Rotate over 5s, linear. The "flexible terms" icon animates its stroke dashes instead. |

## Verified (2026-11-25)

Section positions and heights were compared against the live About page:
- **1440×900:** every section's top and height matches exactly, and the document height is 11,099px on both.
- **375×812:** every section matches exactly, and the document height is 9,845px on both.

Interactions tested with real input:
- Reveals complete after scrolling with the wheel.
- The carousel can be dragged both ways and loops at each end.
- Clicking a quote advances the carousel.
- The cursor switches to the arrow over a quote.
- These links reach `/cuberto/about` at the top of the page: navbar About on desktop, mobile menu About, and footer About from the bottom of the homepage.
- The logo goes back to `/cuberto`.

There is no horizontal overflow at either width. Homepage geometry still matches the source to within 7px after the shared refactor.

Also fixed while checking: on mobile, the navbar had an extra 14px of grid padding, and the open-menu content widened the toggle column. The source has neither.

## Known gaps

- On the About page, the Outro heading and the footer still use the homepage's older reveal component, not the SplitReveal timings.
- The "★ 5.0 Google" buttons don't play Cuberto's button-entrance animation, where the border scales in and the labels rise.
- The homepage's text blocks don't use SplitReveal yet; only its headings reveal.
- The cursor's media and text modes aren't used on these pages, so they weren't rebuilt.
- Navigation links point to the live cuberto.com pages for every route not cloned yet (Services, Blog, Contacts, Privacy).
- Case studies use base-resolution media only. They look slightly softer on retina and very wide screens than the source.
- External links inside case studies (Launch project, App Store, Awwwards and so on) go to the real sites.
- The source's "empty" filter message isn't rebuilt; no filter on the source is empty.
