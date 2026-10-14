import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import '../App.css';

// Full-screen vertical sections: one scroll moves to the next section, which
// slides up over the current one. Sections taller than the screen scroll
// inside themselves first, then move on at their top/bottom edge.

const TRANSITION_MS = 1200;

const FullPage = ({ children }) => {
  const panels = Children.toArray(children).filter(Boolean);
  const count = panels.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef([]);
  const lockedRef = useRef(false);
  const activeRef = useRef(0);
  const containerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      const next = Math.max(0, Math.min(count - 1, index));
      if (next === activeRef.current || lockedRef.current) {
        return;
      }
      lockedRef.current = true;
      activeRef.current = next;
      setActiveIndex(next);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_MS);
    },
    [count]
  );

  // Tell the navbar which section is showing so it can switch to its solid style.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('fullpage:change', { detail: { index: activeIndex } }));
    const panel = panelRefs.current[activeIndex];
    if (panel) {
      panel.scrollTop = 0;
    }
  }, [activeIndex]);

  // Sections start below the fixed header; its height changes on small screens.
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('.luxury-header');
      if (header && containerRef.current) {
        containerRef.current.style.setProperty('--header-height', `${header.offsetHeight}px`);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Page itself must not scroll while the sections are shown.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
      window.dispatchEvent(new CustomEvent('fullpage:change', { detail: { index: 0 } }));
    };
  }, []);

  useEffect(() => {
    const atEdge = (direction) => {
      const panel = panelRefs.current[activeRef.current];
      if (!panel) {
        return true;
      }
      if (direction > 0) {
        return panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;
      }
      return panel.scrollTop <= 0;
    };

    const move = (direction, event) => {
      if (lockedRef.current) {
        if (event && event.cancelable) event.preventDefault();
        return;
      }
      if (!atEdge(direction)) {
        return;
      }
      if (event && event.cancelable) event.preventDefault();
      goTo(activeRef.current + (direction > 0 ? 1 : -1));
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 4) {
        return;
      }
      move(event.deltaY, event);
    };

    let touchStartY = null;
    const onTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };
    const onTouchEnd = (event) => {
      if (touchStartY === null) {
        return;
      }
      const delta = touchStartY - event.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(delta) > 50) {
        move(delta);
      }
    };

    const onKeyDown = (event) => {
      const tag = event.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        return;
      }
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        move(1, event);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        move(-1, event);
      }
    };

    // Navbar can ask for a section by index or by an element id inside it.
    const onGoTo = (event) => {
      const { index, id } = event.detail || {};
      if (typeof index === 'number') {
        lockedRef.current = false;
        goTo(index);
        return;
      }
      if (id) {
        const target = panelRefs.current.findIndex((panel) => panel && panel.querySelector(`#${id}`));
        if (target !== -1) {
          lockedRef.current = false;
          goTo(target);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('fullpage:goto', onGoTo);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('fullpage:goto', onGoTo);
    };
  }, [goTo]);

  return (
    <div className="fullpage" ref={containerRef}>
      {panels.map((panel, index) => (
        <div
          key={index}
          ref={(el) => {
            panelRefs.current[index] = el;
          }}
          className={`fullpage-panel${index === 0 ? ' fullpage-panel--first' : ''}${index > activeIndex ? ' is-below' : ''}`}
          style={{ zIndex: index + 1 }}
          aria-hidden={index !== activeIndex}
        >
          {panel}
        </div>
      ))}
      <div className="fullpage-dots">
        {panels.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`fullpage-dot${index === activeIndex ? ' active' : ''}`}
            aria-label={`Go to section ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FullPage;
