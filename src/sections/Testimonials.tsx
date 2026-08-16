import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Mercedes made our wedding day absolutely perfect! The champagne tower was stunning and the cocktails were delicious. Our guests are still talking about it!",
    author: 'Tasha & Marcus',
    event: 'Wedding Reception',
    location: 'Raleigh, NC',
  },
  {
    quote: "Professional, punctual, and poured the best drinks! Bubble & Fizz elevated our corporate event to the next level. Highly recommend!",
    author: 'Darnell J.',
    event: 'Corporate Event',
    location: 'Durham, NC',
  },
  {
    quote: "My 40th birthday party was legendary thanks to Mercedes! The signature cocktail she created just for me was everything. Book her now!",
    author: 'Keisha M.',
    event: 'Birthday Celebration',
    location: 'Charlotte, NC',
  },
  {
    quote: "We hired Bubble & Fizz for our company holiday party and it was the best decision! Mercedes brought such positive energy and the drinks were top-notch.",
    author: 'Jennifer & Team',
    event: 'Holiday Party',
    location: 'Greensboro, NC',
  },
  {
    quote: "As a wedding planner, I've worked with many bartenders. Mercedes is hands down the best - professional, creative, and always goes above and beyond!",
    author: 'Michelle R.',
    event: 'Wedding Planner',
    location: 'Chapel Hill, NC',
  },
  {
    quote: "Our anniversary celebration was magical. The custom cocktail menu, the presentation, everything was perfect. Thank you Mercedes!",
    author: 'Robert & Lisa',
    event: 'Anniversary Party',
    location: 'Winston-Salem, NC',
  },
  {
    quote: "Mercedes brought the party to life! Our graduation celebration was unforgettable. She knows how to read a crowd and keep everyone happy.",
    author: 'The Johnson Family',
    event: 'Graduation Party',
    location: 'Fayetteville, NC',
  },
  {
    quote: "From the first consultation to the last pour, Mercedes was amazing. Our bridal shower was elegant and fun. Everyone loved the mimosa bar!",
    author: 'Ashley & Bridesmaids',
    event: 'Bridal Shower',
    location: 'Cary, NC',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !headline || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { x: '-6vw', opacity: 0 },
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

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${75 - index * 3}%`,
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
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-60 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <span className="section-label">TESTIMONIALS</span>
          <h2 
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Kind <span className="text-lux-pink">words</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Hosts remember the atmosphere. Guests remember the pour. Here's what our clients across North Carolina have to say about working with <span className="text-lux-purple font-medium">Bubble & Fizz</span>.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              ref={el => { cardsRef.current[index] = el; }}
              className="lux-card relative overflow-hidden group hover:border-lux-pink/40 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(236,72,153,0.1)]"
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lux-purple via-lux-pink to-lux-gold" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-lux-pink text-lux-pink" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-lg text-lux-white leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-lux-purple/20">
                <p className="text-lux-white font-medium">{testimonial.author}</p>
                <p className="text-lux-pink text-sm">{testimonial.event}</p>
                <p className="text-lux-muted/70 text-xs mt-1">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-lux-muted">
            <div className="w-10 h-10 rounded-full bg-lux-purple/20 flex items-center justify-center">
              <span className="text-lux-purple font-bold text-lg">50+</span>
            </div>
            <span className="text-sm">Events Served</span>
          </div>
          <div className="flex items-center gap-2 text-lux-muted">
            <div className="w-10 h-10 rounded-full bg-lux-pink/20 flex items-center justify-center">
              <span className="text-lux-pink font-bold text-lg">5★</span>
            </div>
            <span className="text-sm">Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-lux-muted">
            <div className="w-10 h-10 rounded-full bg-lux-gold/20 flex items-center justify-center">
              <span className="text-lux-gold font-bold text-lg">NC</span>
            </div>
            <span className="text-sm">Statewide Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
