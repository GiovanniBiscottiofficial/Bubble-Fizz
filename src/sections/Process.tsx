import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Wine, ConciergeBell, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss your date, guest count, venue, and vision so every detail is covered.',
  },
  {
    icon: Wine,
    title: 'Menu Design',
    description: 'I build a custom drink menu around your theme, colors, and taste — cocktails, classics, and mocktails included.',
  },
  {
    icon: ConciergeBell,
    title: 'Setup & Pour',
    description: 'I arrive early with a styled bar, chilled glassware, premium tools, and everything needed for polished service.',
  },
  {
    icon: Sparkles,
    title: 'Toast & Wrap',
    description: 'From first pour to last call, the flow stays smooth, the drinks stay beautiful, and the space stays spotless.',
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
      id="process"
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

        <div ref={timelineRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={el => { nodesRef.current[index] = el; }}
              className="lux-card group hover:border-lux-pink/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center group-hover:from-lux-purple/30 group-hover:to-lux-pink/30 transition-all">
                  <step.icon className="w-6 h-6 text-lux-pink" />
                </div>
                <span className="text-lux-purple text-xs font-label uppercase tracking-wider">Step {index + 1}</span>
              </div>
              <h3 className="font-display text-2xl text-lux-white font-medium">
                {step.title}
              </h3>
              <p className="mt-2 text-lux-muted leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
