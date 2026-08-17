import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/OptimizedImage';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export default function Logo({ className, priority }: LogoProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-lux-blacklift/70 border border-lux-purple/30',
        'shadow-[0_0_30px_rgba(139,92,246,0.15),0_0_60px_rgba(236,72,153,0.08)]',
        className
      )}
    >
      <OptimizedImage
        src="/logo.png"
        alt="Bubble & Fizz Logo"
        priority={priority}
        className="w-full h-full object-cover rounded-full opacity-95"
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px 20px rgba(10,10,15,0.55)',
        }}
      />
    </div>
  );
}
