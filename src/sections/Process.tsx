import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Consultation',
    description: 'Timeline, guest count, vibe, and venue logistics.',
  },
  {
    title: 'Menu Design',
    description: 'Signatures, classics, and non-alcoholic options.',
  },
  {
    title: 'Setup & Pour',
    description: 'Arrive early, styled bar, chilled glassware.',
  },
  {
    title: 'Toast & Wrap',
    description: 'Last call, clean exit, zero stress.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const nodes = nodesRef.current.filter(Boolean);

    if (!section || !headline || !timeline || !line || nodes.length === 0) return;

    const ctx = gsap.context(() => {
      // Headline + body: slide in from left
      gsap.fromTo(headline,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
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

      // Timeline line: draw-on feel using scaleY
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Nodes animation
      nodes.forEach((node, index) => {
        gsap.fromTo(node,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: timeline,
              start: `top ${65 - index * 8}%`,
              end: `top ${45 - index * 8}%`,
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
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-40 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column - Text */}
          <div ref={headlineRef}>
            <span className="section-label">THE PROCESS</span>
            <h2 
              className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
              style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
            >
              The <span className="text-lux-pink">experience</span>.
            </h2>
            <p className="mt-8 text-lux-muted text-lg leading-relaxed max-w-md">
              From first inquiry to final toast, we handle the details—so you can stay in the moment.
            </p>
          </div>

          {/* Right Column - Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical Line */}
            <div 
              ref={lineRef}
              className="absolute left-4 top-0 w-1 h-full rounded-full origin-top"
              style={{ 
                background: 'linear-gradient(180deg, #7C3AED 0%, #EC4899 50%, #C8A951 100%)',
                transform: 'scaleY(0)'
              }}
            />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.title}
                  ref={el => { nodesRef.current[index] = el; }}
                  className="relative pl-14"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-lux-black border-2 border-lux-pink flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                    <div className="w-3 h-3 rounded-full bg-gradient-logo" />
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-lux-purple text-xs font-label uppercase tracking-wider">Step {index + 1}</span>
                    <h3 className="mt-1 font-display text-2xl text-lux-white font-medium">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-lux-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
