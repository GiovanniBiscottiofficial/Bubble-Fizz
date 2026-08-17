import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, CheckCircle, Star, FileCheck, BadgeCheck, Beer, Utensils, ShieldCheck, UserCheck, Wine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Comprehensive liability insurance coverage for all events. Certificate of Insurance (COI) available upon request.',
    highlight: true,
  },
  {
    icon: FileCheck,
    title: 'Licensed Professional',
    description: 'Licensed bartender in the state of North Carolina with all required certifications.',
    highlight: true,
  },
  {
    icon: Award,
    title: '5-Star Rated',
    description: 'Consistently rated 5 stars by clients across all review platforms.',
    highlight: false,
  },
  {
    icon: CheckCircle,
    title: 'TIPS Certified',
    description: 'Training for Intervention ProcedureS certified for responsible alcohol service.',
    highlight: false,
  },
  {
    icon: Star,
    title: '50+ Events Served',
    description: 'Successfully served over 50 events across North Carolina.',
    highlight: false,
  },
  {
    icon: BadgeCheck,
    title: 'Professional Mixologist',
    description: 'Trained in classic and modern mixology techniques with years of experience.',
    highlight: false,
  },
];

const certifications = [
  { icon: ShieldCheck, title: 'TIPS Certified' },
  { icon: Utensils, title: 'ServSafe Certified' },
  { icon: Beer, title: 'Certified Beer Server' },
  { icon: BadgeCheck, title: 'Certified Cicerone' },
  { icon: Shield, title: 'Fully Insured' },
  { icon: UserCheck, title: 'Background Checked' },
  { icon: Wine, title: 'Professional Mixologist' },
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
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${70 - index * 3}%`,
              end: `top ${50 - index * 3}%`,
              scrub: 0.5,
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
      id="credentials"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-52 bg-lux-black"
    >
      {/* Gold glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-lux-gold/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lux-gold/10 border border-lux-gold/30 mb-6">
            <Award className="w-4 h-4 text-lux-gold" />
            <span className="text-lux-gold text-sm font-medium">Why Choose Us</span>
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

        {/* Certification Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {certifications.map((cert) => (
            <div 
              key={cert.title}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-lux-black border border-lux-gold/30 hover:border-lux-gold/60 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-lux-gold/10 flex items-center justify-center group-hover:bg-lux-gold/20 transition-all">
                <cert.icon className="w-4 h-4 text-lux-gold" />
              </div>
              <span className="text-lux-white text-sm font-medium whitespace-nowrap">{cert.title}</span>
            </div>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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

        {/* Trust Badges */}
        <div className="lux-card">
          <h3 className="font-display text-2xl text-lux-white text-center mb-8">
            What You Can <span className="text-lux-gold">Always</span> Expect
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Licensed & Insured', 'Background Checked', 'TIPS Certified', 'Professional Attire', 'Punctual & Reliable', 'Custom Menus'].map((badge) => (
              <div 
                key={badge}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-lux-black border border-lux-gold/30"
              >
                <CheckCircle className="w-4 h-4 text-lux-gold" />
                <span className="text-lux-white text-sm">{badge}</span>
              </div>
            ))}
          </div>
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
