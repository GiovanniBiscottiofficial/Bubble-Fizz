import { Star, MapPin, Phone } from 'lucide-react';

const regions = [
  'Raleigh / Triangle',
  'Durham / Chapel Hill',
  'Cary / Apex / Morrisville',
  'Greensboro / Winston-Salem',
  'Sanford / Mebane',
  'Charlotte / surrounding areas',
  'Surrounding states upon request',
];

export default function ReviewsMap() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-lux-black z-50"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="section-label">WHERE WE POUR</span>
          <h2
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Bubbles across <span className="text-lux-pink">North Carolina</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Based in the Triangle, traveling to the Triad, Sandhills, and beyond for weddings, private parties, corporate events, and pop-up bars.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Service area summary */}
          <div className="lux-card flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-lux-pink" />
              </div>
              <div>
                <h3 className="font-display text-lux-white text-xl">Service Area</h3>
                <p className="text-lux-muted text-sm">Mobile bartending, delivered</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {regions.map((region) => (
                <div
                  key={region}
                  className="flex items-center gap-3 p-3 rounded-xl bg-lux-blacklift border border-lux-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-lux-pink" />
                  <span className="text-lux-white/90 text-sm">{region}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToContact} className="lux-button-primary flex-1 justify-center">
                <Phone className="w-4 h-4 mr-2" />
                Request a quote
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-lux-white/10 flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-lux-pink text-lux-pink" />
                ))}
              </div>
              <p className="text-lux-muted text-sm">
                <span className="text-lux-white font-medium">5.0</span> average from Thumbtack clients
              </p>
            </div>
          </div>

          {/* Map column */}
          <div className="lux-card p-2 md:p-3 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 px-2 pt-1">
              <MapPin className="w-5 h-5 text-lux-pink" />
              <div>
                <h3 className="font-display text-lux-white text-lg">North Carolina</h3>
                <p className="text-lux-muted text-sm">Travel fees may apply outside the Triangle</p>
              </div>
            </div>

            <div className="relative flex-1 min-h-[420px] rounded-2xl overflow-hidden border border-lux-purple/10">
              <iframe
                title="Bubble & Fizz service area map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-82.0%2C34.0%2C-76.0%2C36.6&layer=mapnik"
                className="absolute inset-0 w-full h-full border-0"
                style={{
                  filter: 'grayscale(100%) invert(0.92) sepia(0.6) hue-rotate(260deg) saturate(1.2) brightness(0.75) contrast(1.15)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Brand-colored overlay */}
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-br from-lux-purple/30 via-lux-pink/20 to-lux-gold/10 mix-blend-overlay"
                aria-hidden="true"
              />
              {/* Custom marker — Raleigh / Triangle home base */}
              <div
                className="absolute pointer-events-none"
                style={{ top: '32%', left: '56%', transform: 'translate(-50%, -100%)' }}
                aria-hidden="true"
              >
                <MapPin className="w-8 h-8 text-lux-pink fill-lux-pink/30 drop-shadow-[0_0_16px_rgba(236,72,153,0.9)]" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lux-pink animate-ping" />
              </div>
              {/* Interaction blocker so the map stays focused on NC */}
              <div
                className="absolute inset-0 pointer-events-auto"
                aria-hidden="true"
              />
            </div>

            <p className="px-2 pt-3 text-lux-muted/70 text-xs text-center">
              Map centered on central North Carolina. Statewide and surrounding-state travel available upon request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
