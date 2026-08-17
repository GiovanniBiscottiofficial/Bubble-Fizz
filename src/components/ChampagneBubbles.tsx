import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
}

const THEME_COLORS: Record<string, string> = {
  pink: 'rgba(236, 72, 153, ',
  purple: 'rgba(124, 58, 237, ',
  gold: 'rgba(200, 169, 81, ',
  white: 'rgba(246, 246, 250, ',
};

export default function ChampagneBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let frameCount = 0;

    const resizeCanvas = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colorKeys = Object.keys(THEME_COLORS);

    const initBubbles = () => {
      bubblesRef.current = [];
      const count = Math.min(14, Math.floor((cssWidth * cssHeight) / 65000));
      for (let i = 0; i < count; i++) {
        bubblesRef.current.push({
          x: Math.random() * cssWidth,
          y: cssHeight + Math.random() * 400,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.22 + 0.18,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.012 + 0.004,
          color: colorKeys[Math.floor(Math.random() * colorKeys.length)],
        });
      }
    };
    initBubbles();

    const draw = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.globalCompositeOperation = 'lighter';

      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.25;

        if (bubble.y < -20) {
          bubble.y = cssHeight + 20;
          bubble.x = Math.random() * cssWidth;
        }

        const base = THEME_COLORS[bubble.color];
        const r = bubble.size;

        // Single soft halo per bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${base}${bubble.opacity * 0.25})`;
        ctx.fill();

        // Main orb
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${base}${bubble.opacity})`;
        ctx.fill();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(bubble.x - r * 0.35, bubble.y - r * 0.35, r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.9})`;
        ctx.fill();
      });
    };

    const animate = () => {
      // Render at ~30 fps to keep mobile main thread free
      frameCount++;
      if (frameCount % 2 === 0) {
        draw();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[98]"
      style={{ opacity: 0.55, mixBlendMode: 'screen' }}
    />
  );
}
