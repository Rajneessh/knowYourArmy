# Know Your Army — Project Roadmap & Task Tracker

Welcome to the development roadmap for **Know Your Army**. This document tracks completed milestones, current work in progress, and planned features for SSB (Services Selection Board) aspirants.

Related Documentation:
- [README.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/README.md) — Main Project Guide & Setup
- [INSTRUCTIONS.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/INSTRUCTIONS.md) — Architecture & Refactoring History
- [Roadmap.md](file:///d:/Classwork/Projects/RandomTools/KnowYourArmy/Roadmap.md) — Feature Roadmap & Development Plan

---

## 🎯 Project Goals

- Provide a high-impact, visual, and interactive study aid for SSB aspirants.
- Cover all three branches of the Indian Armed Forces: **Indian Army**, **Indian Navy**, and **Indian Air Force**.
- Deliver rich scrollytelling timelines, organizational structures, equipment catalogs, and hero profiles.

---

## 🚦 Feature Status Overview

| Module / Feature | Status | Target Route | Description |
|---|---|---|---|
| **Landing Page** | ✅ Completed | `/` | Tricolor landing page with service selection |
| **Army Hub** | ✅ Completed | `/army` | Main hub dashboard for Indian Army topics |
| **Army Command & Structure** | ✅ Completed | `/army/structure`, `/army/structure/details` | Command headquarters & chain of command |
| **Army History Timeline** | 🟡 In Review | `/army/history` | GSAP ScrollTrigger timeline across 5 eras |
| **Army Arms & Services** | 🔴 Planned | `/army/arms` | Combat Arms, Combat Support, and Services |
| **Army Regiments** | 🔴 Planned | `/army/regiments` | Infantry, Armoured, and Artillery regimental histories |
| **Army Conflicts & Wars** | 🔴 Planned | `/army/conflicts` | 1947-48, 1962, 1965, 1971, Kargil 1999 |
| **Army Heroes & Gallantry** | 🔴 Planned | `/army/heroes` | Param Vir Chakra & Maha Vir Chakra awardees |
| **Chiefs of Army Staff (COAS)** | 🔴 Planned | `/army/chiefs` | Chronological list of Army Chiefs & achievements |
| **HADR & Humanitarian** | 🔴 Planned | `/army/humanitarian` | Operation Meghdoot, Relief ops, UN Peacekeeping |
| **Indian Navy Branch** | 🔴 Planned | `/navy` | Naval Commands, Fleet, Aircraft Carriers & Submarines |
| **Indian Air Force Branch** | 🔴 Planned | `/airforce` | Air Commands, Fighter Squadrons & Air Defense |
| **3D Tricolor Landing Hero** | 🔴 Backlog | `/` | 3D rippling flag with `@react-three/fiber` |
| **SSB Prep Quiz & Flashcards** | 🔴 Backlog | `/quiz` | Interactive test mode for SSB General Awareness |

---

## 📋 Actionable Todo List

### Phase 1: Core Foundation & Landing Page
- [x] Create Vite + React project structure with global CSS variable design tokens.
- [x] Implement tricolor responsive landing page (`Landing.jsx`).
- [x] Set up React Router navigation for `/`, `/army`, `/navy`, `/airforce`.
- [x] Create reusable `ComingSoon` stub page for unbuilt sections.

### Phase 2: Indian Army Modules
- [x] Build **Army Hub** (`/army`) with responsive module grid cards.
- [x] Build **Army Structure** (`/army/structure`) displaying the 7 Commands (Northern, Western, Eastern, Southern, Central, SW, ARTRAC).
- [x] Build **Chain of Command Details** (`/army/structure/details`) for rank hierarchy from Field Marshal/General down to Sepoy.
- [x] Implement GSAP ScrollTrigger timeline engine for **Army History** (`/army/history`).
- [ ] **Data & Media Enrichment**:
  - [ ] Replace `PLACEHOLDER` flags in `src/pages/army/ArmyHistory/data/history.json` with fact-checked historical summaries.
  - [ ] Add high-resolution historical images under `public/assets/army/history/` and link them in `history.json`.
- [ ] **Army Arms & Services Module (`/army/arms`)**:
  - [ ] Fighting Arms (Infantry, Armoured Corps, Mechanised Infantry).
  - [ ] Supporting Arms (Artillery, Engineers, Signals, Army Air Defence, Army Aviation).
  - [ ] Services (ASC, AOC, EME, AMC, RVC, AEC, Intelligence Corps, CMP).
- [ ] **Army Regiments Module (`/army/regiments`)**:
  - [ ] Regimental crests, mottoes, battle honours, and war cries.
- [ ] **Conflicts & Battles Module (`/army/conflicts`)**:
  - [ ] Key battle maps, strategic significance, and operational outcomes.
- [ ] **Heroes & PVC Profiles (`/army/heroes`)**:
  - [ ] Detailed biographies of all 21 Param Vir Chakra recipients (Major Somnath Sharma, Captain Vikram Batra, Subedar Major Yogendra Singh Yadav, etc.).

### Phase 3: Indian Navy Modules (`/navy`)
- [ ] **Navy Hub**: Command structure (Western, Eastern, Southern, FAR).
- [ ] **Fleet & Assets**: Aircraft Carriers (INS Vikrant, INS Vikramaditya), Destroyers, Frigates, Submarines (Kalvari & Arihant classes).
- [ ] **Naval Operations**: Operation Trident (1971), Operation Python, Anti-Piracy, Disaster Relief.

### Phase 4: Indian Air Force Modules (`/airforce`)
- [ ] **Air Force Hub**: Operational & Functional Commands (Western, Eastern, Central, South Western, Southern, Training, Maintenance).
- [ ] **Air Fleet**: Sukhoi Su-30MKI, Rafale, Tejas, Mirage 2000, MiG-29, C-17 Globemaster, Apache & Prachand attack helicopters.
- [ ] **IAF History & Achievements**: 1965 & 1971 air wars, Operation Meghdoot, Tangail Airdrop.

### Phase 5: SSB Interactive Tools & Visual Enhancements
- [ ] **Interactive SSB Quiz Engine**: Multiple-choice questions on service origins, ranks, mottoes, commands, and equipment.
- [ ] **3D Tricolor Hero Banner**: Implement realistic cloth simulation using Three.js & `@react-three/fiber`.
- [ ] **Global Search**: Search bar to query regiments, battles, ranks, or commands instantly.
- [ ] **Progressive Web App (PWA)**: Offline caching so SSB candidates can study without internet access.

---

## 📌 Document Revision History

- **v1.0 (Current)**: Expanded roadmap covering all tri-service modules, SSB study utilities, and data enrichment milestones.
