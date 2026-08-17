import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Car, Plane, Clock, Home, Phone, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceAreas: { name: string; distance: string; icon: LucideIcon }[] = [
  { name: 'Raleigh', distance: 'Home Base', icon: Home },
  { name: 'Durham', distance: '15 min', icon: Car },
  { name: 'Chapel Hill', distance: '25 min', icon: Car },
  { name: 'Cary', distance: '20 min', icon: Car },
  { name: 'Charlotte', distance: '2.5 hrs', icon: Car },
  { name: 'Greensboro', distance: '1 hr', icon: Car },
  { name: 'Winston-Salem', distance: '1.5 hrs', icon: Car },
  { name: 'Fayetteville', distance: '1 hr', icon: Car },
  { name: 'Wilmington', distance: '2 hrs', icon: Car },
  { name: 'Asheville', distance: '3.5 hrs', icon: Plane },
  { name: 'Outer Banks', distance: '3 hrs', icon: Car },
  { name: 'And Beyond!', distance: 'Let\'s Talk', icon: Phone },
];

export default function ServiceAreas() {
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
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${70 - index * 2}%`,
              end: `top ${50 - index * 2}%`,
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
      id="areas"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-54 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lux-pink/10 border border-lux-pink/30 mb-6">
            <MapPin className="w-4 h-4 text-lux-pink" />
            <span className="text-lux-pink text-sm font-medium">Service Areas</span>
          </div>
          <h2 
            className="font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Serving All of <span className="text-gradient-purple">North Carolina</span>
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Based in Raleigh, I bring the Bubble & Fizz experience to events across the entire state. No event is too far!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="lux-card text-center py-8">
            <Car className="w-8 h-8 text-lux-pink mx-auto mb-3" />
            <p className="font-display text-3xl text-lux-white">50+</p>
            <p className="text-lux-muted text-sm">Mile Radius</p>
          </div>
          <div className="lux-card text-center py-8">
            <Clock className="w-8 h-8 text-lux-purple mx-auto mb-3" />
            <p className="font-display text-3xl text-lux-white">12</p>
            <p className="text-lux-muted text-sm">Major Cities</p>
          </div>
          <div className="lux-card text-center py-8">
            <Plane className="w-8 h-8 text-lux-gold mx-auto mb-3" />
            <p className="font-display text-3xl text-lux-white">NC</p>
            <p className="text-lux-muted text-sm">Statewide</p>
          </div>
          <div className="lux-card text-center py-8">
            <MapPin className="w-8 h-8 text-lux-pink mx-auto mb-3" />
            <p className="font-display text-3xl text-lux-white">100%</p>
            <p className="text-lux-muted text-sm">Mobile Service</p>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {serviceAreas.map((area, index) => (
            <div
              key={area.name}
              ref={el => { cardsRef.current[index] = el; }}
              className="lux-card group hover:border-lux-pink/40 transition-all duration-300 hover:-translate-y-1 text-center py-6"
            >
              <area.icon className="w-8 h-8 mx-auto mb-3 text-lux-gold group-hover:text-lux-pink transition-colors" />
              <h3 className="font-display text-xl text-lux-white group-hover:text-lux-pink transition-colors">
                {area.name}
              </h3>
              <p className="text-lux-muted text-sm mt-1">{area.distance}</p>
            </div>
          ))}
        </div>

        {/* Travel Note */}
        <div className="mt-12 lux-card text-center">
          <p className="text-lux-muted">
            <span className="text-lux-pink font-medium">Travel fees</span> may apply for locations outside the Triangle area. 
            Contact me for a custom quote for your location!
          </p>
        </div>
      </div>
    </section>
  );
}
