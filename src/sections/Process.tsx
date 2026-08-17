import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Consultation',
    description: 'We discuss your timeline, guest count, event vibe, and venue logistics so nothing is left to chance.',
  },
  {
    title: 'Menu Design',
    description: 'You choose from signature cocktails, timeless classics, and zero-proof options tailored to your taste.',
  },
  {
    title: 'Setup & Pour',
    description: 'I arrive early with a styled bar, chilled glassware, and everything needed for a polished service.',
  },
  {
    title: 'Toast & Wrap',
    description: 'From first pour to last call, I keep the flow smooth and leave the space spotless.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const timeline = timelineRef.current;
    const nodes = nodesRef.current.filter(Boolean);

    if (!section || !headline || !timeline || nodes.length === 0) return;

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

      nodes.forEach((node) => {
        gsap.fromTo(node,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.5,
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
      className="relative w-full py-20 md:py-24 px-6 md:px-12 lg:px-20 z-40 bg-lux-black"
    >
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <div ref={headlineRef} className="text-center mb-12">
          <span className="section-label">THE PROCESS</span>
          <h2
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            The <span className="text-lux-pink">experience</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-xl mx-auto">
            From first inquiry to final toast, we handle the details so you can stay in the moment.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            className="absolute left-4 top-0 w-1 h-full rounded-full"
            style={{ background: 'linear-gradient(180deg, #7C3AED 0%, #EC4899 50%, #C8A951 100%)' }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={el => { nodesRef.current[index] = el; }}
                className="relative pl-14"
              >
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-lux-black border-2 border-lux-pink flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                  <div className="w-3 h-3 rounded-full bg-gradient-logo" />
                </div>
                <span className="text-lux-purple text-xs font-label uppercase tracking-wider">Step {index + 1}</span>
                <h3 className="mt-1 font-display text-2xl text-lux-white font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-lux-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
