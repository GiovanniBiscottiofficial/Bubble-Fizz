import { Wine } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-lux-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lux-purple/10 via-transparent to-lux-pink/10 pointer-events-none" />
      <Wine className="w-12 h-12 text-lux-gold mb-6" />
      <h1 className="font-display text-7xl md:text-8xl text-lux-white mb-4">404</h1>
      <p className="text-lux-muted text-lg md:text-xl max-w-md mb-10 leading-relaxed">
        This page doesn't exist, but the bar is still open.
      </p>
      <a href="/" className="lux-button-primary">
        Back to Bubble & Fizz
      </a>
    </section>
  );
}
