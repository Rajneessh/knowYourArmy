import { ModuleCard } from '../../../components/ModuleCard/ModuleCard';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import combatArmsImg from '../../../assets/army/ArmsServices/CombatArms.png';
import combatSupportImg from '../../../assets/army/ArmsServices/CombatSupport.png';
import servicesImg from '../../../assets/army/ArmsServices/Services.png';
import styles from './ArmyArms.module.css';

const ARMS_CATEGORIES = [
  {
    id: 'combat-arms',
    label: 'Combat Arms',
    description: 'Frontline fighting arms: Infantry, Armoured Corps & Mechanised Infantry.',
    to: '/army/arms/combat',
    accentColor: '#7A3B1E',
    imageSrc: combatArmsImg,
    isUnderDevelopment: true,
  },
  {
    id: 'combat-support',
    label: 'Combat Support Arms',
    description: 'Firepower, mobility & signals: Artillery, Engineers, Signals, AAD & Aviation.',
    to: '/army/arms/combat-support',
    accentColor: '#5B7742',
    imageSrc: combatSupportImg,
    isUnderDevelopment: true,
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Logistics, maintenance & medical: ASC, AOC, EME, AMC, CMP, JAG & more.',
    to: '/army/arms/services',
    accentColor: '#4C5D34',
    imageSrc: servicesImg,
    isUnderDevelopment: true,
  },
];

const ENTER_BASE_DELAY = 180;
const STAGGER_STEP = 75;

export function ArmyArms() {
  useDocumentTitle('Arms & Services — Indian Army');

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>
        {/* Header with emblem, title, motto, divider, and back button below divider */}
        <PageHeader
          title="Arms & Services"
          motto="सेवा परमो धर्मः — Service Before Self"
          backTo="/army"
          backText="Back to Army Hub"
        />

        {/* 3 Category Cards Grid */}
        <div className={styles.grid} role="list">
          {ARMS_CATEGORIES.map((cat, index) => (
            <div key={cat.id} role="listitem" className={styles.gridItem}>
              <ModuleCard
                label={cat.label}
                description={cat.description}
                to={cat.to}
                imageSrc={cat.imageSrc}
                accentColor={cat.accentColor}
                isUnderDevelopment={cat.isUnderDevelopment}
                delay={ENTER_BASE_DELAY + index * STAGGER_STEP}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
