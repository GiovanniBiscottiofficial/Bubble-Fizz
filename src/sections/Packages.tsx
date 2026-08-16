import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Essential Hour',
    price: '$250',
    description: 'Perfect for intimate gatherings',
    features: [
      '2-hour professional service',
      'Classic cocktail menu',
      'Bar setup & breakdown',
      'Licensed + insured',
    ],
    cta: 'Book This Package',
    highlighted: false,
  },
  {
    name: 'Signature Celebration',
    price: '$450',
    description: 'Our most popular choice',
    features: [
      '4-hour professional service',
      'Custom signature drink',
      'Champagne toast add-on',
      'Styled garnishes',
    ],
    cta: 'Book This Package',
    highlighted: true,
  },
  {
    name: 'Full Experience',
    price: '$850',
    description: 'The ultimate luxury package',
    features: [
      'Up to 6 hours of service',
      'Bespoke menu + signage',
      'Champagne tower option',
      'Dedicated lead bartender',
    ],
    cta: 'Book This Package',
    highlighted: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${70 - index * 3}%`,
              end: `top ${45 - index * 3}%`,
              scrub: 0.5,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const handleBookPackage = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="packages"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-70 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Headline */}
        <div className="text-center mb-16">
          <span className="section-label">INVESTMENT</span>
          <h2 
            ref={headlineRef}
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Packages & <span className="text-lux-pink">Pricing</span>
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Every package includes professional, licensed & insured service from <span className="text-lux-purple font-medium">Mercedes Pettiford</span>.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              ref={el => { cardsRef.current[index] = el; }}
              className={`lux-card flex flex-col h-full transition-all duration-500 hover:-translate-y-2 ${
                pkg.highlighted 
                  ? 'border-lux-pink/50 shadow-[0_0_40px_rgba(236,72,153,0.2)]' 
                  : 'hover:border-lux-purple/30'
              }`}
            >
              {/* Package Name */}
              <h3 className="font-display text-2xl text-lux-white font-medium">
                {pkg.name}
              </h3>
              
              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl text-gradient-purple font-semibold">
                  {pkg.price}
                </span>
                <span className="text-lux-muted text-sm">starting at</span>
              </div>

              <p className="mt-2 text-lux-muted text-sm">
                {pkg.description}
              </p>

              {/* Features */}
              <ul className="mt-8 space-y-4 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-logo flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-lux-white/90">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button 
                onClick={handleBookPackage}
                className={`mt-8 w-full lux-button group ${
                  pkg.highlighted ? 'lux-button-primary' : 'lux-button-outline'
                }`}
              >
                {pkg.cta}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-lux-muted text-sm">
            All packages include travel within 50 miles of Raleigh, NC. Custom quotes available for larger events.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a 
              href="tel:+19843854736"
              className="inline-flex items-center gap-2 text-lux-pink hover:text-lux-purple transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call 984-385-4736</span>
            </a>
            <a 
              href="mailto:bubble_fizzbar@yahoo.com?subject=Booking Inquiry"
              className="inline-flex items-center gap-2 text-lux-purple hover:text-lux-pink transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email Mercedes</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

