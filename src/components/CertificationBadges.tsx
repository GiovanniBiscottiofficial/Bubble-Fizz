import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, Utensils } from 'lucide-react';

interface CertificationBadgesProps {
  compact?: boolean;
  className?: string;
}

const BADGES = [
  { icon: ShieldCheck, title: 'TIPS Certified' },
  { icon: Utensils, title: 'ServSafe' },
  { icon: Shield, title: 'Fully Insured' },
];

export default function CertificationBadges({ compact, className }: CertificationBadgesProps) {
  const badges = BADGES;

  return (
    <div className={cn('flex flex-wrap justify-center gap-3', className)}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className={cn(
            'inline-flex items-center gap-2 rounded-full bg-lux-white/5 border border-lux-white/10 hover:border-lux-gold/30 transition-all group',
            compact ? 'px-3 py-1.5' : 'px-4 py-2'
          )}
        >
          <div
            className={cn(
              'rounded-full bg-lux-gold/10 flex items-center justify-center group-hover:bg-lux-gold/20 transition-all',
              compact ? 'w-6 h-6' : 'w-8 h-8'
            )}
          >
            <badge.icon className={cn('text-lux-gold/80', compact ? 'w-3 h-3' : 'w-4 h-4')} />
          </div>
          <span className={cn('text-lux-white font-medium text-center leading-tight', compact ? 'text-xs' : 'text-sm')}>
            {badge.title}
          </span>
        </div>
      ))}
    </div>
  );
}
