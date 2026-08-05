import { useState } from 'react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

import infantryData from './data/infantry.json';
import armouredCorpsData from './data/armouredCorps.json';
import mechanisedInfantryData from './data/mechanisedInfantry.json';

import infantryEmblem from '../../../assets/army/ArmsServices/Infantry.webp';
import armouredCorpsEmblem from '../../../assets/army/ArmsServices/ArmouredCorps.webp';
import mechanisedInfantryEmblem from '../../../assets/army/ArmsServices/MechanisedInfantry.webp';
import bmp2Img from '../../../assets/army/ArmsServices/bmp2.webp';
import kestrelImg from '../../../assets/army/ArmsServices/kestrel.webp';

import styles from './CombatArms.module.css';

/* ── Equipment image map (keyed by item name) ────────────────────── */
const EQUIPMENT_IMAGES = {
  'BMP-2 Sarath': bmp2Img,
  'TATA Kestrel': kestrelImg,
};

/* ── static config per column ─────────────────────────────────────── */
const ARMS = [
  {
    key: 'infantry',
    data: infantryData,
    emblem: infantryEmblem,
    accentVar: '--ca-infantry',
    isReady: true,
  },
  {
    key: 'mechanised-infantry',
    data: mechanisedInfantryData,
    emblem: mechanisedInfantryEmblem,
    accentVar: '--ca-mech',
    isReady: true,
  },
  {
    key: 'armoured-corps',
    data: armouredCorpsData,
    emblem: armouredCorpsEmblem,
    accentVar: '--ca-armoured',
    isReady: false,
  },
];

/* ── tiny helpers ─────────────────────────────────────────────────── */
function EquipmentCard({ item }) {
  const img = EQUIPMENT_IMAGES[item.name];
  return (
    <div className={styles.equipCard}>
      <div className={styles.equipPhoto}>
        {img ? (
          <img src={img} alt={item.name} className={styles.equipPhotoImg} />
        ) : (
          <span className={styles.equipPhotoLabel} aria-hidden="true">Photo</span>
        )}
      </div>
      <div className={styles.equipInfo}>
        <span className={styles.equipName}>{item.name}</span>
        <span className={styles.equipType}>
          {item.type}{item.caliber ? ` • ${item.caliber}` : ''}
        </span>
      </div>
    </div>
  );
}

function ComingSoonOverlay() {
  return (
    <div className={styles.comingSoonOverlay} aria-label="Content coming soon">
      <span className={styles.comingSoonIcon}>⌛</span>
      <p className={styles.comingSoonText}>Content Coming Soon</p>
      <p className={styles.comingSoonSub}>Historical data is being compiled</p>
    </div>
  );
}

