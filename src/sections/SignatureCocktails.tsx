import { ArrowRight, ExternalLink } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const cocktails = [
  {
    name: 'The Rosé Royale',
    description: 'Sparkling rosé, berry reduction, gold leaf.',
  },
  {
    name: 'Purple Reign',
    description: 'Empress gin, lemon, lavender syrup.',
  },
  {
    name: 'Shimmer Elixir',
    description: 'Vodka, edible shimmer, citrus, sparkling topper.',
  },
];

export default function SignatureCocktails() {
  const scrollToMenu = () => {
    document.getElementById('drink-menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="signature-cocktails"
      className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 z-30 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-lux-pink/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="/cocktail_closeup.jpg"
          alt="Signature cocktail"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lux-purple/50 via-lux-black/60 to-lux-pink/30" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Headline */}
          <div>
            <span className="section-label">OUR MENU</span>
            <h2
              className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
              style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}
            >
              Signature <span className="text-lux-pink">cocktails</span>.
            </h2>
            <p className="mt-6 text-lux-muted text-lg md:text-xl leading-relaxed max-w-md">
              Seasonal recipes, premium spirits, and presentation that sparks conversation.
            </p>
          </div>

          {/* Right - Menu Card */}
          <div className="justify-self-center lg:justify-self-end">
            <div
              className="w-full max-w-md rounded-3xl p-8 md:p-10 border border-lux-purple/30"
              style={{
                background: 'linear-gradient(145deg, rgba(18,18,26,0.9) 0%, rgba(11,11,13,0.95) 100%)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="section-label">Tasting Menu</span>

              <div className="mt-8 space-y-6">
                {cocktails.map((cocktail) => (
                  <div key={cocktail.name} className="border-b border-lux-purple/20 pb-4 last:border-0">
                    <h4 className="font-display text-xl text-lux-white font-medium">
                      {cocktail.name}
                    </h4>
                    <p className="mt-1 text-lux-muted text-sm">
                      {cocktail.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToMenu}
                className="mt-8 w-full py-4 px-6 rounded-xl bg-gradient-to-r from-lux-purple to-lux-pink text-white font-medium hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                View Full Menu
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://www.thumbtack.com/nc/mebane/bartenders/bubble-fizz-mobile-bartending/service/296554191838363813"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 px-6 rounded-xl border border-lux-pink/30 text-lux-white text-sm font-medium hover:border-lux-pink/60 transition-all flex items-center justify-center gap-2 group"
              >
                <ExternalLink className="w-4 h-4" />
                Book on Thumbtack
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
