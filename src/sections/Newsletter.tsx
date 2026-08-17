import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section 
      id="newsletter"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 z-51 bg-lux-black"
    >
      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative">
        <div 
          ref={contentRef}
          className="lux-card text-center border-lux-pink/30"
        >
          <Sparkles className="w-12 h-12 text-lux-pink mx-auto mb-6" />
          
          <h2 className="font-display text-3xl md:text-4xl text-lux-white mb-4">
            Join the <span className="text-gradient-purple">Bubble & Fizz</span> Family
          </h2>
          
          <p className="text-lux-muted mb-8 max-w-xl mx-auto">
            Subscribe for exclusive cocktail recipes, event tips, seasonal specials, and be the first to know about availability for peak dates!
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lux-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-lux-blacklift border border-lux-white/10 rounded-full pl-12 pr-4 py-4 text-lux-white placeholder-lux-muted/50 focus:border-lux-pink focus:outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="lux-button-primary"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-lux-pink/10 border border-lux-pink/30 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-lux-pink font-display text-xl mb-2">You're on the list! 🥂</p>
              <p className="text-lux-muted text-sm">Watch your inbox for exclusive cocktail recipes and updates!</p>
            </div>
          )}

          <p className="text-lux-muted/60 text-xs mt-6">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
