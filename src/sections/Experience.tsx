import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wine, Palette, ConciergeBell, Martini, PartyPopper, Sparkles } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import CertificationBadges from '@/components/CertificationBadges';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Wine,
    label: 'Curated Menu',
    title: 'Signature Cocktails',
    description: 'Signature cocktails and champagne service tailored to your theme and taste preferences.',
  },
  {
    icon: Palette,
    label: 'Styling & Setup',
    title: 'Elegant Design',
    description: 'Elegant bar design that complements your venue\'s aesthetic and elevates the atmosphere.',
  },
  {
    icon: ConciergeBell,
    label: 'Impeccable Service',
    title: 'Professional Team',
    description: 'Professional, warm bartenders who read the room and create memorable experiences.',
  },
];

const serviceGroups = [
  {
    icon: Martini,
    title: 'Beverage Types',
    items: ['Beer', 'Liquor / mixed drinks', 'Wine', 'Non-alcoholic beverages'],
  },
  {
    icon: PartyPopper,
    title: 'Event Type',
    items: [
      'Wedding reception',
      'Birthday party',
      'Special occasion',
      'Cocktail party',
      'Corporate event',
      'Fundraiser',
      'Holiday party',
      'Bachelor / bachelorette party',
    ],
  },
  {
    icon: Sparkles,
    title: 'Event Vibe',
    items: ['Low key / casual', 'Formal / elegant', 'Upbeat / lively', 'Club scene'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const about = aboutRef.current;

    if (!section || !headline || !body || cards.length === 0 || !about) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
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

      // Body animation
      gsap.fromTo(body,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      // About section animation
      gsap.fromTo(about,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: about,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card, index) => {
        const direction = index === 2 ? '-10vw' : '10vw';
        gsap.fromTo(card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${75 - index * 5}%`,
              end: `top ${50 - index * 5}%`,
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
      id="experience"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-20 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* About Mercedes - NEW PHOTO */}
        <div ref={aboutRef} className="mb-20">
          <div className="lux-card flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 border-4 border-lux-pink/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              <OptimizedImage 
                src="/mercedes_new_3.jpg" 
                alt="Mercedes Pettiford - Professional Mixologist"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl text-lux-white font-medium">
                Mercedes <span className="text-lux-pink">Pettiford</span>
              </h3>
              <p className="mt-2 text-gradient-purple text-sm font-label uppercase tracking-wider">
                Professional, Licensed & Insured Mixologist
              </p>
              <p className="mt-4 text-lux-muted leading-relaxed max-w-xl">
                Exceptional customer service and awesome cocktails with a smile and swagger like no other — and we make amazing dry ice mocktails, too! Seeing people enjoy my delicious craft cocktails while having a great time always puts a smile on my face. I love the positive feedback after every sip. My team and I specialize in offering an experience and atmosphere like no other. Book us and find out what all the talk is about!
              </p>
              <CertificationBadges compact className="mt-6" />
              <blockquote className="mt-6 text-lux-white/80 italic border-l-2 border-lux-pink/40 pl-4 max-w-xl">
                “I don’t just pour drinks — I curate the whole bar experience so you can be the host who actually gets to enjoy the party.”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {serviceGroups.map((group) => (
            <div
              key={group.title}
              className="lux-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-lux-pink" />
                </div>
                <h4 className="font-display text-lg text-lux-white">{group.title}</h4>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-full text-xs text-lux-white/90 bg-lux-white/5 border border-lux-white/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-20">
          {/* Left Column - Text */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="section-label">OUR SERVICES</span>
            <h2 
              ref={headlineRef}
              className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
              style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
            >
              A bar experience designed around <span className="text-lux-pink">your</span> guests.
            </h2>
            <p 
              ref={bodyRef}
              className="mt-8 text-lux-muted text-lg leading-relaxed max-w-lg"
            >
              We bring the full setup—chilled glassware, premium spirits, fresh garnishes, and a polished team—so you can host without lifting a glass.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.label}
                ref={el => { cardsRef.current[index] = el; }}
                className="lux-card group hover:border-lux-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(236,72,153,0.15)]"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center group-hover:from-lux-purple/30 group-hover:to-lux-pink/30 transition-all">
                    <pillar.icon className="w-7 h-7 text-lux-pink" />
                  </div>
                  <div>
                    <span className="section-label">{pillar.label}</span>
                    <h3 className="mt-2 font-display text-2xl text-lux-white font-medium">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-lux-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
