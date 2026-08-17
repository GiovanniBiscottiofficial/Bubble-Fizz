import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, ExternalLink, Calendar, Loader2, CheckCircle, Star } from 'lucide-react';
import Logo from '@/components/Logo';
import { buildInquiryMailto } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    package: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    const footer = footerRef.current;

    if (!section || !form || !info || !footer) return;

    const ctx = gsap.context(() => {
      const elements = [form, info];
      gsap.fromTo(elements,
        { y: 40, opacity: 0 },
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

      gsap.fromTo(footer,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const applySelectedPackage = (e?: Event) => {
      const pkg = e instanceof CustomEvent ? (e.detail as string) : sessionStorage.getItem('selectedPackage');
      if (pkg) {
        setFormData((prev) => ({ ...prev, package: pkg }));
        sessionStorage.removeItem('selectedPackage');
      }
    };

    applySelectedPackage();
    window.addEventListener('package-selected', applySelectedPackage as EventListener);
    return () => window.removeEventListener('package-selected', applySelectedPackage as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/bubble_fizzbar@yahoo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Booking Inquiry from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: false,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guestCount: '',
          eventType: '',
          package: '',
          message: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      const extra = `
Provided details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Event Type: ${formData.eventType || 'Not specified'}
Package Interest: ${formData.package || 'Not specified'}
Event Date: ${formData.eventDate || 'Not specified'}
Guest Count: ${formData.guestCount || 'Not specified'}

Message:
${formData.message || 'No additional message'}
      `;
      window.location.href = buildInquiryMailto(`Booking Inquiry from ${formData.name}`, extra);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-90 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lux-pink/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lux-purple/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">BOOK US FOR ANY AND ALL EVENTS</span>
          <h2 
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Let's plan your <span className="text-lux-pink">pour</span>.
          </h2>
          <p className="mt-6 text-lux-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Tell us your date, location, and vibe. Mercedes will reply within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left Column - Form */}
          <div ref={formRef}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white placeholder-lux-muted/50 focus:border-lux-purple focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white placeholder-lux-muted/50 focus:border-lux-purple focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white placeholder-lux-muted/50 focus:border-lux-purple focus:outline-none transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white focus:border-lux-purple focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-lux-black">Select event type</option>
                      <option value="wedding" className="bg-lux-black">Wedding</option>
                      <option value="private-party" className="bg-lux-black">Private Party / Celebration</option>
                      <option value="corporate" className="bg-lux-black">Corporate Event</option>
                      <option value="sporting" className="bg-lux-black">Sporting Event</option>
                      <option value="popup" className="bg-lux-black">Pop-Up Bar / Bartender-for-Hire</option>
                      <option value="birthday" className="bg-lux-black">Birthday Party</option>
                      <option value="holiday" className="bg-lux-black">Holiday Party</option>
                      <option value="other" className="bg-lux-black">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-lux-muted text-sm mb-2">Package Interest</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white focus:border-lux-purple focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-lux-black">No package selected</option>
                      <option value="Essential Hour" className="bg-lux-black">Essential Hour — $250</option>
                      <option value="Signature Celebration" className="bg-lux-black">Signature Celebration — $425</option>
                      <option value="Full Experience" className="bg-lux-black">Full Experience — $650</option>
                      <option value="Custom" className="bg-lux-black">Custom / Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Event Date</label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white placeholder-lux-muted/50 focus:border-lux-purple focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-lux-muted text-sm mb-2">Guest Count</label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full lux-input px-4 py-3 text-lux-white focus:border-lux-purple focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-lux-black">Select range</option>
                      <option value="25-50" className="bg-lux-black">25-50 guests</option>
                      <option value="50-100" className="bg-lux-black">50-100 guests</option>
                      <option value="100-200" className="bg-lux-black">100-200 guests</option>
                      <option value="200+" className="bg-lux-black">200+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lux-muted text-sm mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full lux-input px-4 py-3 text-lux-white placeholder-lux-muted/50 focus:border-lux-purple focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your event..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="lux-button-primary w-full sm:w-auto group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                      Send Inquiry
                    </>
                  )}
                </button>

                <p className="text-lux-muted/60 text-xs">
                  Your information will be sent directly to Mercedes at bubble_fizzbar@yahoo.com
                </p>
              </form>
            ) : (
              <div className="lux-card text-center py-16">
                <CheckCircle className="w-16 h-16 text-lux-pink mx-auto mb-6" />
                <h3 className="font-display text-2xl text-lux-white mb-3">Message Sent!</h3>
                <p className="text-lux-muted mb-6">
                  Thank you for reaching out! Mercedes will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="lux-button-outline"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div ref={infoRef}>
            <div className="lux-card">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-6 text-center md:text-left">
                <Logo className="h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40" priority />
                <div>
                  <h3 className="font-display text-xl text-lux-white font-medium">
                    Mercedes Pettiford
                  </h3>
                  <p className="text-gradient-purple text-sm">
                    Professional, Licensed & Insured Mixologist
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-lux-muted">
                    <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-lux-pink fill-lux-pink" /> 5.0 Avg Rating</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-lux-purple" /> 50+ Events</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-lux-gold" /> NC Statewide</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <a 
                  href={buildInquiryMailto()} 
                  className="flex items-center gap-4 text-lux-muted hover:text-lux-pink transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center group-hover:from-lux-purple/30 group-hover:to-lux-pink/30 transition-all">
                    <Mail className="w-5 h-5 text-lux-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-lux-muted/70 uppercase tracking-wider">Email</p>
                    <span className="text-sm md:text-base">bubble_fizzbar@yahoo.com</span>
                  </div>
                </a>

                <a 
                  href="tel:+19843854736" 
                  className="flex items-center gap-4 text-lux-muted hover:text-lux-purple transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center group-hover:from-lux-purple/30 group-hover:to-lux-pink/30 transition-all">
                    <Phone className="w-5 h-5 text-lux-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-lux-muted/70 uppercase tracking-wider">Phone</p>
                    <span className="text-sm md:text-base">984-385-4736</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-lux-muted">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-lux-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-lux-muted/70 uppercase tracking-wider">Service Area</p>
                    <span className="text-sm md:text-base">NC & Surrounding States</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-lux-muted">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lux-purple/20 to-lux-pink/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-lux-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-lux-muted/70 uppercase tracking-wider">Availability</p>
                    <span className="text-sm md:text-base">Weekends book 2-3 months in advance</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-lux-white/10">
                <p className="text-lux-muted text-sm mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/p/Bubble-Fizz-Bartending-100065602894921/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-lux-purple to-lux-pink flex items-center justify-center text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all hover:-translate-y-1"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://instagram.com/bubbleandfizz" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-lux-pink to-lux-purple flex items-center justify-center text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all hover:-translate-y-1"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.thumbtack.com/nc/mebane/bartenders/bubble-fizz-mobile-bartending/service/296554191838363813" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book on Thumbtack"
                    className="px-4 h-14 rounded-xl bg-gradient-to-br from-lux-gold/20 to-lux-gold/5 border border-lux-gold/30 flex items-center gap-2 text-lux-gold hover:border-lux-gold/60 hover:shadow-[0_0_30px_rgba(200,169,81,0.25)] transition-all hover:-translate-y-1"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium">Thumbtack</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-24 pt-8 border-t border-lux-purple/20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Logo className="h-32 w-32 md:h-40 md:w-40" priority />
              <div>
                <span className="font-display text-2xl md:text-3xl text-lux-white block">
                  Bubble <span className="text-lux-pink">&</span> Fizz
                </span>
                <span className="text-lux-muted text-sm">Luxury Mobile Bartending</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-lux-muted text-sm">
              <a href="tel:+19843854736" className="flex items-center gap-2 hover:text-lux-pink transition-colors">
                <Phone className="w-4 h-4" />
                <span>984-385-4736</span>
              </a>
              <a href={buildInquiryMailto()} className="flex items-center gap-2 hover:text-lux-purple transition-colors">
                <Mail className="w-4 h-4" />
                <span>bubble_fizzbar@yahoo.com</span>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-lux-muted/60 text-sm text-center lg:text-right">
              © Bubble & Fizz. All rights reserved.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-lux-muted/40 font-label uppercase tracking-[0.25em]">
              Site built by Vaultborne Group LLC
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

