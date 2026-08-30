import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import operationsData from './data/operations.json';
import armyEmblem from '../../../assets/emblems/army.png';
import styles from './ArmyOperations.module.css';

// Eagerly import every image in the ArmyOperations asset folder
const opImages = import.meta.glob(
  '../../../assets/army/ArmyOperations/*',
  { eager: true, query: '?url', import: 'default' }
);

/**
 * Resolve a filename (e.g. "OpPolo.webp") to its bundled URL.
 * Falls back to null if not found.
 */
function resolveImage(filename) {
  if (!filename) return null;
  const key = Object.keys(opImages).find((k) => k.endsWith(`/${filename}`));
  return key ? opImages[key] : null;
}

function PhotoPlaceholder() {
  return (
    <div className={styles.photoPlaceholder} aria-hidden="true">
      <svg className={styles.photoSvg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="rgba(0,0,0,0.15)" />
        <path d="M15 80 L35 50 L55 75 L75 45 L90 80 Z" fill="rgba(164,170,136,0.25)" stroke="rgba(164,170,136,0.4)" strokeWidth="1.5" />
        <circle cx="35" cy="30" r="8" fill="rgba(164,170,136,0.25)" stroke="rgba(164,170,136,0.4)" strokeWidth="1.5" />
      </svg>
      <span className={styles.photoLabel}>Archive Photo</span>
    </div>
  );
}

export function ArmyOperations() {
  useDocumentTitle('Operations & Campaigns — Indian Army');
  const navigate = useNavigate();

  // Create Refs for each section
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>

        {/* ── Page Header (Inherited from ArmyHub) ── */}
        <header className={styles.pageHeader}>
          <button
            onClick={() => navigate('/')}
            className={styles.emblemBtn}
            aria-label="Go to Home"
            type="button"
          >
            <img src={armyEmblem} alt="Indian Army emblem" className={styles.emblem} />
          </button>
          <h1 className={styles.pageTitle}>Indian Army</h1>
          <p className={styles.pageMotto}>सेवा परमो धर्मः — Service Before Self</p>

          <div className={styles.divider} role="separator" aria-hidden="true" />

          {/* Nav & Back Button Row */}
          <div className={styles.navRow}>
            <button
              onClick={() => navigate('/army')}
              className={styles.navBtn}
              type="button"
            >
              ← Back to Army Hub
            </button>
            
            {operationsData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`${styles.navBtn} ${styles.navBtnAccent}`}
                type="button"
              >
                {section.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── Operations Sections ── */}
        <div className={styles.contentWrap}>
          {operationsData.sections.map((section) => (
            <section
              key={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className={styles.section}
              aria-label={section.label}
            >
              <div className={styles.sectionSeparator} aria-hidden="true">
                <span className={styles.separatorLine} />
                <span className={styles.separatorBadge} style={{ borderColor: section.accentColor, color: section.accentColor }}>
                  {section.label.toUpperCase()}
                </span>
                <span className={styles.separatorLine} />
              </div>
              
              <p className={styles.sectionDescription}>{section.description}</p>

              <div className={styles.cardsStack}>
                {section.operations.map((op) => {
                  const imgUrl = resolveImage(op.image);
                  return (
                    <article key={op.id} className={styles.opCard}>
                      {/* Left side: Photo or placeholder */}
                      <div className={styles.photoContainer}>
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={op.name}
                            className={styles.opPhoto}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <PhotoPlaceholder />
                        )}
                      </div>

                      {/* Right side: Detailed operational data */}
                      <div className={styles.opDetails}>
                        <div className={styles.opHeaderRow}>
                          <h3 className={styles.opName}>{op.name}</h3>
                          <span className={styles.typeBadge} style={{ backgroundColor: section.accentColor }}>
                            {op.type}
                          </span>
                        </div>

                        <div className={styles.metaGrid}>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Date:</span>
                            <span className={styles.metaVal}>
                              {op.date.start} {op.date.end ? `— ${op.date.end}` : ''}
                            </span>
                          </div>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Location:</span>
                            <span className={styles.metaVal}>{op.location}</span>
                          </div>
                          {op.opponents && op.opponents.length > 0 && (
                            <div className={styles.metaItem}>
                              <span className={styles.metaLabel}>Opponents:</span>
                              <span className={styles.metaVal}>{op.opponents.join(', ')}</span>
                            </div>
                          )}
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Objective:</span>
                            <span className={styles.metaVal}>{op.objective}</span>
                          </div>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Result:</span>
                            <span className={styles.metaVal} style={{ color: 'var(--paper)' }}>{op.result}</span>
                          </div>
                        </div>

                        <div className={styles.detailsDivider} />

                        <div className={styles.opNarrative}>
                          <p className={styles.descriptionText}>
                            <strong>Overview:</strong> {op.description}
                          </p>
                          <p className={styles.significanceText}>
                            <strong>Strategic Significance:</strong> {op.significance}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
