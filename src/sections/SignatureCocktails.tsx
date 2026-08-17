import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.animate-in');
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: 0.5 }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature-cocktails"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-30 flex items-center overflow-hidden"
    >
      {/* Pink glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-lux-pink/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/cocktail_closeup.jpg"
          alt="Signature cocktail"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lux-purple/50 via-lux-black/60 to-lux-pink/30" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Headline */}
          <div className="animate-in">
            <span className="section-label">OUR MENU</span>
            <h2
              className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
              style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}
            >
              Signature <span className="text-lux-pink">cocktails</span>.
            </h2>
            <p className="mt-6 text-lux-muted text-lg md:text-xl leading-relaxed max-w-md">
              Seasonal recipes, premium spirits, and presentation that sparks conversation.
            </p>
          </div>

          {/* Right - Menu Card */}
          <div className="animate-in justify-self-start lg:justify-self-end">
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
                  <div key={cocktail.name} className="border-b border-lux-purple/20 pb-4 last:border-0">
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
                className="mt-8 lux-button-outline w-full group inline-flex justify-center"
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
