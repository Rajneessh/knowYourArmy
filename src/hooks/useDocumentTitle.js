import { useEffect } from 'react';

/**
 * useDocumentTitle — sets document.title for the current page.
 *
 * Usage:
 *   useDocumentTitle('Indian Army | Know Your Military');
 *
 * Resets to the base title on unmount so navigating back to a page
 * that doesn't call this hook doesn't leave a stale title.
 */
const BASE_TITLE = 'Know Your Military';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
