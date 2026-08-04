import { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives any history module's scrollytelling behaviour.
 *
 * Design decision: the rail itself is pinned with CSS `position: sticky`
 * (see each module's history.module.css) rather than GSAP's ScrollTrigger
 * `pin` option. Sticky positioning is cheaper (no per-frame layout
 * recalculation) and avoids the extra DOM wrapping / spacer elements
 * ScrollTrigger's pin introduces — and it degrades gracefully if JS is slow
 * to hydrate.
 *
 * GSAP ScrollTrigger is still doing real work here: one trigger per era
 * section decides which era is "active" (for the rail highlight) and fires
 * a reveal animation on that section's content the first time it enters
 * view. That per-section enter/leave logic is what sticky positioning alone
 * can't give us.
 *
 * All ScrollTrigger instances are created inside a gsap.context() scoped
 * to the module container, and reverted on unmount/era-count change —
 * this is what keeps GSAP well-behaved under React StrictMode's double
 * invoke and safe across route changes.
 */
export function useScrollTimeline({ containerRef, panelRef, sectionRefs, reducedMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    // The actual scroll container is the inner .panel div, not the window.
    // We must tell every ScrollTrigger instance to use that element as its
    // scroller, otherwise they watch window scroll (which never moves) and
    // nothing ever triggers.
    const scroller = panelRef?.current ?? containerRef.current;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          scroller,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });

        const content = section.querySelector('[data-reveal]');
        if (content) {
          if (reducedMotion) {
            gsap.set(content, { opacity: 1, y: 0 });
          } else {
            gsap.fromTo(
              content,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  scroller,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, panelRef, sectionRefs.current.length, reducedMotion]);

  return { activeIndex, setActiveIndex };
}
