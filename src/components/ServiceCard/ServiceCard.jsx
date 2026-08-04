import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';

/**
 * ServiceCard — one branch card on the Landing page.
 *
 * Props:
 *   label       {string}  Branch name, e.g. "Indian Army"
 *   to          {string}  React Router path, e.g. "/army"
 *   emblem      {string}  URL to the emblem image (served from /public)
 *   accentColor {string}  CSS color for the top-bar and border (hex / rgba)
 *   bgColor     {string}  CSS color for the card background tint (rgba)
 *   labelColor  {string}  CSS color for the branch-name label
 */
export function ServiceCard({ label, to, emblem, accentColor, bgColor, labelColor }) {
  return (
    <Link
      to={to}
      className={styles.card}
      style={{
        '--card-accent': accentColor,
        '--card-bg': bgColor,
        '--card-label': labelColor,
      }}
    >
      <span className={styles.cardEmblemWrap}>
        <img src={emblem} alt="" className={styles.cardEmblem} />
      </span>
      <span className={styles.cardLabel}>{label}</span>
    </Link>
  );
}
