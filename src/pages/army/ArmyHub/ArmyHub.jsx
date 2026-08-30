import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../../../components/ModuleCard/ModuleCard';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import armyEmblem from '../../../assets/emblems/army.png';
import structureImg from '../../../assets/army/ArmyFrontPage/Structure.webp';
import armsImg from '../../../assets/army/ArmyFrontPage/ArmsAndServices.webp';
import regimentsImg from '../../../assets/army/ArmyFrontPage/Regiments.webp';
import historyImg from '../../../assets/army/ArmyFrontPage/History.webp';
import chiefsImg from '../../../assets/army/ArmyFrontPage/ArmyChief.webp';
import conflictsImg from '../../../assets/army/ArmyFrontPage/WarsAndConflicts.webp';
import heroesImg from '../../../assets/army/ArmyFrontPage/Heroes.webp';
import styles from './ArmyHub.module.css';

const ARMY_MODULES = {
  row1: [
    {
      label: 'Structure',
      description: 'Organisation & command',
      to: '/army/structure',
      accentColor: '#4C5D34',
      imageSrc: structureImg,
      isUnderDevelopment: false,
    },
    {
      label: 'Arms & Services',
      description: 'Corps & branches',
      to: '/army/arms',
      accentColor: '#5B7742',
      imageSrc: armsImg,
      isUnderDevelopment: false,
    },
    {
      label: 'Chiefs of Army Staff',
      description: 'Generals of the nation',
      to: '/army/chiefs',
      accentColor: '#4C5D34',
      imageSrc: chiefsImg,
      imagePosition: 'center 18%',
      isUnderDevelopment: false,
    },
    {
      label: 'Operations',
      description: 'Battles & campaigns',
      to: '/army/conflicts',
      accentColor: '#7A3B1E',
      imageSrc: conflictsImg,
      isUnderDevelopment: false,
    },
  ],
  row2: [
    {
      label: 'Regiments',
      description: 'Infantry & armoured',
      to: '/army/regiments',
      accentColor: '#A4AA88',
      imageSrc: regimentsImg,
      isUnderDevelopment: true,
    },
    {
      label: 'History',
      description: 'From antiquity to now',
      to: '/army/history',
      accentColor: '#B08D3E',
      imageSrc: historyImg,
      isUnderDevelopment: true,
    },
    {
      label: 'Heroes',
      description: 'Param Vir Chakra & more',
      to: '/army/heroes',
      accentColor: '#B08D3E',
      imageSrc: heroesImg,
      imagePosition: 'top',
      isUnderDevelopment: true,
    },
  ],
};

// Base delay after which cards start appearing (header animates 0–200ms).
const ENTER_BASE_DELAY = 220;
const STAGGER_STEP = 65;

export function ArmyHub() {
  useDocumentTitle('Indian Army');
  const navigate = useNavigate();

  return (
    <div className={`${styles.page} texture-topo`}>
      <div className={styles.inner}>

        {/* ---- Centered Header ---- */}
        <header className={styles.header}>
          <button
            onClick={() => navigate('/')}
            className={`${styles.emblemWrap} ${styles.emblemButton} animate__animated animate__fadeIn`}
            style={{ animationDelay: '0ms', animationFillMode: 'both' }}
            aria-label="Go to Home Landing Page"
            title="Go to Home Landing Page"
            type="button"
          >
            <img src={armyEmblem} alt="Indian Army emblem" className={styles.emblem} />
          </button>

          <h1
            className={`${styles.title} animate__animated animate__fadeIn`}
            style={{ animationDelay: '80ms', animationFillMode: 'both' }}
          >
            Indian Army
          </h1>

          <p
            className={`${styles.motto} animate__animated animate__fadeIn`}
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            सेवा परमो धर्मः — Service Before Self
          </p>
        </header>

        {/* ---- Divider ---- */}
        <div
          className={`${styles.divider} animate__animated animate__fadeIn`}
          style={{ animationDelay: '190ms', animationFillMode: 'both' }}
          role="separator"
          aria-hidden="true"
        />

        {/* ---- Card Grid: 4 + 4 ---- */}
        <nav aria-label="Indian Army sections" className={styles.gridNav}>
          {/* Row 1 */}
          <div className={styles.row}>
            {ARMY_MODULES.row1.map((card, i) => (
              <ModuleCard
                key={card.to}
                label={card.label}
                description={card.description}
                to={card.to}
                imageSrc={card.imageSrc}
                imagePosition={card.imagePosition}
                isUnderDevelopment={card.isUnderDevelopment}
                accentColor={card.accentColor}
                delay={ENTER_BASE_DELAY + i * STAGGER_STEP}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div className={`${styles.row} ${styles.row2}`}>
            {ARMY_MODULES.row2.map((card, i) => (
              <ModuleCard
                key={card.to}
                label={card.label}
                description={card.description}
                to={card.to}
                imageSrc={card.imageSrc}
                imagePosition={card.imagePosition}
                isUnderDevelopment={card.isUnderDevelopment}
                accentColor={card.accentColor}
                delay={ENTER_BASE_DELAY + (ARMY_MODULES.row1.length + i) * STAGGER_STEP}
              />
            ))}
          </div>
        </nav>

      </div>
    </div>
  );
}
