import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

import OptimizedImage from '@/components/OptimizedImage';
import Logo from '@/components/Logo';
import CertificationBadges from '@/components/CertificationBadges';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;
    const tagline = taglineRef.current;

    if (!section || !logo || !headline || !subhead || !cta || !bg || !tagline) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bg,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      tl.fromTo(logo,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)' },
        '-=0.8'
      );

      tl.fromTo(tagline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

      const words = headline.querySelectorAll('.word');
      tl.fromTo(words,
        { y: 40, opacity: 0, rotateX: 18 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 },
        '-=0.3'
      );

      tl.fromTo(subhead,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <OptimizedImage
          src="/mercedes_new_1.jpg"
          alt="Mercedes Pettiford - Professional Mixologist pouring champagne"
          className="w-full h-full object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-lux-purple/30 via-transparent to-lux-pink/20" />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-lux-black/70 via-lux-black/40 to-lux-black/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div
          ref={logoRef}
          className="mb-4 md:mb-6"
          style={{ opacity: 0 }}
        >
          <Logo className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 logo-dramatic" priority />
        </div>

        <p
          ref={taglineRef}
          className="text-gradient-purple font-label text-sm md:text-base uppercase tracking-[0.25em] mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          BOOK US FOR ANY AND ALL EVENTS
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-center text-lux-white font-semibold leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}
        >
          <span className="word inline-block opacity-0">Luxury</span>{' '}
          <span className="word inline-block text-lux-pink opacity-0">pours.</span>
          <br />
          <span className="word inline-block opacity-0">Curated</span>{' '}
          <span className="word inline-block text-lux-purple opacity-0">moments.</span>
        </h1>

        <p
          ref={subheadRef}
          className="mt-4 md:mt-6 text-center text-lux-muted text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Mobile champagne bars and craft cocktails for weddings, private parties, corporate events, sporting events, and pop-up bars across the Triangle, Winston‑Salem, Sanford, Mebane, and all of North Carolina.
        </p>

        <div
          ref={ctaRef}
          className="mt-6 md:mt-8 flex flex-col items-center gap-4"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToContact}
              className="lux-button-primary"
            >
              Book Your Event
            </button>
            <a href="#packages" className="lux-button-outline group">
              View Packages
              <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <CertificationBadges compact />
        </div>
      </div>
    </section>
  );
}
