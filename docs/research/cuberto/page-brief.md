# cuberto.com reference clone

| Source | Local | Files |
|---|---|---|
| https://cuberto.com/ | `/cuberto` | `src/app/cuberto/page.tsx`, `src/components/sites/cuberto/*` |
| https://cuberto.com/about/ | `/cuberto/about` | `src/app/cuberto/about/page.tsx`, `src/components/sites/cuberto/about/*` |

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
- Navigation links point to the live cuberto.com pages for every route not cloned yet.
