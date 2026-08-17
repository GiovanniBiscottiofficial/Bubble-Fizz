import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const moments = [
  {
    src: '/gallery_event_1.webp',
    alt: 'Real wedding reception bar by Bubble & Fizz',
    quote: "Highly recommend!! Mercedes was incredibly professional and organized. She arrived on time, set up the bar beautifully, and kept everything running smoothly throughout the reception. She helped make our wedding day unforgettable!",
    author: 'Kristina P.',
    event: 'Wedding Reception',
  },
  {
    src: '/thumbtack_1366_3.webp',
    alt: 'Themed party cocktail',
    quote: "I used Bubble & Fizz for my birthday and trusted her to use her creativity for some drinks to fit my 3 themed party atmosphere and the drinks were absolutely amazing!!",
    author: 'Tameika H.',
    event: 'Birthday Party',
  },
  {
    src: '/thumbtack_Screenshot_2026-08-16_223321.webp',
    alt: 'Elegant wedding bar setup',
    quote: "We are so appreciative of Bubble and Fizz Mobile Bartending. We hired her at the last minute and she was flexible, professional, and my guests appreciated how relatable she was.",
    author: 'Aquiel R.',
    event: 'Wedding reception • 76-100 guests',
  },
  {
    src: '/thumbtack_1366_2.webp',
    alt: 'Cigar bar cart',
    quote: "I recently tapped B&F for a private celebration. Needless to say B&F came through and held no punches. The event was beautiful. I couldn't have been more satisfied!",
    author: 'Danny C.',
    event: 'Private Celebration',
  },
  {
    src: '/thumbtack_1366_1.webp',
    alt: 'Non-alcoholic beverage station',
    quote: "I invited Bubble and Fizz to my vendors event and everyone loved the personality, the kindness and the quality of the drinks. I will be reaching out again!",
    author: 'Yolanda M.',
    event: "Vendor's Event",
  },
  {
    src: '/thumbtack_320_3.webp',
    alt: 'Signature frozen cocktails',
    quote: "My wedding experience was amazing. She is very knowledgeable and gave me useful tips to prepare for my guests. The drinks and Jell-O shots were delicious!",
    author: 'Tiara F.',
    event: 'Wedding',
  },
  {
    src: '/thumbtack_320_2.webp',
    alt: 'Strawberry craft cocktail',
    quote: "Dope Bartender!!!! Her service was great thank you for making my wedding come true!!",
    author: 'Latrece G.',
    event: 'Wedding reception',
  },
  {
    src: '/thumbtack_320_1.webp',
    alt: 'Blue craft cocktail',
    quote: "Drinks were excellent and really great. Would highly recommend to anyone with a gathering or party.",
    author: 'Jason P.',
    event: 'Wedding reception • 76-100 guests',
  },
  {
    src: '/thumbtack_320.webp',
    alt: 'Layered signature cocktail',
    quote: "Mercedes was absolutely amazing to work with! Can't wait to book her again for future events!",
    author: 'Nataleh H.',
    event: 'Cocktail party',
  },
];

export default function ThumbtackMoments() {
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
        { y: 40, opacity: 0 },
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${75 - index * 4}%`,
              end: `top ${50 - index * 4}%`,
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
      id="thumbtack-moments"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 z-65 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-lux-pink/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div ref={headlineRef} className="text-center mb-16">
          <span className="section-label">REAL THUMBTACK MOMENTS</span>
          <h2
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Proof in the <span className="text-lux-pink">pour</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Every photo is from an actual Bubble & Fizz event, paired with the guest review that goes with it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => (
            <div
              key={moment.src}
              ref={el => { cardsRef.current[index] = el; }}
              className="lux-card overflow-hidden group hover:border-lux-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(236,72,153,0.1)]"
            >
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage
                  src={moment.src}
                  alt={moment.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lux-black via-lux-black/20 to-transparent" />
              </div>

              <div className="p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-lux-pink text-lux-pink" />
                  ))}
                </div>
                <blockquote className="text-lux-white/90 text-sm leading-relaxed mb-4">
                  "{moment.quote}"
                </blockquote>
                <p className="text-lux-white font-medium text-sm">{moment.author}</p>
                <p className="text-lux-pink text-xs">{moment.event}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lux-muted mb-4">Want your event to look like this?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="lux-button-primary"
          >
            Book Your Bubble & Fizz Experience
          </button>
        </div>
      </div>
    </section>
  );
}
