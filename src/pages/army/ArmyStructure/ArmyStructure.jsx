import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { COMMANDS, HIERARCHY_LEVELS, ARMY_HQ } from './data/commands';
import armyEmblem from '../../../assets/emblems/army.png';
import styles from './ArmyStructure.module.css';

/* ---- Sub-components ---- */

/** Hexagonal shield badge for each command */
function CommandShield({ command, index }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClick = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.classList.add('animate__animated', 'animate__pulse');
    }
    // Scroll to details section on same page (no nav — just for reference)
    document.getElementById('structure-details')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <button
      ref={ref}
      className={styles.commandShield}
      style={{ '--cmd-color': command.accentColor, '--cmd-shield': command.shieldColor }}
      onClick={handleClick}
      aria-label={`${command.name} — ${command.location}`}
    >
      <div className={styles.shieldHex}>
        <div className={styles.shieldInner}>
          <span className={styles.shieldStars}>
            {'★'.repeat(command.stars)}
          </span>
          <span className={styles.shieldAbbr}>{command.abbreviation}</span>
        </div>
      </div>
      <div className={styles.commandLabel}>
        <span className={styles.commandName}>{command.name}</span>
        <span className={styles.commandLoc}>{command.location}</span>
      </div>
    </button>
  );
}

/** One row of generic unit boxes at a hierarchy level */
function HierarchyRow({ level }) {
  const count = level.showCount ?? 1;
  return (
    <div className={styles.hierarchyRow} data-level={level.id}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${styles.hierUnit} ${styles[`hierUnit_${level.id}`]}`}>
          <span className={styles.hierUnitLabel}>{level.unitLabel}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- Main page ---- */

export function ArmyStructure() {
  useDocumentTitle('Indian Army — Command Structure');
  const navigate = useNavigate();

  const goToDetails = useCallback(() => {
    navigate('/army/structure/details');
  }, [navigate]);

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>

        {/* ── Page header ── */}
        <header className={`${styles.pageHeader} animate__animated animate__fadeInDown`}>
          <img src={armyEmblem} alt="Indian Army emblem" className={styles.headerEmblem} />
          <div className={styles.headerText}>
            <p className={styles.headerEyebrow}>Indian Army</p>
            <h1 className={styles.headerTitle}>Command Structure</h1>
            <p className={styles.headerMotto}>सेवा परमो धर्मः — Service Before Self</p>
          </div>
        </header>

        <div className={styles.divider} />

        {/* ── 7 Commands row ── */}
        <section className={styles.commandsSection}>
          <div className={`${styles.sectionBanner} animate__animated animate__fadeIn`}
               style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <span className={styles.bannerNumber}>7</span>
            <span className={styles.bannerText}>COMMANDS — THE INDIAN ARMY</span>
          </div>

          <div className={styles.commandsGrid}>
            {COMMANDS.map((cmd, i) => (
              <div
                key={cmd.id}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: 'both' }}
              >
                <CommandShield command={cmd} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Chain of command flow ── */}
        <section id="structure-details" className={styles.chainSection}>
          <h2 className={styles.chainTitle}>Chain of Command</h2>
          <p className={styles.chainSubtitle}>
            Every unit in the Indian Army belongs to a precise echelon — from Army HQ down to the individual Company.
          </p>

          <div className={styles.chainFlow}>
            {HIERARCHY_LEVELS.map((level, i) => (
              <div key={level.id} className={styles.chainItem}
                   style={{ animationDelay: `${600 + i * 100}ms` }}>

                {/* Connector arrow from previous level */}
                {i > 0 && (
                  <div className={styles.chainConnector}>
                    <div className={styles.connectorLine} />
                    <div className={styles.connectorLabel}>
                      {level.count} {level.unitLabel}{parseInt(level.count) !== 1 ? 's' : ''} per {HIERARCHY_LEVELS[i - 1].unitLabel}
                    </div>
                    <div className={styles.connectorArrow}>▼</div>
                  </div>
                )}

                {/* Level card */}
                <div
                  className={`${styles.chainCard} ${styles[`chain_${level.id}`]}`}
                  style={{ '--chain-depth': i }}
                >
                  <div className={styles.chainCardLeft}>
                    <span className={styles.chainCardUnit}>{level.label}</span>
                    <span className={styles.chainCardRank}>{level.commanderRank}</span>
                  </div>
                  <div className={styles.chainCardRight}>
                    <span className={styles.chainCardDesc}>{level.description}</span>
                  </div>
                  {/* Generic unit boxes on the right (like Image 1) */}
                  {level.showCount && (
                    <div className={styles.chainMiniRow}>
                      {Array.from({ length: level.showCount }).map((_, j) => (
                        <div key={j} className={styles.chainMiniUnit} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className={`${styles.ctaWrap} animate__animated animate__fadeIn`}
             style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
          <p className={styles.ctaLabel}>Explore the full Order of Battle with every Corps and Division</p>
          <button
            id="view-order-of-battle"
            className={styles.ctaButton}
            onClick={goToDetails}
          >
            View Full Order of Battle
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}
