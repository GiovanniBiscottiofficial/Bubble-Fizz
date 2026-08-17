import { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function ChampagneBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Subtle champagne bubbles — fewer, smaller, slower
    const initBubbles = () => {
      bubblesRef.current = [];
      const count = Math.min(30, Math.floor((canvas.width * canvas.height) / 35000));
      for (let i = 0; i < count; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 300,
          size: Math.random() * 3 + 1, // 1-4px
          speed: Math.random() * 0.5 + 0.2, // Slow rise
          opacity: Math.random() * 0.25 + 0.1, // Very subtle
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };
    initBubbles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.25; // Gentle wobble

        // Reset bubble if it goes off screen
        if (bubble.y < -20) {
          bubble.y = canvas.height + 20;
          bubble.x = Math.random() * canvas.width;
        }

        // Soft champagne-gold bubble
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.size
        );
        gradient.addColorStop(0, `rgba(255, 248, 220, ${bubble.opacity})`); // Champagne white center
        gradient.addColorStop(0.5, `rgba(200, 170, 110, ${bubble.opacity * 0.7})`); // Soft gold middle
        gradient.addColorStop(1, 'rgba(200, 170, 110, 0)');

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Tiny white shine
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          bubble.size * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.8})`;
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
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ opacity: 0.35, mixBlendMode: 'screen' }}
    />
  );
}
