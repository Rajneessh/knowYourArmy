import { forwardRef } from 'react';
import styles from './EraPanel.module.css';

/**
 * EraPanel — displays a single historical era's content.
 *
 * Completely data-driven via the `era` object (from any branch's history.json).
 * The `--era-accent` CSS custom property is set from `era.accentColor`, giving
 * each era its own date-label color without extra prop drilling.
 *
 * Props:
 *   era  {object}  A single era entry from a history.json file
 */
export const EraPanel = forwardRef(function EraPanel({ era }, ref) {
  return (
    <section
      ref={ref}
      id={`era-${era.id}`}
      className={styles.eraSection}
      style={{ '--era-accent': era.accentColor }}
    >
      <div className={styles.eraContent} data-reveal>
        <p className={styles.eraDate}>{era.dateRange.display}</p>
        <h2 className={styles.eraTitle}>{era.title}</h2>

        {era.narrative.map((paragraph, i) => (
          <p key={i} className={styles.eraParagraph}>
            {paragraph}
          </p>
        ))}

        {era.tags?.length > 0 && (
          <ul className={styles.eraTags}>
            {era.tags.map((tag) => (
              <li key={tag} className={styles.eraTag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        {era.media?.map((item, i) => (
          <figure className={styles.eraFigure} key={i}>
            {item.resolvedSrc ? (
              <img
                src={item.resolvedSrc}
                alt={item.alt}
                className={styles.eraImage}
                loading="lazy"
              />
            ) : (
              <div className={styles.eraImagePlaceholder} role="img" aria-label={item.alt}>
                <span>Image placeholder</span>
              </div>
            )}
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
});
