import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const galleryPeople = [
  { src: '/mercedes_new_1.jpg', alt: 'Mercedes pouring champagne' },
  { src: '/mercedes_new_5.jpg', alt: 'Mercedes with pink cocktail' },
  { src: '/mercedes_new_2.jpg', alt: 'Mercedes garnishing cocktail' },
];

const gallerySetups = [
  { src: '/gallery_2.jpg', alt: 'Champagne tower' },
  { src: '/gallery_1.jpg', alt: 'Elegant bar setup' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const grid = gridRef.current;

    if (!section || !headline || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headline,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 60%', scrub: 0.5 }
        }
      );

      const tiles = grid.querySelectorAll('.gallery-tile');
      gsap.fromTo(tiles,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: grid, start: 'top 85%', end: 'top 50%', scrub: 0.5 }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 z-50 bg-lux-black"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lux-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div ref={headlineRef} className="text-center mb-12">
          <span className="section-label">GALLERY</span>
          <h2
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            A few moments we've <span className="text-lux-pink">poured</span>.
          </h2>
        </div>

        <div ref={gridRef} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPeople.map((image) => (
              <div
                key={image.src}
                className="gallery-tile relative overflow-hidden rounded-2xl border border-lux-purple/10 group hover:border-lux-pink/30 transition-all duration-500 aspect-[4/5] last:sm:col-span-2 last:md:col-span-1"
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-lux-purple/30 via-lux-pink/10 to-lux-gold/5 mix-blend-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-lux-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gallerySetups.map((image) => (
              <div
                key={image.src}
                className="gallery-tile relative overflow-hidden rounded-2xl border border-lux-purple/10 group hover:border-lux-pink/30 transition-all duration-500 aspect-[16/9]"
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-lux-purple/30 via-lux-pink/10 to-lux-gold/5 mix-blend-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-lux-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
