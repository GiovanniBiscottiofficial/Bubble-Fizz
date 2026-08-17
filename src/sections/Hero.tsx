import { ChevronRight } from 'lucide-react';

import OptimizedImage from '@/components/OptimizedImage';
import Logo from '@/components/Logo';
import HeroSparkle from '@/components/HeroSparkle';
import CertificationBadges from '@/components/CertificationBadges';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden z-10">
      <div
        className="absolute inset-0 w-full h-full animate-hero-bg"
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
        <div className="relative mb-4 md:mb-6">
          <Logo className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 logo-dramatic" priority />
          <HeroSparkle />
        </div>

        <p
          className="text-gradient-purple font-label text-sm md:text-base uppercase tracking-[0.25em] mb-6 md:mb-8 animate-hero-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          BOOK US FOR ANY AND ALL EVENTS
        </p>

        <h1
          className="font-display text-center text-lux-white font-semibold leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(32px, 4vw, 60px)' }}
        >
          <span className="animate-hero-word" style={{ animationDelay: '0.55s' }}>Luxury</span>{' '}
          <span className="animate-hero-word text-lux-pink" style={{ animationDelay: '0.63s' }}>pours.</span>
          <br />
          <span className="animate-hero-word" style={{ animationDelay: '0.71s' }}>Curated</span>{' '}
          <span className="animate-hero-word text-lux-purple" style={{ animationDelay: '0.79s' }}>moments.</span>
        </h1>

        <p
          className="mt-4 md:mt-6 text-center text-lux-muted text-base md:text-lg max-w-2xl leading-relaxed animate-hero-fade-up"
          style={{ animationDelay: '0.95s' }}
        >
          Mobile champagne bars and craft cocktails for weddings, private parties, corporate events, sporting events, and pop-up bars across the Triangle, Winston‑Salem, Sanford, Mebane, and all of North Carolina.
        </p>

        <div
          className="mt-6 md:mt-8 flex flex-col items-center gap-4 animate-hero-fade-up"
          style={{ animationDelay: '1.1s' }}
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
