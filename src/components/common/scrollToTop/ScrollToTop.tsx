'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './ScrollToTop.module.scss';

import { MdArrowUpward } from 'react-icons/md';

const SHOW_SCROLL_Y = 1600;
const HIDE_SCROLL_Y = 1200;
const SCROLL_DURATION = 300;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  function cancelScrollAnimation() {
    if (animationFrameRef.current === null) return;
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible((previous) => {
        if (scrollY >= SHOW_SCROLL_Y) return true;
        if (scrollY <= HIDE_SCROLL_Y) return false;
        return previous;
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', cancelScrollAnimation, { passive: true });
    window.addEventListener('touchstart', cancelScrollAnimation, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event: KeyboardEvent) {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        cancelScrollAnimation();
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', cancelScrollAnimation);
      window.removeEventListener('touchstart', cancelScrollAnimation);
      window.removeEventListener('keydown', handleKeyDown);
      cancelScrollAnimation();
    };
  }, []);

  function handleScrollToTop() {
    cancelScrollAnimation();
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const startY = window.scrollY;
    const startTime = performance.now();

    function animateScroll(time: number) {
      const progress = Math.min((time - startTime) / SCROLL_DURATION, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      window.scrollTo({ top: startY * (1 - easedProgress), behavior: 'instant' });
      animationFrameRef.current = progress < 1 ? requestAnimationFrame(animateScroll) : null;
    }

    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }

  if (!isVisible) return null;

  return (
    <button
      type="button"
      className={styles['scroll-to-top']}
      aria-label="맨 위로 이동"
      onClick={handleScrollToTop}
    >
      <MdArrowUpward aria-hidden="true" />
    </button>
  );
}
