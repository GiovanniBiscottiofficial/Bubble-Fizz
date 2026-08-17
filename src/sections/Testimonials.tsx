import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Highly recommend!! Mercedes was incredibly professional and organized. She arrived on time, set up the bar beautifully, and kept everything running smoothly throughout the reception. She helped make our wedding day unforgettable!",
    author: 'Kristina P.',
    event: 'Wedding Reception',
    location: 'Reviewed Apr 5, 2025',
  },
  {
    quote: "I used Bubble & Fizz for my birthday and trusted her to use her creativity for some drinks to fit my 3 themed party atmosphere and the drinks were absolutely amazing!! Her professionalism is Top Notch!!",
    author: 'Tameika H.',
    event: 'Birthday Party',
    location: 'Reviewed Apr 5, 2025',
  },
  {
    quote: "We are so appreciative of Bubble and Fizz Mobile Bartending. We hired her at the last minute because me and my now husband completely forgot we needed one. She was flexible and communicated effectively. She was professional and my guests appreciated how relatable she was. I would hire her again!!",
    author: 'Aquiel R.',
    event: 'Wedding reception • 76-100 guests • Formal / elegant',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "We had such a great experience with bubble and fizz. The owner Mercedes is a ball of joy to work with she really enhances the vibes of the party she offered so many creative drinks and the whole set up was super cute and classy. The drinks gives what needs to be gave!",
    author: 'Tiondra b.',
    event: 'Wedding',
    location: 'Reviewed Aug 9, 2021',
  },
  {
    quote: "My wedding experience was amazing and I would definitely recommend the services. She is very knowledgeable and gave me very useful tips to prepare for my guests. She showed up on time, very neat table set up, and the drinks and Jell-O shots were delicious!",
    author: 'Tiara F.',
    event: 'Wedding',
    location: 'Reviewed Aug 12, 2021',
  },
  {
    quote: "I recently tapped B&F for a private celebration that I hosted for my daughter. She recently received a promotion and I wanted to let her know how proud we are of her. Needless to say B&F came through and held no punches. The event was beautiful. I couldn't have been more satisfied!",
    author: 'Danny C.',
    event: 'Private Celebration',
    location: 'Reviewed Aug 9, 2021',
  },
  {
    quote: "I invited Bubble and Fizz to my vendors event and every one loved the personality, the kindness and the quality of the drinks. I would recommend this business to anyone. I will be reaching out again!",
    author: 'Yolanda M.',
    event: "Vendor's Event",
    location: 'Reviewed Aug 12, 2021',
  },
  {
    quote: "It was a pleasure working with them. Needed waitstaff for my daughter's wedding. They came in and immediately started to work with the catering team to handle the needs of the guests. They worked through a few obstacles to make the event a success. I commend them for their adaptability, professionalism, work ethic and their enthusiastic personalities. Thank you again for everything! It is very much appreciated!!!",
    author: 'Swandya J.',
    event: 'Wedding • 201-300 guests • Waitstaff',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "Dope Bartender!!!! Her service was great thank you for making my wedding come true!!",
    author: 'Latrece G.',
    event: 'Wedding reception',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "Mercedes and Ray were very helpful and kept the party going so I could focus on my guests.",
    author: 'Andrea B.',
    event: 'Special event / party • Waitstaff',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "Drinks were excellent and really great. Would highly recommend to anyone with a gathering or party",
    author: 'Jason P.',
    event: 'Wedding reception • 76-100 guests • Upbeat / lively',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "This was my second time using her and every time was nothing but amazing my people enjoy how she interacted with them and how she was very attentive and sanitary and great service. I definitely would hire her again A+A+",
    author: 'Adrian W.',
    event: 'Repeat client',
    location: 'Reviewed Aug 12, 2021',
  },
  {
    quote: "Mercedes was absolutely amazing to work with! Can't wait to book her again for future events!",
    author: 'Nataleh H.',
    event: 'Cocktail party',
    location: 'Hired on Thumbtack',
  },
  {
    quote: "Stellar customer service. Extremely friendly, personable and professional. Delivers and exceeds expectations. Excellent quality product. Would highly recommend.",
    author: 'Gisselle C.',
    event: 'Event Bartending',
    location: 'Reviewed Aug 10, 2021',
  },
  {
    quote: "Was a wonderful experience both times we booked we can't wait to continue business in the future",
    author: 'Josh B.',
    event: 'Repeat client',
    location: 'Reviewed Aug 9, 2021',
  },
  {
    quote: "It was absolutely wonderful!!!",
    author: 'Janeen M.',
    event: 'Birthday party • Club scene',
    location: 'Hired on Thumbtack',
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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.3,
          }
        }
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: `top ${75 - index * 3}%`,
              end: `top ${50 - index * 3}%`,
              scrub: 0.3,
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
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 z-60 bg-lux-black"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
              <blockquote className="text-base text-lux-white leading-relaxed mb-6">
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

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lux-muted mb-4">Ready to be the next happy host?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="lux-button-primary"
          >
            Book Your Event
          </button>
        </div>
      </div>
    </section>
  );
}
