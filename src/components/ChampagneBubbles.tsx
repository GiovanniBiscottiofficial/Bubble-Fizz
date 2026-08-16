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

    // Initialize MORE bubbles with MORE variety
    const initBubbles = () => {
      bubblesRef.current = [];
      // Increased from 50 to 80 bubbles
      for (let i = 0; i < 80; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          size: Math.random() * 8 + 3, // Larger bubbles (3-11px)
          speed: Math.random() * 1.5 + 0.8, // Faster speed
          opacity: Math.random() * 0.6 + 0.3, // More opaque
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
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
        bubble.x += Math.sin(bubble.wobble) * 0.8; // More wobble

        // Reset bubble if it goes off screen
        if (bubble.y < -30) {
          bubble.y = canvas.height + 30;
          bubble.x = Math.random() * canvas.width;
        }

        // Draw bubble with stronger gradient
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.size
        );
        // Brighter, more noticeable colors
        gradient.addColorStop(0, `rgba(255, 100, 200, ${bubble.opacity})`); // Bright pink center
        gradient.addColorStop(0.4, `rgba(200, 80, 255, ${bubble.opacity * 0.8})`); // Purple middle
        gradient.addColorStop(0.8, `rgba(150, 50, 200, ${bubble.opacity * 0.4})`); // Fading edge
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add outer glow ring
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size * 1.3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(236, 72, 153, ${bubble.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add shine effect (bigger and brighter)
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.size * 0.35,
          bubble.y - bubble.size * 0.35,
          bubble.size * 0.25,
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
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ opacity: 0.85 }} // Much more visible
    />
  );
}
