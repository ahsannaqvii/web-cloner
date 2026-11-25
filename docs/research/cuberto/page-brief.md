# cuberto.com homepage — reference clone

| Source | Local |
|---|---|
| https://cuberto.com/ | `/cuberto` → `src/app/cuberto/` + `src/components/sites/cuberto/` |

`/` stays the Infeniti homepage; this clone is a local reference (page sets `noindex`).

## Content and assets

All text is Cuberto's real copy (`content.ts`). Every asset was downloaded from cuberto.com into
`public/sites/cuberto/`: showreel video, 5 feature backgrounds, 12 client logos, 10 project covers
plus their hover videos, 5 testimonial logos, 3 blog thumbnails, outro background, and the
Suisse Intl regular/medium web fonts. No dummy content was needed.

**Licensing:** Suisse Intl and all media belong to Cuberto. They are fine for local study but must not be
deployed or published.

## Verified (2026-11-24)

Section top/height at 1440×900 matches the source to within 15px for every section. At 375×812 it
matches to within 20px. Checked interactions: FAQ accordion, project-card hover video, feature cards
darkening on scroll (one open card at a time on mobile), mobile menu, and scaled-pop tiles.

## Known gaps

- The cursor's media/text modes aren't used on the homepage, so they weren't rebuilt.
- Cuberto's GSAP easing is approximated with CSS transitions and a scroll-progress scrub.
- Navigation links point to the live cuberto.com pages, since only the homepage was cloned.
