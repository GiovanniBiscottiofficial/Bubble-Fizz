import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import SignatureCocktails from './sections/SignatureCocktails';
import DrinkMenu from './sections/DrinkMenu';
import Process from './sections/Process';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Packages from './sections/Packages';
import Credentials from './sections/Credentials';
import ServiceAreas from './sections/ServiceAreas';
import FAQ from './sections/FAQ';
import Newsletter from './sections/Newsletter';
import FinalCTA from './sections/FinalCTA';
import Contact from './sections/Contact';
import ChampagneBubbles from './components/ChampagneBubbles';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap for pinned sections only
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-lux-black min-h-screen">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Champagne Bubbles Animation */}
      <ChampagneBubbles />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <Hero />
        
        {/* Section 2: Experience - pin: false */}
        <Experience />
        
        {/* Section 3: Signature Cocktails - pin: true */}
        <SignatureCocktails />
        
        {/* Section 4: Full Drink Menu - pin: false */}
        <DrinkMenu />
        
        {/* Section 5: Process - pin: false */}
        <Process />
        
        {/* Section 6: Gallery - pin: true */}
        <Gallery />
        
        {/* Section 7: Testimonials - pin: false */}
        <Testimonials />
        
        {/* Section 8: Packages - pin: false */}
        <Packages />
        
        {/* Section 9: Credentials - pin: false */}
        <Credentials />
        
        {/* Section 10: Service Areas - pin: false */}
        <ServiceAreas />
        
        {/* Section 11: FAQ - pin: false */}
        <FAQ />
        
        {/* Section 12: Newsletter - pin: false */}
        <Newsletter />
        
        {/* Section 13: Final CTA - pin: true */}
        <FinalCTA />
        
        {/* Section 14: Contact - pin: false */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
