# This round's changes

## 1. Reorg — Army module moved under IndianMilitary/IndianArmy

Old locations → new locations (all under `src/`):

| Old | New |
|---|---|
| `src/modules/history/HistoryTimeline.jsx` | `src/IndianMilitary/IndianArmy/ArmyHistory.jsx` |
| `src/modules/history/TimelineRail.jsx` | `src/IndianMilitary/IndianArmy/TimelineRail.jsx` |
| `src/modules/history/TimelineDot.jsx` | merged into `TimelineRail.jsx` (see §3) |
| `src/modules/history/EraPanel.jsx` | `src/IndianMilitary/IndianArmy/EraPanel.jsx` |
| `src/modules/history/useScrollTimeline.js` | `src/IndianMilitary/IndianArmy/useScrollTimeline.js` |
| `src/modules/history/history.module.css` | `src/IndianMilitary/IndianArmy/history.module.css` |
| `src/hooks/useMediaQuery.js` + `useReducedMotion.js` | merged into `src/IndianMilitary/IndianArmy/hooks.js` |
| `src/data/army/history.json` | `src/IndianMilitary/IndianArmy/data/history.json` |

Nothing in these files changed behaviorally — only import paths were
updated to match the new locations. `App.jsx` now mounts this module at
the `/army` route instead of mounting it directly.

I also found two leftover, unused folders in the zip you uploaded and
dropped them — they weren't wired into the app (Vite only builds from
`src/`), so removing them doesn't change how the project runs:
- a top-level `IndianMilitary/IndianArmy` `/IndianNavy` `/IndianAirForce`
  (empty, sitting outside `src/`)
- a literal folder named `src/{data/army,modules/history,styles,hooks,three,components}`
  (looks like a `mkdir -p` with brace expansion that didn't execute as a
  shell would run it, so it created one folder with that name instead of
  six separate ones)

## 2. Landing page (IndianMilitary)

`src/IndianMilitary/Landing.jsx` (+ `Landing.module.css`) is the new `/`
route — a tricolor flag (saffron / white+chakra / green) with three
clickable regions matching your sketch's zones:
- **Indian Army** (left of the saffron band) → `/army`, which renders the
  module described above.
- **Indian Navy** (right of the saffron band) → `/navy`
- **Indian Air Force** (centered on the chakra) → `/airforce`

Navy and Air Force aren't built yet, so those two routes show a small
"not built yet" page (`ComingSoon.jsx`) with a link back to `/`. The
folders `src/IndianMilitary/IndianNavy/` and `.../IndianAirForce/` are
left empty (with a README each) as the reserved spot to build them the
same way Army is structured, whenever you get to them.

I drew the flag in code (CSS bands + an SVG Ashoka Chakra) rather than
embedding your sketch photo as an image — same layout and zones as the
sketch, but crisp at any screen size instead of a fixed-resolution photo.
Your sketch is still in the project at `DesignIdeas/FrontDesign.png` for
reference.

Routing uses `react-router-dom`, which was already in `package.json` as a
dependency but wasn't wired up before now — no new packages needed.

## 3. Conciseness pass on the Army module

Went from 9 files to 7 without changing what any of them do:
- `TimelineDot.jsx` (a small button only ever used by `TimelineRail`)
  merged into `TimelineRail.jsx` as a local, non-exported component.
- `useMediaQuery.js` and `useReducedMotion.js` merged into one
  `hooks.js` (the second is a 2-line wrapper around the first).

I left `useScrollTimeline.js` as its own file even though it's only used
by `ArmyHistory.jsx` — it has real logic and a detailed comment
explaining a design decision (CSS sticky vs. GSAP pin), and folding it in
would make `ArmyHistory.jsx` harder to scan. Also left `EraPanel.jsx`
separate since it's a distinct, reusable content block. Shout if you'd
rather I flatten further.

Also dropped two unused leftover assets from the Vite starter template
that nothing imports: `src/assets/hero.png`, `src/assets/vite.svg`, and
`public/icons.svg` (unrelated social-icon sprites). Kept `public/favicon.svg`
since `index.html` references it.

The old `dist/` folder (a stale production build) isn't included — it's
generated output, not source, and would no longer match the new file
layout. Run `npm run build` if you want a fresh one.

## How to test

```bash
npm install
npm run dev
```

- Open `/` — you should see the tricolor with three labeled pills.
- Click **Indian Army** — should land on the exact same scrollytelling
  history timeline as before (rail on the left desktop / top on mobile,
  eras scroll-linked, same content).
- Click **Indian Navy** / **Indian Air Force** from `/` — should show the
  "not built yet" placeholder with a link back home.
- Resize below 900px — rail should still switch to the horizontal strip
  on the Army page like before.

## Next steps (whenever you're ready)

- Build out `IndianNavy` and `IndianAirForce` the same way `IndianArmy`
  is structured, then swap their routes in `App.jsx` from `ComingSoon` to
  the real module.
- Real images for Army eras (currently placeholders) per the README.
- The 3D rippling flag mentioned in the original README — not started;
  `three` and `@react-three/fiber` are installed but unused.
