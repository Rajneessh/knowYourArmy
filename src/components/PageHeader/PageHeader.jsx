import { useNavigate } from 'react-router-dom';
import armyEmblem from '../../assets/emblems/army.png';
import styles from './PageHeader.module.css';

/**
 * Reusable PageHeader component for Indian Army pages.
 * Displays logo + title + motto, divider line, and back button row below divider.
 */
export function PageHeader({
  eyebrow,
  title = 'Command Structure',
  motto = 'सेवा परमो धर्मः — Service Before Self',
  emblem = armyEmblem,
  backTo = '/army',
  backText = 'Back to Army Hub',
}) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* Centered Emblem, Title, & Motto */}
      <div className={styles.centerWrap}>
        <button
          onClick={() => navigate('/')}
          className={`${styles.emblemWrap} ${styles.emblemButton} animate__animated animate__fadeIn`}
          style={{ animationDelay: '0ms', animationFillMode: 'both' }}
          aria-label="Go to Home Landing Page"
          title="Go to Home Landing Page"
          type="button"
        >
          <img src={emblem} alt="Indian Army emblem" className={styles.emblem} />
        </button>

        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

        <h1
          className={`${styles.title} animate__animated animate__fadeIn`}
          style={{ animationDelay: '80ms', animationFillMode: 'both' }}
        >
          {title}
        </h1>

        {motto && (
          <p
            className={`${styles.motto} animate__animated animate__fadeIn`}
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            {motto}
          </p>
        )}
      </div>

      {/* Styled Divider line matching ArmyHub */}
      <div
        className={`${styles.divider} animate__animated animate__fadeIn`}
        style={{ animationDelay: '190ms', animationFillMode: 'both' }}
        role="separator"
        aria-hidden="true"
      />

      {/* Navigation row with Back Button below logo, motto & divider */}
      {backTo && (
        <div className={styles.navRow}>
          <button
            onClick={() => navigate(backTo)}
            className={styles.backButton}
            aria-label={`Navigate back to ${backText}`}
          >
            <span className={styles.backArrow}>←</span>
            <span className={styles.backLabel}>{backText}</span>
          </button>
        </div>
      )}
    </header>
  );
}
