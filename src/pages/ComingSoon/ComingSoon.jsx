import { useNavigate } from 'react-router-dom';
import styles from './ComingSoon.module.css';

/**
 * ComingSoon — placeholder page for modules not yet built.
 *
 * Props:
 *   service  {string}  Module name displayed on the page
 *   backTo   {string}  Route to navigate back to (default: '/')
 *                      Pass '/army' for Army sub-module stubs.
 */
export function ComingSoon({ service, backTo = '/' }) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <h1>{service}</h1>
      <p>This module is currently under development.</p>
      <button
        className={styles.back}
        onClick={() => navigate(backTo)}
        type="button"
      >
        ← Back
      </button>
    </div>
  );
}
