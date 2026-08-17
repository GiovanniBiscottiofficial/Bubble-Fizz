import { useEffect, useState } from 'react';

const starPath = 'M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z';

const sparkles = [
  { top: '-8%', left: '18%', size: 14, delay: 0 },
  { top: '10%', right: '10%', size: 10, delay: 0.12 },
  { top: '42%', left: '-6%', size: 12, delay: 0.24 },
  { top: '62%', right: '-4%', size: 16, delay: 0.36 },
  { top: '90%', left: '28%', size: 10, delay: 0.48 },
  { top: '24%', left: '50%', size: 8, delay: 0.6 },
];

export default function HeroSparkle() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = 'bubble-fizz-sparkle-shown';
    if (localStorage.getItem(key)) return;
    setShow(true);
    localStorage.setItem(key, '1');
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {sparkles.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute animate-hero-sparkle text-lux-gold fill-current"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            filter: 'drop-shadow(0 0 6px rgba(200,169,81,0.8))',
          }}
        >
          <path d={starPath} />
        </svg>
      ))}
    </div>
  );
}
