import { useRef } from 'react';
import { TimelineRail } from '../../../components/TimelineRail/TimelineRail';
import { EraPanel } from '../../../components/EraPanel/EraPanel';
import { useScrollTimeline } from '../../../hooks/useScrollTimeline';
import { useMediaQuery, useReducedMotion } from '../../../hooks/hooks';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import historyData from './data/history.json';
import styles from './ArmyHistory.module.css';

// Eagerly import every image in src/assets/army/history/ at build time.
// Vite resolves each to a fingerprinted URL; we key the map by filename
// so JSON media src paths like "/assets/army/history/foo.jpg" resolve correctly.
const historyImageModules = import.meta.glob(
  '../../../assets/army/history/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);
const historyImageMap = Object.fromEntries(
  Object.entries(historyImageModules).map(([path, mod]) => [
    path.split('/').pop(), // e.g. "1776-1895-01.jpg"
    mod.default,
  ])
);

/** Injects a `resolvedSrc` field on each media item using the image map. */
function resolveEraMedia(eras) {
  return eras.map((era) => ({
    ...era,
    media: era.media?.map((item) => ({
      ...item,
      resolvedSrc: historyImageMap[item.src.split('/').pop()] ?? null,
    })),
  }));
}

export function ArmyHistory() {
  useDocumentTitle('Indian Army — History');

  const eras = resolveEraMedia(
    [...historyData.eras].sort((a, b) => a.order - b.order)
  );

  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const isMobile = useMediaQuery('(max-width: 900px)');
  const reducedMotion = useReducedMotion();

  const { activeIndex, setActiveIndex } = useScrollTimeline({
    containerRef,
    panelRef,
    sectionRefs,
    reducedMotion,
  });

  const registerSection = (el, index) => {
    if (el) sectionRefs.current[index] = el;
  };

  const scrollToEra = (index) => {
    setActiveIndex(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: isMobile ? 'start' : 'center',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.module} texture-topo`}
    >
      <TimelineRail
        eras={eras}
        activeIndex={activeIndex}
        onSelect={scrollToEra}
        orientation={isMobile ? 'horizontal' : 'vertical'}
        branchLabel="Indian Army"
        accentColor="#4C5D34"
      />

      <div ref={panelRef} className={`${styles.panel} texture-grain`}>
        {eras.map((era, index) => (
          <EraPanel key={era.id} era={era} ref={(el) => registerSection(el, index)} />
        ))}
      </div>
    </div>
  );
}
