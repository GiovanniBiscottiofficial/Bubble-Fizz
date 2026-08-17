import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'Weekends and wedding season dates fill up 2-3 months in advance, so book as early as possible. Weekday and off-peak events can usually be booked with 4-6 weeks notice. I do accept last-minute requests when my calendar allows, so it never hurts to ask.',
  },
  {
    question: 'Do you provide the alcohol?',
    answer: 'North Carolina law requires clients to purchase their own alcohol. I make this easy by providing a detailed shopping list based on your guest count, menu choices, and event duration, plus guidance on the best brands and quantities. I handle everything else — bar tools, garnishes, mixers, ice, and professional service.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'I serve the entire state of North Carolina. Most of my events are in the Triangle (Raleigh, Durham, Chapel Hill), Greensboro, Winston-Salem, Charlotte, Sanford, Mebane, Fayetteville, Wilmington, and everywhere in between. Travel fees may apply for events outside the Triangle area.',
  },
  {
    question: "What's included in your packages?",
    answer: 'Every package includes a professional bartender, custom cocktail menu, full bar setup and breakdown, bar tools, garnishes, ice, and disposable cups. The Signature Celebration adds upgraded presentation and signature drinks, while the Full Experience includes the most personalized service, premium styling, and event support details. I am happy to build a custom package if none of the standard options are a perfect fit.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes. I carry comprehensive general liability insurance and can provide a Certificate of Insurance (COI) for your venue upon request. I am also TIPS and ServSafe certified, background checked, and trained in responsible alcohol service.',
  },
  {
    question: 'Can you create custom signature cocktails?',
    answer: 'Absolutely. Signature cocktails are one of my favorite parts of the job. I create drinks to match your theme, colors, event vibe, or personal taste. From shimmer cocktails and dry-ice mocktails to elegant champagne toppers, I will design something unique for your celebration.',
  },
  {
    question: 'Do you offer non-alcoholic options?',
    answer: 'Yes. I offer a full range of mocktails, zero-proof cocktails, sparkling refreshments, and dry-ice mocktails so every guest has a beautiful, delicious option. Non-alcoholic drinks can be styled just as elegantly as the cocktail menu.',
  },
  {
    question: 'What types of events do you work?',
    answer: 'I bartend weddings, birthday parties, corporate events, fundraisers, holiday parties, bachelor and bachelorette parties, sporting events, private dinners, pop-up bars, and casual get-togethers. Whether it is formal and elegant or low-key and lively, I match the energy you want.',
  },
  {
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'Deposits are non-refundable, but they can be transferred to a new date within six months if you need to reschedule. Cancellations within 30 days of the event date forfeit the full payment. I understand plans change and work with clients when life happens.',
  },
  {
    question: 'How do payment and deposits work?',
    answer: 'A 50% deposit is required to secure your date. The remaining balance is due before or on the event date. I accept cash, Venmo, Cash App, and most major payment methods. Once you fill out the booking form, I will confirm availability and send the next steps.',
  },
  {
    question: 'How do I book your services?',
    answer: 'Fill out the contact form on this page, call or text 984-385-4736, or email bubble_fizzbar@yahoo.com. I will confirm my availability, schedule a quick consultation to learn about your event, and lock in your date with a deposit.',
  },
  {
    question: 'Can you accommodate large events?',
    answer: 'Yes. For events over 100 guests, I bring additional trained bartending staff so every guest is served quickly and professionally. Staffing is planned during your consultation based on guest count, bar setup, and event timeline.',
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
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 z-55 bg-lux-black"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lux-pink/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
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

        <div className="mt-12 text-center">
          <p className="text-lux-muted mb-6">Still have questions? Reach out any time.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+19843854736"
              className="lux-button-primary inline-flex"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 984-385-4736
            </a>
            <a
              href="mailto:bubble_fizzbar@yahoo.com"
              className="lux-button-outline inline-flex"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Mercedes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
