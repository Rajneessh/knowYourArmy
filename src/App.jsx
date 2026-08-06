import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

/**
 * Route-level code splitting via React.lazy.
 *
 * Each branch is its own async chunk — users loading /army/history
 * don't download the Navy or Air Force bundles.
 */

// ---- Landing ----
const Landing = lazy(() =>
  import('./pages/Landing/Landing').then((m) => ({ default: m.Landing }))
);

// ---- Indian Army ----
const ArmyHub = lazy(() =>
  import('./pages/army/ArmyHub/ArmyHub').then((m) => ({ default: m.ArmyHub }))
);
const ArmyHistory = lazy(() =>
  import('./pages/army/ArmyHistory/ArmyHistory').then((m) => ({ default: m.ArmyHistory }))
);
const ArmyOperations = lazy(() =>
  import('./pages/army/ArmyOperations/ArmyOperations').then((m) => ({ default: m.ArmyOperations }))
);

// ---- Army: Structure module ----
const ArmyStructure = lazy(() =>
  import('./pages/army/ArmyStructure/ArmyStructure').then((m) => ({ default: m.ArmyStructure }))
);
const ArmyStructureDetails = lazy(() =>
  import('./pages/army/ArmyStructure/ArmyStructureDetails').then((m) => ({ default: m.ArmyStructureDetails }))
);

// ---- Army: Arms & Services module ----
const ArmyArms = lazy(() =>
  import('./pages/army/ArmyArms/ArmyArms').then((m) => ({ default: m.ArmyArms }))
);

// ---- Army: Combat Arms ----
const CombatArms = lazy(() =>
  import('./pages/army/CombatArms/CombatArms').then((m) => ({ default: m.CombatArms }))
);

// ---- Army: Chiefs of Army Staff ----
const ArmyChiefs = lazy(() =>
  import('./pages/army/ArmyChiefs/ArmyChiefs').then((m) => ({ default: m.ArmyChiefs }))
);

// ---- Other branches (stubs) ----
const ComingSoon = lazy(() =>
  import('./pages/ComingSoon/ComingSoon').then((m) => ({ default: m.ComingSoon }))
);

/** Minimal full-page fallback while a lazy chunk loads. */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--sage)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--step--1)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ---- Top-level branch selection ---- */}
        <Route path="/" element={<Landing />} />

        {/* ---- Indian Army hub ---- */}
        <Route path="/army" element={<ArmyHub />} />

        {/* ---- Army sub-modules ---- */}
        <Route path="/army/history"            element={<ComingSoon service="History Timeline" backTo="/army" />} />{/* ArmyHistory temporarily hidden — swap back to <ArmyHistory /> when ready */}
        <Route path="/army/structure"         element={<ArmyStructure />} />
        <Route path="/army/structure/details"  element={<ArmyStructureDetails />} />
        
        {/* ---- Arms & Services sub-routes ---- */}
        <Route path="/army/arms"               element={<ArmyArms />} />
        <Route path="/army/arms/combat"        element={<CombatArms />} />
        <Route path="/army/arms/combat-support" element={<ComingSoon service="Combat Support Arms"       backTo="/army/arms" />} />
        <Route path="/army/arms/services"       element={<ComingSoon service="Services"                  backTo="/army/arms" />} />

        <Route path="/army/regiments"          element={<ComingSoon service="Regiments"                 backTo="/army" />} />
        <Route path="/army/conflicts"          element={<ArmyOperations />} />
        <Route path="/army/heroes"             element={<ComingSoon service="Heroes"                    backTo="/army" />} />
        <Route path="/army/chiefs"             element={<ArmyChiefs />} />
        <Route path="/army/humanitarian"       element={<ComingSoon service="Humanitarian Efforts"      backTo="/army" />} />

        {/* ---- Other branches ---- */}
        <Route path="/navy"                    element={<ComingSoon service="Indian Navy"      backTo="/" />} />
        <Route path="/airforce"                element={<ComingSoon service="Indian Air Force" backTo="/" />} />
      </Routes>
    </Suspense>
  );
}
