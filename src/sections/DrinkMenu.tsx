import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wine, GlassWater, Coffee, Sparkles, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const drinkCategories = [
  {
    id: 'signature',
    name: 'Signature Cocktails',
    icon: Sparkles,
    color: 'from-lux-pink to-lux-purple',
    drinks: [
      { name: 'The Rosé Royale', desc: 'Sparkling rosé, berry reduction, gold leaf', tags: ['Bubbly', 'Elegant'] },
      { name: 'The Velvet Crown', desc: 'Bourbon, vanilla, burnt orange, golden demerara', tags: ['Bold', 'Smoked'] },
      { name: 'Smoked Amethyst', desc: 'Mezcal, fresh citrus, charcoal-salted rim', tags: ['Smoked', 'Citrus'] },
      { name: 'Purple Reign', desc: 'Empress gin, lemon, lavender syrup', tags: ['Floral', 'Elegant'] },
      { name: 'Bubble & Fizz Special', desc: 'Champagne, Chambord, fresh berries', tags: ['Bubbly', 'Signature'] },
      { name: 'Shimmer Elixir', desc: 'Vodka, edible shimmer, citrus, sparkling topper', tags: ['Shimmer', 'Citrus'] },
    ],
  },
  {
    id: 'classics',
    name: 'Classic Cocktails',
    icon: Wine,
    color: 'from-lux-purple to-lux-gold',
    drinks: [
      { name: 'Mojito', desc: 'Rum, mint, lime, soda', tags: ['Classic', 'Refreshing'] },
      { name: 'Cosmopolitan', desc: 'Vodka, cranberry, lime, Cointreau', tags: ['Classic', 'Elegant'] },
      { name: 'Moscow Mule', desc: 'Vodka, ginger beer, lime', tags: ['Classic', 'Refreshing'] },
      { name: 'Margarita', desc: 'Tequila, lime, triple sec', tags: ['Classic', 'Citrus'] },
      { name: 'Manhattan', desc: 'Rye, sweet vermouth, bitters', tags: ['Classic', 'Bold'] },
    ],
  },
  {
    id: 'champagne',
    name: 'Champagne & Bubbles',
    icon: GlassWater,
    color: 'from-lux-gold to-lux-pink',
    drinks: [
      { name: 'Classic Mimosa', desc: 'Champagne, fresh orange juice', tags: ['Bubbly', 'Brunch'] },
      { name: 'Bellini', desc: 'Prosecco, peach purée', tags: ['Bubbly', 'Fruity'] },
      { name: 'French 75', desc: 'Gin, lemon, champagne', tags: ['Bubbly', 'Citrus'] },
      { name: 'Kir Royale', desc: 'Champagne, crème de cassis', tags: ['Bubbly', 'Elegant'] },
      { name: 'Champagne Tower', desc: '50+ glasses, premium champagne', tags: ['Bubbly', 'Statement'] },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails & Zero-Proof',
    icon: Coffee,
    color: 'from-lux-pink to-lux-gold',
    drinks: [
      { name: 'Minted Bubbles', desc: 'Muddled mint, lime, soda, raw sugar', tags: ['Zero-Proof', 'Refreshing'] },
      { name: 'Citrus Shimmer', desc: 'Seedlip-style botanicals, tonic, burnt orange', tags: ['Zero-Proof', 'Citrus'] },
      { name: 'Cherry Fizz', desc: 'Ginger ale, grenadine, luxardo cherry', tags: ['Zero-Proof', 'Sweet'] },
      { name: 'Cucumber Mist', desc: 'Cucumber, lime, mint, soda', tags: ['Zero-Proof', 'Dry-Ice'] },
      { name: 'Berry Sparkler', desc: 'Berry syrup, soda, fresh fruit', tags: ['Zero-Proof', 'Fruity'] },
    ],
  },
];

export default function DrinkMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('signature');

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

  const activeDrinks = drinkCategories.find(c => c.id === activeCategory)?.drinks || [];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 z-53 bg-lux-black"
    >
      {/* Pink glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-lux-pink/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={headlineRef} className="text-center mb-12">
          <span className="section-label">OUR MENU</span>
          <h2 
            className="mt-4 font-display text-lux-white font-semibold leading-[1.0]"
            style={{ fontSize: 'clamp(34px, 3.6vw, 52px)' }}
          >
            Crafted with <span className="text-lux-pink">Passion</span>
          </h2>
          <p className="mt-6 text-lux-muted text-lg max-w-2xl mx-auto">
            From signature creations and shimmer cocktails to timeless classics, every drink is crafted with premium ingredients, artistic presentation, and budget-friendly options.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {drinkCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-label text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-lux-blacklift border border-lux-white/10 text-lux-muted hover:border-lux-pink/30 hover:text-lux-white'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDrinks.map((drink) => (
            <div
              key={drink.name}
              className="lux-card group hover:border-lux-pink/40 transition-all duration-300 hover:-translate-y-1 last:md:col-span-2 last:lg:col-span-1"
            >
              <h3 className="font-display text-xl text-lux-white group-hover:text-lux-pink transition-colors mb-3">
              {drink.name}
            </h3>
            <p className="text-lux-muted text-sm">{drink.desc}</p>
            {drink.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {drink.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium bg-lux-pink/10 text-lux-pink border border-lux-pink/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            </div>
          ))}
        </div>

        {/* Custom Menu CTA */}
        <div className="mt-12 lux-card text-center">
          <Sparkles className="w-10 h-10 text-lux-pink mx-auto mb-4" />
          <h3 className="font-display text-2xl text-lux-white mb-3">
            Want a Custom Menu?
          </h3>
          <p className="text-lux-muted mb-6 max-w-xl mx-auto">
            I can create a custom cocktail menu tailored to your event theme, colors, or personal preferences. Let's make something unique together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={scrollToContact}
              className="lux-button-primary"
            >
              Request Custom Menu
            </button>
            <a 
              href="mailto:bubble_fizzbar@yahoo.com?subject=Full Menu Request"
              className="lux-button-outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Request Full Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
