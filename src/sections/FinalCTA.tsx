import { Phone, Mail } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import Logo from '@/components/Logo';
import { buildInquiryMailto } from '@/lib/utils';

export default function FinalCTA() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full min-h-[80vh] py-24 md:py-32 px-6 md:px-12 lg:px-20 flex items-center justify-center z-80 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/mercedes_new_2.jpg"
          alt="Mercedes Pettiford crafting cocktails"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lux-purple/40 via-lux-black/50 to-lux-pink/20" />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-lux-black/80 via-lux-black/40 to-lux-black/60" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="mb-6">
          <Logo className="h-28 w-28 md:h-40 md:w-40 lg:h-48 lg:w-48 logo-dramatic" priority />
        </div>

        <p className="text-gradient-purple font-label text-sm md:text-base uppercase tracking-[0.25em] mb-6">
          BOOK US FOR ANY AND ALL EVENTS
        </p>

        <h2
          className="font-display text-lux-white font-semibold leading-[0.95]"
          style={{ fontSize: 'clamp(36px, 4.5vw, 68px)' }}
        >
          Ready to raise the <span className="text-lux-pink">bar</span>?
        </h2>

        <p className="mt-6 md:mt-8 text-lux-muted text-base md:text-xl max-w-xl leading-relaxed">
          Let's design a pour list that fits your event.
        </p>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4">
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

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-lux-muted/80 text-sm">
          <a href="tel:+19843854736" className="flex items-center gap-2 hover:text-lux-pink transition-colors">
            <Phone className="w-4 h-4" />
            <span>984-385-4736</span>
          </a>
          <a href={buildInquiryMailto()} className="flex items-center gap-2 hover:text-lux-purple transition-colors">
            <Mail className="w-4 h-4" />
            <span>bubble_fizzbar@yahoo.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
