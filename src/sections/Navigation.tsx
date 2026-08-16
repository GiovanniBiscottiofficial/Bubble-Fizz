import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const navLinks = [
  { label: 'About', href: '#experience' },
  { label: 'Menu', href: '#drink-menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    setIsMobileMenuOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-lux-blacker/95 backdrop-blur-xl border-b border-lux-purple/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-24">
            {/* Logo - BIGGER */}
            <a 
              href="#" 
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <OptimizedImage 
                src="/logo.png" 
                alt="Bubble & Fizz Logo"
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-all duration-500"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lux-muted hover:text-lux-pink transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="tel:+19843854736"
                className="flex items-center gap-2 text-lux-purple hover:text-lux-pink transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>984-385-4736</span>
              </a>
              <button 
                onClick={scrollToContact}
                className="lux-button-primary text-xs py-3 px-6"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-lux-white rounded-xl border border-lux-purple/30 bg-lux-purple/10 hover:bg-lux-pink/20 transition-all duration-300"
            >
              <Menu 
                className={`w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 rotate-180 scale-90' : 'opacity-100 rotate-0 scale-100'
                }`}
                aria-hidden="true"
              />
              <X 
                className={`absolute w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-90'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 z-[99] bg-lux-blacker/95 backdrop-blur-xl transition-opacity duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center h-full gap-6 px-6"
        >
          <OptimizedImage 
            src="/logo.png" 
            alt="Bubble & Fizz Logo"
            className={`w-40 h-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-500 ${
              isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          />
          <p 
            className={`text-gradient-purple font-label text-sm uppercase tracking-[0.25em] mb-4 transition-all duration-700 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            BOOK US FOR ANY AND ALL EVENTS
          </p>
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`font-display text-2xl text-lux-white hover:text-lux-pink transition-all duration-500 ${
                isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="tel:+19843854736"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 text-lux-purple mt-4 transition-all duration-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Phone className="w-5 h-5" />
            <span>984-385-4736</span>
          </a>
          <button 
            onClick={scrollToContact}
            className={`lux-button-primary mt-4 transition-all duration-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
