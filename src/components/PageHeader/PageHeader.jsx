import { useNavigate } from 'react-router-dom';
import armyEmblem from '../../assets/emblems/army.png';
import styles from './PageHeader.module.css';

/**
 * Reusable PageHeader component for Indian Army pages.
 * Displays top back navigation button, centered emblem, centered title, and motto.
 */
export function PageHeader({
  eyebrow = 'Indian Army',
  title = 'Command Structure',
  motto = 'सेवा परमो धर्मः — Service Before Self',
  emblem = armyEmblem,
  backTo = '/army',
  backText = 'Back to Army',
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={styles.header}>
      {/* Top navigation row with Back Button */}
      {backTo && (
        <div className={styles.navRow}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            aria-label={`Navigate back to ${backText}`}
          >
            <span className={styles.backArrow}>←</span>
            <span className={styles.backLabel}>{backText}</span>
          </button>
        </div>
      )}

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
    </header>
  );
}
