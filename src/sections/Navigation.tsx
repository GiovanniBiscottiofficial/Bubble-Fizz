import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

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
              <img 
                src="/logo.png" 
                alt="Bubble & Fizz Logo"
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-all duration-500"
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-lux-white rounded-xl border border-lux-purple/30 bg-lux-purple/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-lux-blacker/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <img 
            src="/logo.png" 
            alt="Bubble & Fizz Logo"
            className="h-28 w-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
          />
          <p className="text-gradient-purple font-label text-sm uppercase tracking-[0.25em] mb-4">
            BOOK US FOR ANY AND ALL EVENTS
          </p>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display text-2xl text-lux-white hover:text-lux-pink transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="tel:+19843854736"
            className="flex items-center gap-2 text-lux-purple mt-4"
          >
            <Phone className="w-5 h-5" />
            <span>984-385-4736</span>
          </a>
          <button 
            onClick={scrollToContact}
            className="lux-button-primary mt-4"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

