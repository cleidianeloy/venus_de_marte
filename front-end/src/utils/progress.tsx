import {
  useState,
  useEffect,
  type RefObject,
} from 'react';

export default function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  distance: number = 400
): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const calcProgress = (): void => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      // quanto a seção "home" já saiu por cima da viewport
      const scrolledPast = Math.max(0, -rect.top);
      const p = Math.min(1, Math.max(0, scrolledPast / distance));

      setProgress(p);
      ticking = false;
    };

    const onScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(calcProgress);
        ticking = true;
      }
    };

    calcProgress(); // valor inicial
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, distance]);

  return progress;
}