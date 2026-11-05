import { useEffect, useRef } from 'react';

const SCROLL_THRESHOLD = 12;

export default function useScrollHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;

    const header = element;
    const container = parent;

    let headerHeight = header.getBoundingClientRect().height;
    let previousScrollY = getScrollY();
    let direction = 0;
    let distance = 0;
    let isHidden = false;

    function getScrollY() {
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(maxScrollY, Math.max(0, window.scrollY));
    }

    function updateVisibility(nextIsHidden: boolean) {
      isHidden = nextIsHidden;
      header.dataset.hidden = String(isHidden);
      container.style.setProperty('--header-offset', isHidden ? '0px' : `${headerHeight}px`);
    }

    function handleScroll() {
      const scrollY = getScrollY();
      const delta = scrollY - previousScrollY;
      previousScrollY = scrollY;

      if (scrollY <= headerHeight || header.contains(document.activeElement)) {
        distance = 0;
        direction = 0;
        updateVisibility(false);
        return;
      }

      if (delta === 0) return;
      const nextDirection = Math.sign(delta);
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;

      if (distance >= SCROLL_THRESHOLD) {
        updateVisibility(direction > 0);
        distance = 0;
      }
    }

    function handleFocusIn() {
      distance = 0;
      direction = 0;
      updateVisibility(false);
    }

    const resizeObserver = new ResizeObserver(() => {
      headerHeight = header.getBoundingClientRect().height;
      updateVisibility(isHidden);
    });

    updateVisibility(false);
    resizeObserver.observe(header);
    window.addEventListener('scroll', handleScroll, { passive: true });
    header.addEventListener('focusin', handleFocusIn);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      header.removeEventListener('focusin', handleFocusIn);
      container.style.removeProperty('--header-offset');
    };
  }, []);

  return headerRef;
}
