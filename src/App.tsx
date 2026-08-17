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
import ThumbtackMoments from './sections/ThumbtackMoments';
import ReviewsMap from './components/ReviewsMap';
import Packages from './sections/Packages';
import Credentials from './sections/Credentials';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Contact from './sections/Contact';
import ChampagneBubbles from './components/ChampagneBubbles';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
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

        {/* Section 7.5: Thumbtack Moments - pin: false */}
        <ThumbtackMoments />

        {/* Section 7.6: Reviews & Map - pin: false */}
        <ReviewsMap />
        
        {/* Section 8: Packages - pin: false */}
        <Packages />
        
        {/* Section 9: Credentials - pin: false */}
        <Credentials />
        
        {/* Section 10: FAQ - pin: false */}
        <FAQ />

        {/* Section 12: Final CTA - pin: true */}
        <FinalCTA />
        
        {/* Section 14: Contact - pin: false */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
