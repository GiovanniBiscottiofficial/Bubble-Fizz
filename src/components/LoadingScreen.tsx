import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const hideLoadingScreen = () => {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      tl.to('.loading-progress', {
        width: '100%',
        duration: 0.6,
        ease: 'power2.out',
      });

      tl.to('.loading-screen', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.2);
    };

    if (document.readyState === 'complete') {
      timeoutId = setTimeout(hideLoadingScreen, 300);
    } else {
      window.addEventListener('load', hideLoadingScreen);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', hideLoadingScreen);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[200] flex flex-col items-center justify-center bg-lux-black">
      <img
        src="/logo.png"
        alt="Bubble & Fizz Logo"
        className="h-32 w-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.6)] animate-pulse"
      />
      <p className="mt-6 text-gradient-purple font-label text-sm uppercase tracking-[0.25em]">
        BUBBLE & FIZZ
      </p>
      <div className="mt-8 w-56 h-1 bg-lux-white/10 rounded-full overflow-hidden">
        <div className="loading-progress h-full w-0 bg-gradient-to-r from-lux-purple to-lux-pink rounded-full transition-all" />
      </div>
      <p className="mt-4 text-lux-muted/60 text-xs font-label uppercase tracking-wider">
        Pouring your experience...
      </p>
    </div>
  );
}
