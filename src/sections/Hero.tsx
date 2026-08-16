import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile();

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
      // On mobile, skip pinning — just play entrance animations and exit normally
      if (isMobile) {
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
        return;
      }

      // Desktop: Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background entrance
      tl.fromTo(bg, 
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Logo entrance - BIGGER ANIMATION
      tl.fromTo(logo,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)' },
        '-=0.8'
      );

      // Tagline entrance
      tl.fromTo(tagline,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

      // Headline words entrance
      const words = headline.querySelectorAll('.word');
      tl.fromTo(words,
        { y: 40, opacity: 0, rotateX: 18 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 },
        '-=0.3'
      );

      // Subheadline entrance
      tl.fromTo(subhead,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTA entrance
      tl.fromTo(cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([logo, headline, subhead, cta, tagline], { opacity: 1, y: 0 });
            gsap.set(bg, { scale: 1, y: 0 });
          }
        }
      });

      // EXIT phase: 70% - 100%
      scrollTl.fromTo(logo,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, ease: 'power2.in' },
        0.65
      );

      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subhead,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(tagline,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'none' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image - MERCEDES */}
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
        {/* Purple/Pink gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-lux-purple/30 via-transparent to-lux-pink/20" />
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette-overlay" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-lux-black/70 via-lux-black/40 to-lux-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Logo - MUCH BIGGER */}
        <div 
          ref={logoRef}
          className="mb-4 md:mb-6"
          style={{ opacity: 0 }}
        >
          <OptimizedImage 
            src="/logo.png" 
            alt="Bubble & Fizz Logo"
            className="h-40 md:h-52 lg:h-64 w-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]"
            priority
          />
        </div>

        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="text-gradient-purple font-label text-sm md:text-base uppercase tracking-[0.25em] mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          BOOK US FOR ANY AND ALL EVENTS
        </p>

        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="font-display text-center text-lux-white font-semibold leading-[0.95] tracking-[-0.02em]"
          style={{ 
            fontSize: 'clamp(32px, 4vw, 60px)',
            opacity: 0
          }}
        >
          <span className="word inline-block">Luxury</span>{' '}
          <span className="word inline-block text-lux-pink">pours.</span>
          <br />
          <span className="word inline-block">Curated</span>{' '}
          <span className="word inline-block text-lux-purple">moments.</span>
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadRef}
          className="mt-4 md:mt-6 text-center text-lux-muted text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Mobile champagne bars and craft cocktails for weddings, celebrations, and corporate events across North Carolina.
        </p>

        {/* CTA Buttons */}
        <div 
          ref={ctaRef}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}
        >
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
      </div>
    </section>
  );
}
