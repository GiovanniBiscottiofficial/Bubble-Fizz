import './index.css';
import { lazy } from 'react';
import CustomCursor from './components/CustomCursor';
import ChampagneBubbles from './components/ChampagneBubbles';
import LazySection from './components/LazySection';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import NotFound from './sections/NotFound';

const Experience = lazy(() => import('./sections/Experience'));
const SignatureCocktails = lazy(() => import('./sections/SignatureCocktails'));
const DrinkMenu = lazy(() => import('./sections/DrinkMenu'));
const Process = lazy(() => import('./sections/Process'));
const Gallery = lazy(() => import('./sections/Gallery'));
const ThumbtackMoments = lazy(() => import('./sections/ThumbtackMoments'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const ReviewsMap = lazy(() => import('./components/ReviewsMap'));
const Packages = lazy(() => import('./sections/Packages'));
const Credentials = lazy(() => import('./sections/Credentials'));
const FAQ = lazy(() => import('./sections/FAQ'));
const FinalCTA = lazy(() => import('./sections/FinalCTA'));
const Contact = lazy(() => import('./sections/Contact'));

function App() {
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html') {
    return (
      <>
        <CustomCursor />
        <NotFound />
      </>
    );
  }

  return (
    <div className="relative bg-lux-black min-h-screen">
      <CustomCursor />
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

        <LazySection component={Experience} id="experience" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={SignatureCocktails} id="signature-cocktails" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={DrinkMenu} id="drink-menu" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={Process} id="process" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={Gallery} id="gallery" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={ThumbtackMoments} id="thumbtack-moments" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={Testimonials} id="testimonials" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={ReviewsMap} id="service-map" placeholderClassName="min-h-[60vh] bg-lux-black" />
        <LazySection component={Packages} id="packages" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={Credentials} id="credentials" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={FAQ} id="faq" placeholderClassName="min-h-screen bg-lux-black" />
        <LazySection component={FinalCTA} id="final-cta" placeholderClassName="min-h-[80vh] bg-lux-black" />
        <LazySection component={Contact} id="contact" placeholderClassName="min-h-screen bg-lux-black" />
      </main>
    </div>
  );
}

export default App;
