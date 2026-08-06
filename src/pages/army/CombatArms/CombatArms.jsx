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

// Infantry Small Arms Imports
import ak203Img from '../../../assets/army/ArmsServices/Equipments/AK203.jpg';
import asmiImg from '../../../assets/army/ArmsServices/Equipments/ASMI.jpg';
import barettaGunImg from '../../../assets/army/ArmsServices/Equipments/BarettaGun.jpg';
import barrettM82Img from '../../../assets/army/ArmsServices/Equipments/BarrettM82A1.jpg';
import dragunovImg from '../../../assets/army/ArmsServices/Equipments/DragunovSVD.jpg';
import fnMinimiImg from '../../../assets/army/ArmsServices/Equipments/FNminimi.jpg';
import mp5Img from '../../../assets/army/ArmsServices/Equipments/HecklerKochMP5.jpg';
import insasImg from '../../../assets/army/ArmsServices/Equipments/INSAS1B1.JPG';
import m4CarbineImg from '../../../assets/army/ArmsServices/Equipments/M4carbine.png';
import mg2a1Img from '../../../assets/army/ArmsServices/Equipments/MG2A1.jpg';
import microUziImg from '../../../assets/army/ArmsServices/Equipments/MicroUzi.jpg';
import nsvImg from '../../../assets/army/ArmsServices/Equipments/NSV.jpg';
import negevImg from '../../../assets/army/ArmsServices/Equipments/NegevNG7.jpg';
import pkMachineGunImg from '../../../assets/army/ArmsServices/Equipments/PKMachineGun.JPG';
import psg1Img from '../../../assets/army/ArmsServices/Equipments/PSG1.jpg';
import pistol9mmImg from '../../../assets/army/ArmsServices/Equipments/Pistol9mm1A.JPG';
import sakoTrgImg from '../../../assets/army/ArmsServices/Equipments/SakoTRG.jpg';
import sig716iImg from '../../../assets/army/ArmsServices/Equipments/Sig716i.jpg';
import tavorTar21Img from '../../../assets/army/ArmsServices/Equipments/TevorTar21.jpg';
import tavorX95Img from '../../../assets/army/ArmsServices/Equipments/TevorX95.jpg';
import vidhwansakImg from '../../../assets/army/ArmsServices/Equipments/Vidhwansak.jpg';
import glockImg from '../../../assets/army/ArmsServices/Equipments/glock.jpg';

// Armoured Corps Imports
import ajeyaImg from '../../../assets/army/ArmsServices/Equipments/AjeyaTank.jpg';
import arjunMk1Img from '../../../assets/army/ArmsServices/Equipments/ArjunMK1.jpg';
import arjunMk1aImg from '../../../assets/army/ArmsServices/Equipments/ArjunMK1A.jpg';
import bhishmaImg from '../../../assets/army/ArmsServices/Equipments/BhishmaTank.jpg';
import t55Img from '../../../assets/army/ArmsServices/Equipments/T55Tank.jpg';
import zorawarImg from '../../../assets/army/ArmsServices/Equipments/ZorawarTank.jpg';

import styles from './CombatArms.module.css';

/* ── Equipment image map (keyed by item name) ────────────────────── */
const EQUIPMENT_IMAGES = {
  'BMP-2 Sarath': bmp2Img,
  'TATA Kestrel': kestrelImg,
  'Pistol Auto 9mm 1A': pistol9mmImg,
  'Glock': glockImg,
  'Micro Uzi': microUziImg,
  'Heckler & Koch MP5': mp5Img,
  'ASMI': asmiImg,
  'AK-203': ak203Img,
  'SIG 716i': sig716iImg,
  'INSAS 1B1': insasImg,
  'Tavor TAR-21': tavorTar21Img,
  'Tavor X95': tavorX95Img,
  'M4A1 Carbine': m4CarbineImg,
  'Dragunov SVD': dragunovImg,
  'Sako TRG 42': sakoTrgImg,
  'Heckler & Koch PSG1': psg1Img,
  'Barrett M82': barrettM82Img,
  'Vidhwansak': vidhwansakImg,
  'IWI Negev NG7': negevImg,
  'FN Minimi': fnMinimiImg,
  'PK Machine Gun': pkMachineGunImg,
  'MG 2A1': mg2a1Img,
  'NSV': nsvImg,
  'Arjun Mk1': arjunMk1Img,
  'Arjun Mk1A': arjunMk1aImg,
  'T-90 Bhishma': bhishmaImg,
  'T-72 Ajeya': ajeyaImg,
  'T-55': t55Img,
  'Zorawar Light Tank': zorawarImg,
  'Baretta Gun': barettaGunImg
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
    isReady: true,
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
                            mainBattleTanks: 'Main Battle Tanks',
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
