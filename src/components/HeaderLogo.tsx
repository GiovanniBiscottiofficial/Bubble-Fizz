import { cn } from '@/lib/utils';

interface HeaderLogoProps {
  className?: string;
}

export default function HeaderLogo({ className }: HeaderLogoProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'drop-shadow-[0_0_10px_rgba(124,58,237,0.35)]',
        className
      )}
    >
      <img
        src="/logo-header.png"
        alt="Bubble & Fizz"
        width="120"
        height="120"
        className="w-full h-full object-cover opacity-95"
      />
    </div>
  );
}
