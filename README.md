# 🇮🇳 Know Your Army

**An interactive, visual knowledge hub and study portal for SSB (Services Selection Board) aspirants, defense enthusiasts, and citizens to learn about the Indian Armed Forces.**

The app opens on a tricolor landing page and currently routes into a fully-built **Indian Army** module — organizational command structure visualizers, an "Order of Battle" drill-down tree, a scrollytelling historical timeline, and an Arms & Services / Combat Arms encyclopedia. **Indian Navy** and **Indian Air Force** are reserved routes with a "Coming Soon" placeholder, ready to be built out the same way.

🔗 **Live app:** [knowyourarmy.onrender.com](https://knowyourarmy.onrender.com)

---

## 📑 Table of Contents

- [Features](#-features--capabilities)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start--development)
- [Available Scripts](#-available-scripts)
- [Route Map](#-route-map)
- [Project Structure](#-project-structure)
- [Data Sources & Content](#-data-sources--content)
- [Deployment (Render)](#-deployment--spa-routing-render)
- [Development History](#-development-history)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ Features & Capabilities

| | |
|---|---|
| 🎨 **Tricolor Landing Page** (`/`) | High-contrast, responsive Saffron–White–Green interface with animated Service cards for Army, Navy, and Air Force. |
| 🎖️ **Indian Army Hub** (`/army`) | Central dashboard with an animated 4+4 module grid routing into every Army topic. |
| 🏢 **Command & Organizational Structure** (`/army/structure`) | Interactive tree of Army HQ → all 7 Commands (Northern, Western, Eastern, Southern, Central, South Western, ARTRAC) with emblems, HQ locations, and an animated Chain of Command diagram fetched from JSON. |
| ⚔️ **Order of Battle — Structure Details** (`/army/structure/details`) | Deep-dive tree: COAS → 7 Commands → Corps → Divisions, with a clickable horizontal sub-tree view per Command and a unit-type legend. |
| 🛡️ **Arms & Services Hub** (`/army/arms`) | Category hub for Combat Arms, Combat Support Arms, and Services. |
| 🪖 **Combat Arms** (`/army/arms/combat`) | Three-column deep dive into **Infantry**, **Mechanised Infantry**, and **Armoured Corps** — role, raised-on date, regiment/battalion counts, collapsible history, notable operations, and categorized equipment cards with photos. |
| 📜 **Scrollytelling History Timeline** (`/army/history`) | GSAP ScrollTrigger–powered timeline tracking the Indian Army across 5 historical eras (Ancient → Modern), with a desktop side-rail and a mobile top-strip fallback. |
| ⚡ **Performance & Code Splitting** | React 19 + Vite 8, with `React.lazy` / `Suspense` route-level chunking so each branch only downloads its own bundle. |
| 📱 **Responsive & Accessible** | Fluid typography design system, `prefers-reduced-motion` support, and keyboard-operable interactive trees. |
| 🚧 **Navy & Air Force** (`/navy`, `/airforce`) | Reserved routes rendering a shared `ComingSoon` placeholder until those modules are built. |

---

## 🧰 Tech Stack

- **[React 19](https://react.dev/)** + **[Vite 8](https://vite.dev/)** — UI & build tooling
- **[react-router-dom v7](https://reactrouter.com/)** — client-side routing (`BrowserRouter`)
- **[GSAP](https://gsap.com/) (`ScrollTrigger`)** — scrollytelling timeline engine
- **[animate.css](https://animate.style/)** — entrance/utility animations
- **[three.js](https://threejs.org/) + `@react-three/fiber` + `@react-three/drei`** — installed and ready for the planned 3D rippling flag hero (not yet wired up)
- **[oxlint](https://oxc.rs/)** — fast Rust-based linter (`react`, `oxc` plugins; enforces rules-of-hooks)
- CSS Modules + a shared `variables.css` design-token system (no CSS framework)

---

## 🚀 Quick Start & Development

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Local Setup

```bash
git clone https://github.com/Rajneessh/knowYourArmy.git
cd knowYourArmy
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

---

## 📜 Available Scripts

| Script | Command | Purpose |
|---|---|---|
| **Dev Server** | `npm run dev` | Launches the Vite dev server with HMR |
| **Production Build** | `npm run build` | Compiles the optimized bundle into `dist/` |
| **Preview Build** | `npm run preview` | Serves the `dist/` folder locally to sanity-check a production build |
| **Lint** | `npm run lint` | Runs `oxlint` for ultra-fast static analysis |

---

## 🗺️ Route Map

| Route | Component | Status |
|---|---|---|
| `/` | `Landing` | ✅ Live |
| `/army` | `ArmyHub` | ✅ Live |
| `/army/structure` | `ArmyStructure` | ✅ Live |
| `/army/structure/details` | `ArmyStructureDetails` | ✅ Live |
| `/army/arms` | `ArmyArms` | ✅ Live |
| `/army/arms/combat` | `CombatArms` | ✅ Live |
| `/army/arms/combat-support` | `ComingSoon` | 🔴 Placeholder |
| `/army/arms/services` | `ComingSoon` | 🔴 Placeholder |
| `/army/history` | `ArmyHistory` | ✅ Live |
| `/army/regiments` | `ComingSoon` | 🔴 Placeholder |
| `/army/conflicts` | `ArmyOperations` | ✅ Live |
| `/army/heroes` | `ComingSoon` | 🔴 Placeholder |
| `/army/chiefs` | `ArmyChiefs` | ✅ Live |
| `/army/humanitarian` | `ComingSoon` | 🔴 Placeholder |
| `/navy` | `ComingSoon` | 🔴 Placeholder |
| `/airforce` | `ComingSoon` | 🔴 Placeholder |

All routes are declared in `src/App.jsx` and lazy-loaded per branch for smaller initial bundles.

---

## 📁 Project Structure

```
knowYourArmy/
├── README.md                        # You are here — full project guide
├── package.json                     # Metadata & dependencies
├── vite.config.js                   # Vite config (watch excludes for DesignIdeas/, dist/)
├── render.yaml                      # Render static-site blueprint (SPA rewrite rule)
├── index.html                       # HTML entry point
├── DataInText/
│   └── IndianArmyHistory.txt        # Raw research notes backing history.json
│
├── public/
│   ├── _redirects                   # Netlify/SPA rewrite fallback
│   ├── favicon.svg                  # Ashoka Chakra favicon
│   └── data/chainOfCommand.json     # Chain-of-command tree, fetched at runtime
│
└── src/
    ├── main.jsx                    # App entry — mounts BrowserRouter
    ├── App.jsx                     # Lazy-loaded route table (see Route Map above)
    │
    ├── styles/
    │   ├── variables.css           # Design tokens: colors, type scale, spacing
    │   └── global.css              # Reset & web font imports
    │
    ├── hooks/
    │   ├── hooks.js                 # useMediaQuery / useReducedMotion
    │   ├── useDocumentTitle.js      # Syncs the browser tab title per page
    │   └── useScrollTimeline.js     # GSAP ScrollTrigger engine for the history page
    │
    ├── components/
    │   ├── PageHeader/              # Shared emblem + title + motto + back-button header
    │   ├── ServiceCard/             # Landing page branch-selection card
    │   ├── ModuleCard/              # Grid topic card (Army Hub, Arms & Services)
    │   ├── TimelineRail/            # Scrollytelling rail (desktop) / top strip (mobile)
    │   └── EraPanel/                # Single historical-era content block
    │
    ├── assets/
    │   ├── emblems/                 # Service & Command emblem PNGs
    │   ├── army/ArmyFrontPage/      # Army Hub module thumbnails
    │   ├── army/ArmsServices/       # Arms & equipment imagery
    │   ├── army/command_structure/  # Structure diagram reference art
    │   ├── army/history/            # Timeline era imagery
    │   └── landing_background/      # Landing page background art
    │
    └── pages/
        ├── Landing/                 # Root landing page ("/")
        ├── ComingSoon/              # Shared placeholder for unbuilt routes
        └── army/
            ├── ArmyHub/             # "/army" — main module dashboard
            ├── ArmyStructure/       # "/army/structure" (+ /details)
            │   └── data/            # commands.js, chainOfCommand.json
            ├── ArmyArms/            # "/army/arms" — category hub
            ├── CombatArms/          # "/army/arms/combat"
            │   └── data/            # infantry.json, mechanisedInfantry.json, armouredCorps.json
            ├── ArmyHistory/         # "/army/history"
            │   └── data/            # history.json (5 eras)
            ├── ArmyChiefs/          # "/army/chiefs" — chiefs and ranks
            │   └── data/            # chiefs.json, ranksData.js
            └── ArmyOperations/      # "/army/conflicts" — military operations
                └── data/            # operations.json
```

---

## 🛠️ Data Sources & Content

Content lives in plain JSON/JS next to the page that renders it, so it's easy to extend without touching component code:

| Data file | Powers |
|---|---|
| `src/pages/army/ArmyStructure/data/commands.js` | The 7 Commands, Army HQ, hierarchy levels, division-type legend |
| `public/data/chainOfCommand.json` | The Chain-of-Command tree on `/army/structure` (fetched at runtime, with the same file bundled as a fallback import) |
| `src/pages/army/CombatArms/data/infantry.json` | Infantry column — role, history, small-arms categories |
| `src/pages/army/CombatArms/data/mechanisedInfantry.json` | Mechanised Infantry column — role, history, vehicle equipment |
| `src/pages/army/CombatArms/data/armouredCorps.json` | Armoured Corps column (marked "Coming Soon" until populated) |
| `src/pages/army/ArmyHistory/data/history.json` | The 5 historical eras (Ancient Warrior Traditions → Modern), each with narrative, tags, sources, and an accent color |
| `src/assets/army/history/` | Era imagery — eagerly glob-imported and matched to `history.json` by filename |
| `DataInText/IndianArmyHistory.txt` | Raw research notes used as source material while writing `history.json` |

To add new content (e.g. a new Combat Arms column or a new historical era), drop a new JSON entry and matching images — no routing or component changes required for most additions.

---

## 🌐 Deployment & SPA Routing (Render)

The app is deployed on **[Render](https://render.com)** as a Static Site: [knowyourarmy.onrender.com](https://knowyourarmy.onrender.com).

Because the app uses client-side routing (`BrowserRouter`), a hard refresh or direct link to a deep route like `/army/history` needs the host to rewrite every request to `/index.html`. This is already handled two ways in the repo:

- **`render.yaml`** — a Render Blueprint with a `/* → /index.html` rewrite rule, used for automated deploys.
- **`public/_redirects`** — the same fallback rule for Netlify-style static hosts.

To configure it manually on Render instead: **Dashboard → your static site → Redirects/Rewrites → Add Rule** with Source `/*`, Destination `/index.html`, Action `Rewrite`.

---

## 🕰️ Development History

A condensed changelog of major refactors, kept for context on *why* things are structured the way they are.

### Round 1 — Reorg into `src/IndianMilitary/IndianArmy` (superseded)
The Army module was originally reorganized from a flat `src/modules/history/` layout into `src/IndianMilitary/IndianArmy/`, and the tricolor `Landing.jsx` (flag drawn in CSS + an SVG Ashoka Chakra, not a photo) was introduced as the new `/` route with `react-router-dom` wired up for the first time. Two stray, unused folders left over from the original zip upload (`IndianMilitary/*` outside `src/`, and a literal folder created by an un-expanded shell brace pattern) were identified and removed since Vite only builds from `src/` and neither was ever imported.

### Round 2 — Current layout: `src/pages/army/*`
The project has since moved on to the `src/pages/<branch>/<Module>/` structure documented in [Project Structure](#-project-structure) above — this is the layout actually shipping today. Along the way, small components with a single caller were folded into their parent (e.g. a standalone `TimelineDot.jsx` became a local component inside `TimelineRail.jsx`), and `useMediaQuery`/`useReducedMotion` were merged into one `hooks.js`. `useScrollTimeline.js` was deliberately kept as its own file — it carries real logic and a comment explaining the CSS-sticky-vs-GSAP-pin design decision, and inlining it would make `ArmyHistory.jsx` harder to scan.

### Notes for the next contributor
- The 3D rippling flag mentioned as a stretch goal hasn't been started — `three`, `@react-three/fiber`, and `@react-three/drei` are installed but currently unused.
- `Navy` and `Air Force` have no source folders yet; when built, mirror the `src/pages/army/` pattern and swap their `App.jsx` routes from `ComingSoon` to the real module.
- Generated build output (`dist/`) is never committed — run `npm run build` for a fresh one.

---

## 🎯 Roadmap

### Goals
- A high-impact, visual, interactive study aid for SSB aspirants.
- Full coverage of all three branches: **Indian Army**, **Indian Navy**, **Indian Air Force**.
- Rich scrollytelling timelines, organizational structures, equipment catalogs, and hero profiles.

### Feature Status

| Module | Route | Status |
|---|---|---|
| Landing Page | `/` | ✅ Done |
| Army Hub | `/army` | ✅ Done |
| Army Command & Structure | `/army/structure`, `/details` | ✅ Done |
| Army Arms & Services Hub | `/army/arms` | ✅ Done |
| Combat Arms (Infantry / Mech Infantry / Armoured) | `/army/arms/combat` | ✅ Done *(Armoured Corps content pending)* |
| Army History Timeline | `/army/history` | 🟡 In review — placeholder images/facts being finalized |
| Combat Support Arms | `/army/arms/combat-support` | 🔴 Planned |
| Services (ASC, AOC, EME, AMC, RVC, AEC, Int Corps, CMP) | `/army/arms/services` | 🔴 Planned |
| Army Regiments | `/army/regiments` | 🔴 Planned |
| Conflicts & Wars (1947-48, 1962, 1965, 1971, Kargil) | `/army/conflicts` | 🔴 Planned |
| Heroes & Gallantry (21 PVC recipients, MVC) | `/army/heroes` | 🔴 Planned |
| Chiefs of Army Staff | `/army/chiefs` | 🔴 Planned |
| HADR & Humanitarian Ops | `/army/humanitarian` | 🔴 Planned |
| Indian Navy branch | `/navy` | 🔴 Planned |
| Indian Air Force branch | `/airforce` | 🔴 Planned |
| 3D Tricolor Landing Hero (`three.js`) | `/` | 🔴 Backlog |
| SSB Prep Quiz & Flashcards | `/quiz` | 🔴 Backlog |
| Progressive Web App (offline study mode) | — | 🔴 Backlog |
| Global search across regiments/battles/ranks/commands | — | 🔴 Backlog |

### Up Next
- [ ] Replace placeholder narrative/images in `history.json` with fact-checked content and high-res photos.
- [ ] Populate `armouredCorps.json` so the third Combat Arms column matches Infantry/Mechanised Infantry.
- [ ] Build **Combat Support Arms** and **Services** pages under `/army/arms/`.
- [ ] Start the **Regiments**, **Conflicts & Wars**, and **Heroes** modules.
- [ ] Stand up the **Indian Navy** and **Indian Air Force** modules following the Army's `src/pages/<branch>/` pattern.

---

## 📄 License

This project is created for educational and study preparation purposes. All military emblems, insignia, and historical references belong to their respective copyright holders and the Ministry of Defence, Government of India.
