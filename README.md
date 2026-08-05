# Know Your Army 🇮🇳

An interactive, visual knowledge hub and study portal for **Services Selection Board (SSB)** aspirants, defense enthusiasts, and citizens to learn about the **Indian Armed Forces**.

The portal features an Indian-tricolor landing page, organizational command structure visualizers, scrollytelling historical timelines, and dedicated hubs for the **Indian Army**, **Indian Navy**, and **Indian Air Force**.

---

## 📚 Project Documentation & Quick Links

All project documentation files are linked below:

- 📖 **[README.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/README.md)** — Main project overview, setup guide, architecture, and deployment instructions.
- 🗺️ **[Roadmap.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/Roadmap.md)** — Comprehensive project roadmap, feature status, and actionable todo list.
- 🛠️ **[INSTRUCTIONS.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/INSTRUCTIONS.md)** — Refactoring history, design decisions, and architectural changelog.

---

## ✨ Features & Capabilities

- 🎨 **Tricolor Interactive Landing Page (`/`)**: High-contrast, responsive Saffron-White-Green interface with smooth animations and branch selection pills.
- 🎖️ **Indian Army Branch Hub (`/army`)**: Central dashboard routing aspirants into specialized military topics.
- 🏢 **Command & Organizational Structure (`/army/structure`)**: Interactive breakdown of all 7 Commands of the Indian Army (Northern, Western, Eastern, Southern, Central, South Western, and ARTRAC), including HQ locations and operational responsibilities.
- ⚔️ **Chain of Command & Rank Hierarchy (`/army/structure/details`)**: Detailed officer and soldier rank structure, insignia descriptions, and hierarchy from Sepoy to Field Marshal.
- 📜 **Scrollytelling History Timeline (`/army/history`)**: GSAP ScrollTrigger-powered interactive timeline tracking the evolution of the Indian Army across 5 key historical eras.
- ⚡ **Performance & Code Splitting**: Built with React 19 and Vite 8 utilizing `React.lazy` and `Suspense` chunking for sub-second page loads.
- 📱 **Fully Responsive & Accessible**: Custom fluid typography design system with mobile top-strip timeline fallback and reduced-motion support.

---

## 🚀 Quick Start & Development

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Local Setup

1. **Clone the repository & install dependencies**:
   ```bash
   git clone https://github.com/Rajneessh/knowYourArmy.git
   cd KnowYourArmy
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to the local URL printed in your terminal (typically `http://localhost:5173`).

### Build & Scripts

| Script | Command | Purpose |
|---|---|---|
| **Dev Server** | `npm run dev` | Launches Vite development server with HMR |
| **Production Build** | `npm run build` | Compiles optimized production bundle into `dist/` |
| **Preview Build** | `npm run preview` | Serves the `dist/` folder locally for testing |
| **Linter** | `npm run lint` | Runs Oxlint for ultra-fast static analysis |

---

## 📁 Project Architecture & Directory Structure

```
KnowYourArmy/
├── README.md                      # Main project guide & setup (This file)
├── Roadmap.md                     # Development roadmap & feature tracking
├── INSTRUCTIONS.md                # Architecture & refactoring log
├── package.json                   # Project metadata & dependencies
├── vite.config.js                 # Vite configuration
├── render.yaml                    # Render static site blueprint configuration
├── index.html                     # Main HTML entry point
│
├── public/
│   ├── _redirects                 # Static host rewrite rule (Netlify / SPA support)
│   ├── favicon.svg                # Ashoka Chakra favicon
│   └── data/
│       └── chainOfCommand.json    # Rank hierarchy JSON data
│
└── src/
    ├── main.jsx                   # React application entry point (BrowserRouter)
    ├── App.jsx                    # Lazy-loaded route definitions
    │
    ├── styles/
    │   ├── variables.css          # CSS design tokens (colors, typography, spacing)
    │   └── global.css             # Global CSS reset & web font imports
    │
    ├── hooks/
    │   ├── hooks.js               # useMediaQuery & useReducedMotion hooks
    │   ├── useDocumentTitle.js    # Dynamic browser tab title updater
    │   └── useScrollTimeline.js   # GSAP ScrollTrigger timeline animation engine
    │
    ├── components/
    │   ├── PageHeader/            # Reusable header banner component
    │   ├── ServiceCard/           # Branch selection card for landing page
    │   ├── ModuleCard/            # Grid topic card for branch hubs
    │   ├── TimelineRail/          # Scrollytelling left rail (desktop) / top strip (mobile)
    │   └── EraPanel/              # Historical era content block
    │
    └── pages/
        ├── Landing/               # Root landing page (/)
        ├── ComingSoon/            # Fallback stub component for unbuilt sections
        └── army/
            ├── ArmyHub/           # Indian Army module hub (/army)
            ├── ArmyHistory/       # Army history timeline page (/army/history)
            └── ArmyStructure/     # Army Command & Chain of Command pages (/army/structure)
```

---

## 🌐 Deployment & SPA Routing (Render Setup)

This application is deployed on **Render** as a Static Site: [knowyourarmy.onrender.com](https://knowyourarmy.onrender.com).

### Fix for Page Refresh ("Not Found" 404 Error)

Because this app uses client-side routing (`BrowserRouter`), refreshing or navigating directly to a deep URL like `/army` requires the web server to rewrite all requests to `/index.html`.

If hosting on **Render**:
1. Open your **Render Dashboard** → Select your static site (`knowyourarmy`).
2. Go to **Redirects / Rewrites** in the sidebar.
3. Add a new Rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
4. Save Changes.

Alternatively, `render.yaml` is provided in the repository root for automated deployment via Render Blueprints.

---

## 🛠️ Data Sources & Content Contributions

- **Command Data**: `src/pages/army/ArmyStructure/data/commands.js`
- **Chain of Command Data**: `public/data/chainOfCommand.json`
- **History Data**: `src/pages/army/ArmyHistory/data/history.json`
- **Historical Images**: Images can be placed under `public/assets/army/history/` and linked via `history.json`.

---

## 📄 License

This project is created for educational and study preparation purposes. All military emblems, insignia, and history references belong to their respective copyright holders and the Ministry of Defence, Government of India.
