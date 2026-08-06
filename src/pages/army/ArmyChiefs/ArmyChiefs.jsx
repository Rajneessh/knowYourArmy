import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import chiefsData from './data/chiefs.json';
import { RANK_STRUCTURE } from './data/ranksData';
import armyEmblem from '../../../assets/emblems/army.png';
import styles from './ArmyChiefs.module.css';


/* ── Portrait Placeholder ── */
function PortraitPlaceholder({ rank }) {
  const isFieldMarshal = rank?.toLowerCase().includes('field marshal');
  return (
    <div className={styles.portraitPlaceholder}>
      <svg className={styles.portraitSvg} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="28" r="18" stroke="rgba(164,170,136,0.4)" strokeWidth="1.5" fill="rgba(0,0,0,0.2)" />
        <path d="M8 72 Q8 52 40 52 Q72 52 72 72" stroke="rgba(164,170,136,0.4)" strokeWidth="1.5" fill="rgba(0,0,0,0.2)" />
        {isFieldMarshal && (
          <text x="40" y="80" textAnchor="middle" fill="#E0B84A" fontSize="8" fontFamily="monospace">FM</text>
        )}
      </svg>
      <span className={styles.portraitLabel}>Portrait</span>
    </div>
  );
}

export function ArmyChiefs() {
  useDocumentTitle('Chiefs of Army Staff & Ranks — Indian Army');
  const navigate = useNavigate();

  const generalsRef = useRef(null);
  const ranksRef = useRef(null);

  const scrollToGenerals = () => generalsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToRanks = () => ranksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>

        {/* ── Page Header ── */}
        <header className={styles.pageHeader}>
          <button
            onClick={() => navigate('/')}
            className={styles.emblemBtn}
            aria-label="Go to Home"
            type="button"
          >
            <img src={armyEmblem} alt="Indian Army emblem" className={styles.emblem} />
          </button>
          <p className={styles.eyebrow}>Leadership &amp; Hierarchy</p>
          <h1 className={styles.pageTitle}>Chiefs of the Army Staff</h1>
          <p className={styles.pageMotto}>Commanders &amp; Ranks of the Indian Army</p>

          <div className={styles.divider} role="separator" aria-hidden="true" />

          {/* Nav button row */}
          <div className={styles.navRow}>
            <button
              onClick={() => navigate('/army')}
              className={styles.navBtn}
              type="button"
            >
              ← Back to Army Hub
            </button>
            <button
              onClick={scrollToGenerals}
              className={`${styles.navBtn} ${styles.navBtnAccent}`}
              type="button"
            >
              Generals Gallery
            </button>
            <button
              onClick={scrollToRanks}
              className={`${styles.navBtn} ${styles.navBtnAccent}`}
              type="button"
            >
              Rank Structure
            </button>
          </div>
        </header>

        {/* ── SECTION 1: SUPREME COMMANDER ── */}
        <section className={styles.supremeSection} aria-label="Supreme Commander">
          <div className={styles.supremeCard}>
            <div className={styles.supremeBadge}>
              {/* Indian tricolor bar as placeholder instead of emoji */}
              <div className={styles.tricolorBar}>
                <span className={styles.tricolorSaffron} />
                <span className={styles.tricolorWhite}>
                  <span className={styles.chakra}>⊕</span>
                </span>
                <span className={styles.tricolorGreen} />
              </div>
              <span className={styles.supremeStars}>★★★★★</span>
            </div>
            <div className={styles.supremeInfo}>
              <h2 className={styles.supremeTitle}>{chiefsData.supremeCommander.role}</h2>
              <span className={styles.supremeTag}>{chiefsData.supremeCommander.title}</span>
              <p className={styles.supremeNote}>
                Under{' '}
                <strong className={styles.articleHighlight}>Article 53(2)</strong>
                {' '}of the Constitution of India, the Supreme Command of the Defence Forces of the
                Union is vested in the President of India.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: GENERALS GALLERY ── */}
        <section ref={generalsRef} className={styles.chiefsSection} aria-label="Generals Gallery" id="generals">
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Generals &amp; Chiefs of Army Staff</h2>
          </div>

          <div className={styles.chiefsGrid}>
            {chiefsData.chiefs.map((chief) => {
              const isFieldMarshal = chief.rank.toLowerCase().includes('field marshal');
              return (
                <article
                  key={chief.no}
                  className={`${styles.chiefCard} ${isFieldMarshal ? styles.fieldMarshalCard : ''}`}
                >
                  {/* Portrait */}
                  <div className={styles.portraitWrap}>
                    {chief.portrait ? (
                      <img src={chief.portrait} alt={chief.name} className={styles.portraitImg} />
                    ) : (
                      <PortraitPlaceholder rank={chief.rank} />
                    )}
                    {/* Number overlay */}
                    <span className={styles.chiefNoOverlay}>#{chief.no}</span>
                    {isFieldMarshal && (
                      <span className={styles.fmBadge}>FM</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.chiefMeta}>
                    <h3 className={styles.chiefName}>{chief.name}</h3>
                    <p className={styles.chiefUnit}>{chief.unitOfCommission}</p>
                    <p className={styles.chiefTenure}>{chief.tookOffice} — {chief.leftOffice}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Mid-page section separator (matches /army/structure style) ── */}
        <div className={styles.sectionSeparator} aria-hidden="true">
          <span className={styles.separatorLine} />
          <span className={styles.separatorBadge}>RANK STRUCTURE</span>
          <span className={styles.separatorLine} />
        </div>

        <section ref={ranksRef} className={styles.ranksSection} aria-label="Rank Hierarchy" id="ranks">
          {/* 3-panel rank cards */}
          <div className={styles.rankPanels}>

            {/* Panel 1 — Commissioned Officers */}
            <div className={styles.rankPanel}>
              <div className={styles.rankPanelHeader}>
                <span className={styles.rankPanelTitle}>Commissioned Officers</span>
              </div>
              <div className={styles.rankPanelBody}>
                {RANK_STRUCTURE.officers.map((rank) => (
                  <div key={rank.abbrev} className={`${styles.rankRow} ${rank.stars > 0 ? styles.rankRowFlag : ''}`}>
                    <div className={styles.rankRowLeft}>
                      <span className={styles.rankRowAbbrev}>{rank.abbrev}</span>
                      {rank.stars > 0 && (
                        <span className={styles.rankRowStars}>{'★'.repeat(rank.stars)}</span>
                      )}
                    </div>
                    <div className={styles.rankRowRight}>
                      <span className={styles.rankRowTitle}>{rank.title}</span>
                      <span className={styles.rankRowNote}>{rank.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2 — JCOs */}
            <div className={styles.rankPanel}>
              <div className={styles.rankPanelHeader}>
                <span className={styles.rankPanelTitle}>Junior Commissioned Officers</span>
              </div>
              <div className={styles.rankPanelBody}>
                {RANK_STRUCTURE.jcos.map((rank) => (
                  <div key={rank.abbrev} className={styles.rankRow}>
                    <div className={styles.rankRowLeft}>
                      <span className={styles.rankRowAbbrev}>{rank.abbrev}</span>
                    </div>
                    <div className={styles.rankRowRight}>
                      <span className={styles.rankRowTitle}>{rank.title}</span>
                      <span className={styles.rankRowNote}>{rank.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3 — NCOs & Soldiers */}
            <div className={styles.rankPanel}>
              <div className={styles.rankPanelHeader}>
                <span className={styles.rankPanelTitle}>NCOs &amp; Soldiers</span>
              </div>
              <div className={styles.rankPanelBody}>
                {RANK_STRUCTURE.or.map((rank) => (
                  <div key={rank.abbrev} className={styles.rankRow}>
                    <div className={styles.rankRowLeft}>
                      <span className={styles.rankRowAbbrev}>{rank.abbrev}</span>
                    </div>
                    <div className={styles.rankRowRight}>
                      <span className={styles.rankRowTitle}>{rank.title}</span>
                      <span className={styles.rankRowNote}>{rank.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
