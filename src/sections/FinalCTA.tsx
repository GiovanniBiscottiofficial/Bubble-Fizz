import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Shield } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from '@/components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;

     if (!section || !content || !bg) return;

    const ctx = gsap.context(() => {
      // On mobile, skip pinning — use simple entrance animation
      if (isMobile) {
        gsap.fromTo(bg,
          { scale: 1.08, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
        );
        const elements = content.querySelectorAll('.animate-in');
        gsap.fromTo(elements,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: 0.5 } }
        );
        return;
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(bg,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      const elements = content.querySelectorAll('.animate-in');
      scrollTl.fromTo(elements,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' },
        0
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(content,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(bg,
        { scale: 1, y: 0 },
        { scale: 1.05, y: '-6vh', ease: 'none' },
        0.7
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
      className="relative w-full h-screen overflow-hidden z-80"
    >
      {/* Background Image - MERCEDES NEW PHOTO */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <OptimizedImage 
          src="/mercedes_new_2.jpg" 
          alt="Mercedes Pettiford crafting cocktails"
          className="w-full h-full object-cover"
        />
        {/* Purple/Pink gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-lux-purple/40 via-lux-black/50 to-lux-pink/20" />
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette-overlay" />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-black/40 to-lux-black/60" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Logo - MUCH BIGGER */}
        <div className="animate-in mb-6">
          <OptimizedImage 
            src="/logo.png" 
            alt="Bubble & Fizz Logo"
            className="h-32 md:h-44 lg:h-52 w-auto drop-shadow-[0_0_40px_rgba(236,72,153,0.6)]"
          />
        </div>

        <p className="animate-in text-gradient-purple font-label text-sm md:text-base uppercase tracking-[0.25em] mb-6">
          BOOK US FOR ANY AND ALL EVENTS
        </p>

        <h2 
          className="animate-in font-display text-lux-white font-semibold leading-[0.95]"
          style={{ fontSize: 'clamp(36px, 4.5vw, 68px)' }}
        >
          Ready to raise the <span className="text-lux-pink">bar</span>?
        </h2>
        
        <p className="animate-in mt-6 md:mt-8 text-lux-muted text-base md:text-xl max-w-xl leading-relaxed">
          Let's design a pour list that fits your celebration.
        </p>

        <div className="animate-in mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={scrollToContact}
            className="lux-button-primary"
          >
            Book Your Event
          </button>
          <a 
            href="tel:+19843854736"
            className="lux-button-outline"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Mercedes
          </a>
        </div>

        {/* Contact Info */}
        <div className="animate-in mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-lux-muted/80 text-sm">
          <a href="tel:+19843854736" className="flex items-center gap-2 hover:text-lux-pink transition-colors">
            <Phone className="w-4 h-4" />
            <span>984-385-4736</span>
          </a>
          <a href="mailto:bubble_fizzbar@yahoo.com" className="flex items-center gap-2 hover:text-lux-purple transition-colors">
            <Mail className="w-4 h-4" />
            <span>bubble_fizzbar@yahoo.com</span>
          </a>
        </div>

        <p className="animate-in mt-6 text-lux-muted/60 text-xs flex items-center gap-2">
          <Shield className="w-3 h-3 text-lux-pink" />
          Licensed & Insured • Mercedes Pettiford, Professional Mixologist
        </p>
      </div>
    </section>
  );
}

