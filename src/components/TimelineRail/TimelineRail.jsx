import { useEffect, useRef } from 'react';
import styles from './TimelineRail.module.css';

/**
 * TimelineDot — a single navigable point on the rail.
 * Kept private to this file; only ever rendered by TimelineRail.
 */
function TimelineDot({ era, isActive, onSelect, index }) {
  return (
    <button
      type="button"
      className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
      onClick={() => onSelect(index)}
      aria-current={isActive ? 'true' : undefined}
      aria-label={`Jump to ${era.label} — ${era.dateRange.display}`}
    >
      <span className={styles.dotMarker}>
        <span className={styles.dotRing} aria-hidden="true" />
        <span className={styles.dotCore} aria-hidden="true" />
      </span>
      <span className={styles.dotLabel}>
        <span className={styles.dotEra}>{era.label}</span>
        <span className={styles.dotDate}>{era.dateRange.display}</span>
      </span>
    </button>
  );
}

/**
 * TimelineRail — the navigational sidebar / top-bar for any history module.
 *
 * Props:
 *   eras        {array}              Sorted era objects from JSON
 *   activeIndex {number}             Which era is currently in view
 *   onSelect    {function}           Called with the clicked era's index
 *   orientation {'vertical'|'horizontal'}  Desktop = vertical, mobile = horizontal
 *   branchLabel {string}             Label shown in the rail header, e.g. "Indian Army"
 *   accentColor {string}             CSS color for the active dot (hex / rgba / CSS var)
 */
export function TimelineRail({ eras, activeIndex, onSelect, orientation, branchLabel, accentColor }) {
  const railRef = useRef(null);

  // On mobile, keep the active dot scrolled into view within the horizontal strip.
  useEffect(() => {
    if (orientation !== 'horizontal' || !railRef.current) return;
    const activeEl = railRef.current.querySelector(`[aria-current="true"]`);
    activeEl?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [activeIndex, orientation]);

  return (
    <nav
      className={`${styles.rail} ${orientation === 'horizontal' ? styles.railHorizontal : styles.railVertical}`}
      aria-label={`${branchLabel ?? 'History'} timeline`}
      style={accentColor ? { '--rail-accent': accentColor } : undefined}
    >
      <div className={styles.railHeader}>
        <span className={styles.railEyebrow}>History</span>
        <span className={styles.railHeadline}>{branchLabel ?? 'History'}</span>
      </div>

      <div className={styles.railTrack} ref={railRef}>
        <svg
          className={styles.railLine}
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox={orientation === 'horizontal' ? '0 0 1000 24' : '0 0 24 1000'}
        >
          <path
            d={
              orientation === 'horizontal'
                ? 'M0,12 C120,11 160,13 280,12 C400,11 440,13 560,12 C680,11 720,13 840,12 C920,11 960,13 1000,12'
                : 'M12,0 C11,120 13,160 12,280 C11,400 13,440 12,560 C11,680 13,720 12,840 C11,920 13,960 12,1000'
            }
            className={styles.railLinePath}
          />
        </svg>

        <ol className={styles.dotList}>
          {eras.map((era, index) => (
            <li key={era.id}>
              <TimelineDot
                era={era}
                index={index}
                isActive={index === activeIndex}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