function ArmColumn({ arm, expandedSections, onToggleSection }) {
  const { data, emblem, isReady, accentVar } = arm;
  const hasContent = isReady && (data.history || data.equipment || data.role);

  return (
    <article
      className={styles.column}
      style={{ '--accent': `var(${accentVar})` }}
    >
      {/* ── Column Header ─────────────────────────────────── */}
      <header className={styles.columnHeader}>
        <div className={styles.emblemWrap}>
          <img
            src={emblem}
            alt={`${data.name} emblem`}
            className={styles.emblemImg}
          />
        </div>
        <h2 className={styles.armName}>{data.name}</h2>
      </header>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className={styles.columnDivider} role="separator" aria-hidden="true" />

      {/* ── Body ──────────────────────────────────────────── */}
      <div className={styles.columnBody}>
        {!hasContent ? (
          <ComingSoonOverlay />
        ) : (
          <>
            {/* Role pill */}
            <div className={styles.roleBlock}>
              <span className={styles.roleLabel}>Role</span>
              <p className={styles.roleText}>{data.role}</p>
            </div>

            {/* Quick-facts strip */}
            <div className={styles.factsStrip}>
              {data.raisedOn && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Raised</span>
                  <span className={styles.factValue}>{data.raisedOn}</span>
                </div>
              )}
              {data.regimentsCount != null && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Regiments</span>
                  <span className={styles.factValue}>{data.regimentsCount} Active</span>
                </div>
              )}
              {data.battalions != null && (
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Battalions</span>
                  <span className={styles.factValue}>{data.battalions}</span>
                </div>
              )}
            </div>

            {/* History — collapsible */}
            {data.history && (
              <div className={styles.historyBlock}>
                <button
                  className={styles.historyToggle}
                  onClick={() => onToggleSection('history')}
                  aria-expanded={expandedSections.history}
                  aria-controls={`history-${arm.key}`}
                  type="button"
                >
                  <span>History</span>
                  <span
                    className={`${styles.toggleChevron} ${expandedSections.history ? styles.chevronOpen : ''}`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>
                <div
                  id={`history-${arm.key}`}
                  className={`${styles.historyBody} ${expandedSections.history ? styles.historyOpen : ''}`}
                >
                  <div className={styles.collapsibleContentPadding}>
                    {Array.isArray(data.history) ? (
                      <ul className={styles.opsList}>
                        {data.history.map((point, idx) => (
                          <li key={idx} className={styles.opsItem}>
                            <span className={styles.opsBullet} aria-hidden="true">▸</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.historyText}>{data.history}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Operations */}
            {data.operations?.length > 0 && (
              <div className={styles.opsBlock}>
                <span className={styles.opsLabel}>Notable Operations</span>
                <ul className={styles.opsList}>
                  {data.operations.map((op) => (
                    <li key={op} className={styles.opsItem}>
                      <span className={styles.opsBullet} aria-hidden="true">▸</span>
                      {op}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Equipment — collapsible */}
            {data.equipment && (
              <div className={styles.historyBlock}>
                <button
                  className={styles.historyToggle}
                  onClick={() => onToggleSection('equipment')}
                  aria-expanded={expandedSections.equipment}
                  aria-controls={`equipment-${arm.key}`}
                  type="button"
                >
                  <span>Equipment & Weaponry</span>
                  <span
                    className={`${styles.toggleChevron} ${expandedSections.equipment ? styles.chevronOpen : ''}`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>
                <div
                  id={`equipment-${arm.key}`}
                  className={`${styles.historyBody} ${expandedSections.equipment ? styles.historyOpen : ''}`}
                >
                  <div className={styles.collapsibleContentPadding}>
                    {/* Array format (Mechanized Infantry) */}
                    {Array.isArray(data.equipment) && (
                      <div className={styles.equipGrid}>
                        {data.equipment.map((item) => (
                          <EquipmentCard key={item.name} item={item} />
                        ))}
                      </div>
                    )}

                    {/* Categorized Object format (Infantry Small Arms) */}
                    {!Array.isArray(data.equipment) && (
                      <div className={styles.categorizedEquipList}>
                        {Object.entries(data.equipment).map(([categoryKey, items]) => {
                          if (!items || items.length === 0) return null;
                          const categoryTitles = {
                            handguns: 'Handguns & Pistols',
                            submachineGuns: 'Submachine Guns & PDWs',
                            assaultRifles: 'Assault & Battle Rifles',
                            sniperRifles: 'Sniper & Marksman Rifles',
                            antiMaterialRifles: 'Anti-Material Rifles',
                            machineGuns: 'Light & Heavy Machine Guns',
                          };

                          return (
                            <div key={categoryKey} className={styles.equipCategoryGroup}>
                              <h4 className={styles.equipCategoryTitle}>
                                {categoryTitles[categoryKey] || categoryKey}
                              </h4>
                              <div className={styles.equipCategoryGrid}>
                                {items.map((item) => (
                                  <EquipmentCard key={item.name} item={item} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export function CombatArms() {
  useDocumentTitle('Combat Arms — Indian Army');

  // Track expanded sections per arm column key: { 'infantry': { history: false, regiments: false, equipment: false } }
  const [expandedMap, setExpandedMap] = useState({
    infantry: { history: false, regiments: false, equipment: false },
    'mechanised-infantry': { history: false, regiments: false, equipment: false },
    'armoured-corps': { history: false, regiments: false, equipment: false },
  });

  const handleToggleSection = (armKey, sectionKey) => {
    setExpandedMap((prev) => ({
      ...prev,
      [armKey]: {
        ...prev[armKey],
        [sectionKey]: !prev[armKey]?.[sectionKey],
      },
    }));
  };

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>
        <PageHeader
          eyebrow="Arms & Services"
          title="Combat Arms"
          motto="Frontline Fighting Forces of the Indian Army"
          backTo="/army/arms"
          backText="Back to Arms & Services"
        />

        {/* Category label */}
        <p className={styles.pageIntro}>
          Combat Arms are the frontline fighting elements of the Indian Army — directly
          responsible for engaging and defeating enemy forces through close combat, fire and
          manoeuvre.
        </p>

        {/* 3-column layout */}
        <div className={styles.columnsWrapper} role="list">
          {ARMS.map((arm) => (
            <div key={arm.key} role="listitem" className={styles.columnWrapper}>
              <ArmColumn
                arm={arm}
                expandedSections={expandedMap[arm.key] || {}}
                onToggleSection={(secKey) => handleToggleSection(arm.key, secKey)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
