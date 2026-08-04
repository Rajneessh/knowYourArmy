import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import styles from './Landing.module.css';
import armyEmblem from '../../assets/emblems/army.png';
import navyEmblem from '../../assets/emblems/navy.png';
import airForceEmblem from '../../assets/emblems/airforce.png';

const SERVICES = [
  {
    key: 'army',
    label: 'Indian Army',
    to: '/army',
    emblem: armyEmblem,
    accentColor: '#4C5D34',
    bgColor: 'rgba(76, 93, 52, 0.2)',
    labelColor: '#38471f',
  },
  {
    key: 'navy',
    label: 'Indian Navy',
    to: '/navy',
    emblem: navyEmblem,
    accentColor: 'linear-gradient(90deg, #0B1A54, #B08D3E)',
    bgColor: 'rgba(11, 26, 84, 0.16)',
    labelColor: '#0B1A54',
  },
  {
    key: 'airforce',
    label: 'Indian Air Force',
    to: '/airforce',
    emblem: airForceEmblem,
    accentColor: '#2E75C1',
    bgColor: 'rgba(46, 117, 193, 0.18)',
    labelColor: '#1c4d84',
  },
];

export function Landing() {
  return (
    <div className={styles.flag}>
      <div className={styles.content}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Know Your Military</p>
          <h1>INDIA</h1>
        </header>

        <div className={styles.cards} role="navigation" aria-label="Armed forces">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.key}
              label={service.label}
              to={service.to}
              emblem={service.emblem}
              accentColor={service.accentColor}
              bgColor={service.bgColor}
              labelColor={service.labelColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
