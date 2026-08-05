import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ModuleCard.module.css';

/**
 * ModuleCard — navigable section card with image upper half & label lower half.
 *
 * Props:
 *   label              {string}   Card title, e.g. "History"
 *   description        {string}   Short subtitle line (optional)
 *   to                 {string}   React Router destination path
 *   imageSrc           {string}   Actual image URL
 *   imageAlt           {string}   Alt text for the image
 *   imagePosition      {string}   CSS object-position override
 *   isUnderDevelopment {boolean}  Shows 'Coming Soon' overlay badge
 *   delay              {number}   Animation stagger delay in ms (default 0)
 *   accentColor        {string}   CSS color for the card's accent stripe
 */
export function ModuleCard({
  label,
  description,
  to,
  imageSrc,
  imageAlt,
  imagePosition,
  isUnderDevelopment,
  delay = 0,
  accentColor,
}) {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const el = cardRef.current;
      if (!el) {
        navigate(to);
        return;
      }

      // Swap enter animation for exit, then navigate on completion.
      el.classList.remove('animate__fadeInUp');
      el.classList.add('animate__fadeOut');

      const onEnd = () => {
        el.removeEventListener('animationend', onEnd);
        navigate(to);
      };
      el.addEventListener('animationend', onEnd);
    },
    [navigate, to]
  );

  return (
    <a
      ref={cardRef}
      href={to}
      onClick={handleClick}
      className={`${styles.card} animate__animated animate__fadeInUp`}
      style={{
        '--card-accent': accentColor,
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
      aria-label={label}
    >
      {/* ---- Upper half: image or placeholder with overlay badge ---- */}
      <div className={styles.imageArea}>
        {isUnderDevelopment && (
          <span className={styles.devBadge}>
            Coming Soon
          </span>
        )}

        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? label}
            className={styles.image}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <span className={styles.placeholderLabel}>{label}</span>
          </div>
        )}
      </div>

      {/* ---- Lower half: label + description ---- */}
      <div className={styles.labelArea}>
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
        </div>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </a>
  );
}
