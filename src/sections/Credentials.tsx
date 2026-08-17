import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, FileCheck } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    icon: Award,
    title: '5-Star Rated',
    description: 'Consistently rated 5 stars by clients across all review platforms.',
    highlight: false,
  },
  {
    icon: Shield,
    title: 'Licensed, Insured & TIPS Certified',
    description: 'Professional mobile bartending with the credentials your venue requires.',
    highlight: true,
  },
  {
    icon: FileCheck,
    title: 'Premium Presentation',
    description: 'Shimmer drinks, dry-ice effects, edible garnishes, and elegant bar styling.',
    highlight: false,
  },
];

export default function Credentials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !headline || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headline,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          }
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${70 - index * 3}%`,
              end: `top ${50 - index * 3}%`,
              scrub: 0.3,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-52 bg-lux-black"
    >
      {/* Gold glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-lux-gold/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lux-white/5 border border-lux-white/10 mb-6">
            <Award className="w-4 h-4 text-lux-pink" />
            <span className="text-lux-white/80 text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 
            className="font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Professional <span className="text-lux-gold">Credentials</span>
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            When you book Bubble & Fizz, you're getting a true professional with the credentials to back it up.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {credentials.map((cred, index) => (
            <div
              key={cred.title}
              ref={el => { cardsRef.current[index] = el; }}
              className={`lux-card group hover:border-lux-gold/40 transition-all duration-300 hover:-translate-y-1 ${
                cred.highlight ? 'border-lux-gold/30' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                cred.highlight 
                  ? 'bg-gradient-to-br from-lux-gold/30 to-lux-pink/30' 
                  : 'bg-lux-purple/10 group-hover:bg-lux-purple/20'
              } transition-all`}>
                <cred.icon className={`w-7 h-7 ${
                  cred.highlight ? 'text-lux-gold' : 'text-lux-purple'
                }`} />
              </div>
              <h3 className="font-display text-xl text-lux-white mb-2">
                {cred.title}
              </h3>
              <p className="text-lux-muted text-sm leading-relaxed">
                {cred.description}
              </p>
            </div>
          ))}
        </div>

        {/* Insurance Note */}
        <div className="mt-8 text-center">
          <p className="text-lux-muted text-sm">
            <span className="text-lux-gold font-medium">Need a Certificate of Insurance?</span>{' '}
            I can provide a COI for your venue upon request. Just let me know during booking!
          </p>
        </div>
      </div>
    </section>
  );
}
