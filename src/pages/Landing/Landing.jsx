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
    accentColor: '#7A9A5B',
    bgColor: 'linear-gradient(180deg, rgba(32, 46, 20, 0.48) 0%, rgba(16, 24, 10, 0.58) 100%)',
    borderColor: 'rgba(122, 154, 91, 0.65)',
    labelColor: '#F0EBD8',
    isUnderDevelopment: false,
  },
  {
    key: 'navy',
    label: 'Indian Navy',
    to: '/navy',
    emblem: navyEmblem,
    accentColor: '#D69E2E',
    bgColor: 'linear-gradient(180deg, rgba(12, 26, 58, 0.48) 0%, rgba(6, 14, 32, 0.58) 100%)',
    borderColor: 'rgba(214, 158, 46, 0.65)',
    labelColor: '#FFE699',
    isUnderDevelopment: true,
  },
  {
    key: 'airforce',
    label: 'Indian Air Force',
    to: '/airforce',
    emblem: airForceEmblem,
    accentColor: '#4299E1',
    bgColor: 'linear-gradient(180deg, rgba(16, 42, 74, 0.48) 0%, rgba(8, 20, 40, 0.58) 100%)',
    borderColor: 'rgba(66, 153, 225, 0.65)',
    labelColor: '#E2F1FF',
    isUnderDevelopment: true,
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
              borderColor={service.borderColor}
              labelColor={service.labelColor}
              isUnderDevelopment={service.isUnderDevelopment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
