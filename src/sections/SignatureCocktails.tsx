import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const cocktails = [
  {
    name: 'The Rosé Royale',
    description: 'Sparkling rosé, berry reduction, gold leaf.',
  },
  {
    name: 'Midnight Margarita',
    description: 'Mezcal, citrus, charcoal salt rim.',
  },
  {
    name: 'Velvet Old Fashioned',
    description: 'Bourbon, vanilla, burnt orange.',
  },
];

export default function SignatureCocktails() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const bg = bgRef.current;

     if (!section || !headline || !card || !bg) return;

    const ctx = gsap.context(() => {
      // On mobile, skip pinning — use simple entrance animations instead
      if (isMobile) {
        gsap.fromTo(bg,
          { scale: 1.05, y: '3vh', opacity: 0.75 },
          { scale: 1.00, y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: 0.2 } }
        );
        gsap.fromTo(headline,
          { x: '-6vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: 0.2 } }
        );
        gsap.fromTo(card,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: 0.2 } }
        );
        return;
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 0.1,
        }
      });

      // ENTRANCE (0% - 30%)
      // Background
      scrollTl.fromTo(bg,
        { scale: 1.04, y: '3vh', opacity: 0.75 },
        { scale: 1.00, y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(headline,
        { x: '-5vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Card
      scrollTl.fromTo(card,
        { x: '5vw', opacity: 0, rotateY: 3 },
        { x: 0, opacity: 1, rotateY: 0, ease: 'power2.out' },
        0.05
      );

      // Menu lines stagger
      const menuLines = card.querySelectorAll('.menu-line');
      scrollTl.fromTo(menuLines,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.12
      );

      // SETTLE (30% - 60%) - elements hold position

      // EXIT (60% - 95%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-4vw', opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '4vw', opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.02, y: '-3vh', ease: 'none' },
        0.6
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="signature-cocktails"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-30"
    >
      {/* Pink glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-lux-pink/15 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <OptimizedImage 
          src="/cocktail_closeup.jpg" 
          alt="Signature cocktail"
          className="w-full h-full object-cover"
          priority
        />
        {/* Purple/Pink gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-lux-purple/50 via-lux-black/60 to-lux-pink/30" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Headline */}
          <div ref={headlineRef}>
            <span className="section-label">OUR MENU</span>
            <h2 
              className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
              style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}
            >
              Signature <span className="text-lux-pink">cocktails</span>.
            </h2>
            <p className="mt-6 text-lux-muted text-lg md:text-xl leading-relaxed max-w-md">
              Seasonal recipes, premium spirits, presentation that sparks conversation.
            </p>
          </div>

          {/* Right - Menu Card */}
          <div 
            ref={cardRef}
            className="justify-self-end"
          >
            <div 
              className="w-full max-w-md rounded-3xl p-8 md:p-10 border border-lux-purple/30"
              style={{ 
                background: 'linear-gradient(145deg, rgba(18,18,26,0.9) 0%, rgba(11,11,13,0.95) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="section-label">Tasting Menu</span>
              
              <div className="mt-8 space-y-6">
                {cocktails.map((cocktail) => (
                  <div key={cocktail.name} className="menu-line border-b border-lux-purple/20 pb-4 last:border-0">
                    <h4 className="font-display text-xl text-lux-white font-medium">
                      {cocktail.name}
                    </h4>
                    <p className="mt-1 text-lux-muted text-sm">
                      {cocktail.description}
                    </p>
                  </div>
                ))}
              </div>

              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfYourGoogleFormLink/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 lux-button-outline w-full group"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Request Full Menu
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
