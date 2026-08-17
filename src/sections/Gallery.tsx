import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/mercedes_new_1.jpg', alt: 'Mercedes pouring champagne', position: 'col-span-2 row-span-2' },
  { src: '/gallery_2.jpg', alt: 'Champagne tower', position: 'col-span-2 row-span-2' },
  { src: '/mercedes_new_5.jpg', alt: 'Mercedes with pink cocktail', position: 'col-span-1 row-span-2' },
  { src: '/mercedes_new_3.jpg', alt: 'Mercedes at luxury bar', position: 'col-span-2 row-span-1' },
  { src: '/mercedes_new_4.jpg', alt: 'Mercedes shaking cocktail', position: 'col-span-1 row-span-1' },
  { src: '/gallery_event_1.webp', alt: 'Real wedding reception bar by Bubble & Fizz', position: 'col-span-1 row-span-1' },
  { src: '/gallery_1.jpg', alt: 'Elegant bar setup', position: 'col-span-1 row-span-1' },
  { src: '/mercedes_new_2.jpg', alt: 'Mercedes garnishing cocktail', position: 'col-span-2 row-span-1' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    const mosaic = mosaicRef.current;
    const tiles = tilesRef.current.filter(Boolean);
    const caption = captionRef.current;

     if (!section || !mosaic || !caption) return;

    const ctx = gsap.context(() => {
      // On mobile, skip pinning — use simple staggered entrance animations
      if (isMobile) {
        const tiles = tilesRef.current.filter(Boolean);
        gsap.fromTo(caption,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 60%', scrub: 0.5 } }
        );
        gsap.fromTo(tiles,
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.06,
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 40%', scrub: 0.5 } }
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
      const tileAnimations = [
        { x: '-25vw', y: 0, from: 0, to: 0.06 },
        { x: 0, y: '-30vh', from: 0, to: 0.08 },
        { x: '25vw', y: 0, from: 0, to: 0.06 },
        { x: '-15vw', y: '20vh', from: 0.04, to: 0.12 },
        { x: 0, y: '20vh', from: 0.06, to: 0.14 },
        { x: '15vw', y: '20vh', from: 0.04, to: 0.12 },
        { x: '-20vw', y: '15vh', from: 0.08, to: 0.16 },
        { x: '20vw', y: '15vh', from: 0.10, to: 0.18 },
      ];

      tiles.forEach((tile, index) => {
        const anim = tileAnimations[index] || { x: 0, y: '20vh', from: 0.08, to: 0.16 };
        scrollTl.fromTo(tile,
          { x: anim.x, y: anim.y, opacity: 0, scale: 0.98 },
          { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out' },
          anim.from
        );
      });

      // Caption entrance
      scrollTl.fromTo(caption,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.15
      );

      // EXIT (55% - 95%)
      scrollTl.fromTo(mosaic,
        { y: 0, opacity: 1 },
        { y: '-5vh', opacity: 0, ease: 'power2.in' },
        0.55
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="gallery"
      className="relative w-full h-screen overflow-hidden z-50 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-lux-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lux-purple/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Mosaic Grid */}
      <div 
        ref={mosaicRef}
        className="absolute inset-0 p-3 md:p-4"
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-2 md:gap-3 h-full">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              ref={el => { tilesRef.current[index] = el; }}
              className={`relative overflow-hidden rounded-xl md:rounded-2xl border border-lux-purple/10 hover:border-lux-pink/30 transition-all duration-500 ${image.position}`}
            >
              <OptimizedImage 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-lux-purple/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Caption & CTA */}
      <div 
        ref={captionRef}
        className="absolute bottom-6 left-6 z-10"
      >
        <p className="text-lux-white/90 font-display text-lg md:text-xl drop-shadow-lg">
          A few moments we've <span className="text-lux-pink">poured</span>.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <button 
          onClick={scrollToContact}
          className="lux-button-outline bg-lux-black/70 backdrop-blur-sm group text-xs md:text-sm py-2 px-4 md:py-3 md:px-6"
        >
          Book Your Event
          <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
