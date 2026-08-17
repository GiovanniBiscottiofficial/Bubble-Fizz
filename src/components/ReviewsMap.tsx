import { Star, MapPin, MessageSquare, ExternalLink } from 'lucide-react';

// Replace this with your actual Google Business Profile link or Place ID to get a branded map + live reviews.
// To find it: Google your business → click "Reviews" → copy the URL, or use https://pleper.com/gmb/place-id/ to get the Place ID.
const GOOGLE_BUSINESS_PROFILE_URL = '';

const featuredReviews = [
  {
    quote:
      "Mercedes made our wedding day absolutely perfect! The champagne tower was stunning and the cocktails were delicious.",
    author: 'Tasha & Marcus',
    location: 'Raleigh, NC',
  },
  {
    quote:
      "Professional, punctual, and poured the best drinks! Bubble & Fizz elevated our corporate event to the next level.",
    author: 'Darnell J.',
    location: 'Durham, NC',
  },
  {
    quote:
      "My 40th birthday party was legendary thanks to Mercedes! Book her now!",
    author: 'Keisha M.',
    location: 'Charlotte, NC',
  },
];

export default function ReviewsMap() {
  const reviewUrl =
    GOOGLE_BUSINESS_PROFILE_URL ||
    'https://www.google.com/search?q=Bubble+%26+Fizz+Mobile+Bartending+Raleigh+NC';

  return (
    <section
      id="reviews"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-lux-black z-50"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="section-label">REVIEWS & LOCATION</span>
          <h2
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Loved across <span className="text-lux-pink">North Carolina</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Real words from real hosts. See why Bubble & Fizz is the go-to mobile bar for weddings, parties, and corporate events.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Reviews column */}
          <div className="space-y-6">
            {featuredReviews.map((review) => (
              <div
                key={review.author}
                className="lux-card relative overflow-hidden group hover:border-lux-pink/40 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lux-purple via-lux-pink to-lux-gold" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lux-pink text-lux-pink" />
                  ))}
                </div>
                <blockquote className="font-display text-lg text-lux-white leading-relaxed mb-6">
                  “{review.quote}”
                </blockquote>
                <div className="pt-4 border-t border-lux-purple/20 flex items-center justify-between">
                  <div>
                    <p className="text-lux-white font-medium">{review.author}</p>
                    <p className="text-lux-muted/70 text-sm">{review.location}</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-lux-pink/50" />
                </div>
              </div>
            ))}

            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-button-outline w-full justify-center group"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {GOOGLE_BUSINESS_PROFILE_URL ? 'Read more Google reviews' : 'Find us on Google'}
            </a>
          </div>

          {/* Map column */}
          <div className="lux-card p-2 md:p-3 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 px-2 pt-1">
              <MapPin className="w-5 h-5 text-lux-pink" />
              <div>
                <h3 className="font-display text-lux-white text-lg">Raleigh, NC</h3>
                <p className="text-lux-muted text-sm">Mobile bartending across NC & surrounding states</p>
              </div>
            </div>

            <div className="relative flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-lux-purple/10">
              <iframe
                title="Bubble & Fizz service area map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-79.15%2C35.45%2C-78.15%2C36.05&layer=mapnik&marker=35.7796%2C-78.6382"
                className="absolute inset-0 w-full h-full border-0"
                style={{
                  filter: 'grayscale(100%) invert(92%) hue-rotate(180deg) brightness(0.85) contrast(1.1)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lux-button-primary w-full justify-center mt-4"
            >
              {GOOGLE_BUSINESS_PROFILE_URL ? 'Leave a Google review' : 'Find us on Google'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
