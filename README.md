# Know Your Army

A study aid for SSB prep: an Indian-tricolor landing page with a link into
each service. Only the Army module is built so far.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. `/` is the landing page; click **Indian
Army** to go to `/army`.

## Structure

```
src/
  main.jsx, App.jsx        — router setup, top-level routes
  styles/                  — shared design tokens + global reset
  IndianMilitary/
    Landing.jsx            — the tricolor landing page (route: /)
    ComingSoon.jsx          — placeholder shown for /navy and /airforce
    IndianArmy/             — the Army module (route: /army)
      ArmyHistory.jsx        — module entry, wires rail + panels + scroll hook
      TimelineRail.jsx        — left rail (desktop) / top strip (mobile)
      EraPanel.jsx             — one era's content block
      useScrollTimeline.js      — GSAP ScrollTrigger logic
      hooks.js                  — useMediaQuery / useReducedMotion
      history.module.css         — module-scoped styles
      data/history.json           — the 5 eras' content
    IndianNavy/              — reserved, not built
    IndianAirForce/          — reserved, not built
```

## Known placeholders

- All Army era narrative text is flagged `PLACEHOLDER — verify` in
  `history.json` — fact-check before relying on it.
- Images render as placeholders in `EraPanel.jsx` — swap in real images by
  adding files under `public/assets/army/history/` and updating the `src`
  paths in `history.json`.
- Google Fonts (Rajdhani, Source Serif 4, IBM Plex Mono) load via `@import`
  in `global.css` — needs an internet connection when running.
- Navy and Air Force routes show a "not built yet" page.

## Not built yet

- Navy / Air Force modules (folders reserved under `src/IndianMilitary/`)
- 3D rippling flag on the landing page (`three` / `@react-three/fiber` are
  installed but unused)
