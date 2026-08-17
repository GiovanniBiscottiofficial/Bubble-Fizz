import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Logo from '@/components/Logo';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hide = () => {
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => setIsVisible(false),
      });
    };

    const timeoutId = setTimeout(hide, 600);

    const onLoad = () => {
      clearTimeout(timeoutId);
      hide();
    };

    window.addEventListener('load', onLoad, { once: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[200] flex flex-col items-center justify-center bg-lux-black">
      <Logo className="h-32 w-32 animate-pulse" priority />
      <p className="mt-6 text-gradient-purple font-label text-sm uppercase tracking-[0.25em]">
        BUBBLE & FIZZ
      </p>
    </div>
  );
}
