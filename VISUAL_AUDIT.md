# Visual audit — pre-intervention

## Scope and limitation

The audit reviewed the homepage markup, global stylesheet, layout, navigation,
footer, UI primitives, and current media registry before visual changes. A live
browser review could not be completed because dependency installation is blocked
in the local environment; the initial audit is therefore based on rendered-layout
logic and CSS inspection, with browser screenshots required after dependencies
are available.

## Findings

1. **Hero composition:** the split direction is appropriate, but the existing
   45/55 relationship is weakened by a generic placeholder and a headline that
   does not interact strongly enough with the image plane.
2. **Photography placeholder:** the CSS head/body silhouette reads as an
   unfinished illustration and conflicts with the rule against artificial
   likenesses. It must become a neutral crop-aware editorial block.
3. **BGV identity:** numbering and micro-labels exist, but they are applied as
   incidental captions rather than a consistent cover/index system.
4. **Rhythm:** most sections inherit the same large vertical padding. The page
   lacks deliberate tight, standard, and major-break intervals.
5. **Homepage completeness:** the current approved-content gates produce a very
   short page. Editorial moments can be strengthened without inventing proof,
   metrics, clients, testimonials, or course details.
6. **Typography:** the serif/sans pairing is suitable. The missing layer is a
   named fluid scale and tighter control of line length, line height, and labels.
7. **Navigation:** desktop is restrained; mobile behaves like a dropdown rather
   than an intentional editorial menu and the BGV wordmark lacks a signature
   index treatment.
8. **Image readiness:** all media records are `asset-missing`; every visual slot
   must preserve its final ratio and switch to `next/image` only at `approved`.
9. **Microinteraction:** link and arrow motion is appropriate; program title
   movement and image treatment need refinement without adding a motion library.
10. **Accessibility:** focus and reduced-motion rules exist. The new visual system
    must preserve these and avoid using low-contrast microtype for essential text.

## Intervention boundary

Retain the ivory/charcoal palette, serif/sans pairing, rules, square geometry,
program rows, and overall route/content architecture. Change composition,
photography treatment, typography scale, spacing rhythm, mobile navigation, and
subtle interaction only.
