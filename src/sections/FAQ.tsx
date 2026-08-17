import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 2-3 months in advance for weekends, as they fill up quickly. For weekday events, 4-6 weeks notice is typically sufficient. Last-minute bookings may be accommodated depending on availability.',
  },
  {
    question: 'Do you provide the alcohol?',
    answer: 'No, due to North Carolina liquor laws, clients must purchase their own alcohol. However, I provide a detailed shopping list based on your guest count and menu selections, plus guidance on quantities and brands. I\'ll even recommend the best local liquor stores!',
  },
  {
    question: 'What areas do you serve?',
    answer: 'I serve the entire state of North Carolina including the Triangle (Raleigh, Durham, Chapel Hill), Winston‑Salem, Greensboro, Charlotte, Sanford, Mebane, Fayetteville, Wilmington, and surrounding areas. Travel fees may apply for locations outside the Triangle area.',
  },
  {
    question: 'What\'s included in your packages?',
    answer: 'All packages include: professional bartending service, bar setup and breakdown, custom cocktail menu, all bar tools and equipment, garnishes, ice, cups/glasses (upon request), and a polished presentation. The Signature and Full Experience packages include additional premium features.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely! I am fully licensed and carry comprehensive liability insurance. I can provide a certificate of insurance (COI) for your venue upon request. This is required by most wedding venues and event spaces.',
  },
  {
    question: 'Can you create custom signature cocktails?',
    answer: 'Yes! One of my specialties is creating custom signature cocktails that match your event theme, colors, or personal taste. During our consultation, we\'ll discuss your preferences and I\'ll craft something unique just for your event.',
  },
  {
    question: 'Do you offer non-alcoholic options?',
    answer: 'Definitely! I offer a full range of mocktails and non-alcoholic beverages. From elegant sparkling mocktails to creative zero-proof cocktails, all your guests will have delicious options to enjoy.',
  },
  {
    question: 'What\'s your cancellation policy?',
    answer: 'Deposits are non-refundable but can be transferred to a new date within 6 months if you need to reschedule. Cancellations within 30 days of the event forfeit the full payment. I understand life happens and work with clients when possible!',
  },
  {
    question: 'How do I book your services?',
    answer: 'Simply fill out the booking form on this website or call/text me at 984-385-4736. We\'ll schedule a consultation to discuss your event details, and once you\'re ready to move forward, a 50% deposit secures your date!',
  },
  {
    question: 'Can you accommodate large events?',
    answer: 'Yes! For events over 100 guests, I bring additional trained bartending staff to ensure prompt service. We\'ll discuss staffing needs during your consultation based on your guest count and event timeline.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;

    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headline,
        { y: '4vh', opacity: 0 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq"
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-55 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lux-pink/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lux-purple/10 border border-lux-purple/30 mb-6">
            <HelpCircle className="w-4 h-4 text-lux-purple" />
            <span className="text-lux-purple text-sm font-medium">Got Questions?</span>
          </div>
          <h2 
            className="font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Frequently Asked <span className="text-lux-pink">Questions</span>
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about booking Bubble & Fizz for your next event.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`lux-card overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-lux-pink/40' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-lg text-lux-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-lux-pink flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-lux-muted leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-lux-muted mb-4">Still have questions?</p>
          <a 
            href="tel:+19843854736"
            className="lux-button-primary inline-flex"
          >
            Call Mercedes at 984-385-4736
          </a>
        </div>
      </div>
    </section>
  );
}

