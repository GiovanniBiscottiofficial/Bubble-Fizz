import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const hoverRef = useRef(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setHidden(false);
    document.documentElement.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hoverRef.current = !!target.closest(
        'a, button, [role="button"], input, textarea, select, .lux-button, .lux-card, .lux-input, [data-cursor-hover]'
      );
    };

    const onLeave = () => {
      hoverRef.current = false;
    };

    const update = () => {
      const ringSize = hoverRef.current ? 48 : 16;
      const ringHalf = hoverRef.current ? 24 : 8;
      const dotSize = hoverRef.current ? 10 : 4;
      const dotHalf = hoverRef.current ? 5 : 2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - ringHalf}px, ${posRef.current.y - ringHalf}px)`;
        cursorRef.current.style.width = `${ringSize}px`;
        cursorRef.current.style.height = `${ringSize}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - dotHalf}px, ${posRef.current.y - dotHalf}px)`;
        dotRef.current.style.width = `${dotSize}px`;
        dotRef.current.style.height = `${dotSize}px`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-lux-gold/80 bg-lux-gold/5 backdrop-blur-[1px]"
        style={{
          width: 16,
          height: 16,
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, box-shadow 0.25s ease-out',
          boxShadow: '0 0 20px rgba(200, 169, 81, 0.25)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-lux-gold"
        style={{
          width: 4,
          height: 4,
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.18s ease-out, height 0.18s ease-out',
          boxShadow: '0 0 10px rgba(200, 169, 81, 0.8)',
        }}
      />
    </>
  );
}
