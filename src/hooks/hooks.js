import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query in React state.
 * Used to switch the timeline rail between vertical (desktop)
 * and horizontal (mobile) orientation.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
