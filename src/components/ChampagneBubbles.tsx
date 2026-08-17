import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  color: 'pink' | 'purple' | 'gold' | 'white';
}

const THEME_COLORS = {
  pink: { center: '255, 120, 200', mid: '236, 72, 153', edge: '139, 92, 246' },
  purple: { center: '200, 160, 255', mid: '139, 92, 246', edge: '236, 72, 153' },
  gold: { center: '255, 245, 210', mid: '212, 175, 55', edge: '184, 134, 11' },
  white: { center: '255, 255, 255', mid: '230, 230, 240', edge: '139, 92, 246' },
};

export default function ChampagneBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    const resizeCanvas = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colorKeys = Object.keys(THEME_COLORS) as Bubble['color'][];

    const initBubbles = () => {
      bubblesRef.current = [];
      // Keep it elegant but lightweight on slower devices
      const count = Math.min(28, Math.floor((cssWidth * cssHeight) / 42000));
      for (let i = 0; i < count; i++) {
        bubblesRef.current.push({
          x: Math.random() * cssWidth,
          y: cssHeight + Math.random() * 400,
          size: Math.random() * 5 + 2, // 2-7px
          speed: Math.random() * 0.7 + 0.25,
          opacity: Math.random() * 0.35 + 0.25,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.015 + 0.005,
          color: colorKeys[Math.floor(Math.random() * colorKeys.length)],
        });
      }
    };
    initBubbles();

    const animate = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      // Overlapping bubbles lighten each other for a soft, glassy glow
      ctx.globalCompositeOperation = 'lighter';

      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.35;

        if (bubble.y < -30) {
          bubble.y = cssHeight + 30;
          bubble.x = Math.random() * cssWidth;
        }

        const palette = THEME_COLORS[bubble.color];
        const r = bubble.size;

        // Outer soft halo
        const halo = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, r * 2.2
        );
        halo.addColorStop(0, `rgba(${palette.mid}, ${bubble.opacity * 0.18})`);
        halo.addColorStop(0.5, `rgba(${palette.edge}, ${bubble.opacity * 0.08})`);
        halo.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Main glassy orb
        const orb = ctx.createRadialGradient(
          bubble.x - r * 0.25, bubble.y - r * 0.25, 0,
          bubble.x, bubble.y, r
        );
        orb.addColorStop(0, `rgba(${palette.center}, ${bubble.opacity})`);
        orb.addColorStop(0.45, `rgba(${palette.mid}, ${bubble.opacity * 0.65})`);
        orb.addColorStop(0.85, `rgba(${palette.edge}, ${bubble.opacity * 0.25})`);
        orb.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, r, 0, Math.PI * 2);
        ctx.fillStyle = orb;
        ctx.fill();

        // Sharp white specular highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - r * 0.35,
          bubble.y - r * 0.35,
          r * 0.22,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.9})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[90]"
      style={{ opacity: 0.55, mixBlendMode: 'screen' }}
    />
  );
}
