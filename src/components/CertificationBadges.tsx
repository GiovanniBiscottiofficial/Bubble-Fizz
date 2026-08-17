import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, Utensils, Beer, BadgeCheck, UserCheck, Wine } from 'lucide-react';

interface CertificationBadgesProps {
  compact?: boolean;
  className?: string;
}

const ALL_BADGES = [
  { icon: ShieldCheck, title: 'TIPS Certified' },
  { icon: Utensils, title: 'ServSafe' },
  { icon: Beer, title: 'Certified Beer Server' },
  { icon: BadgeCheck, title: 'Certified Cicerone' },
  { icon: Shield, title: 'Fully Insured' },
  { icon: UserCheck, title: 'Background Checked' },
  { icon: Wine, title: 'Professional Mixologist' },
];

const COMPACT_BADGES = ALL_BADGES.filter((b) =>
  ['TIPS Certified', 'ServSafe', 'Background Checked', 'Fully Insured', 'Professional Mixologist'].includes(b.title)
);

export default function CertificationBadges({ compact, className }: CertificationBadgesProps) {
  const badges = compact ? COMPACT_BADGES : ALL_BADGES;

  return (
    <div className={cn('flex flex-wrap justify-center gap-3', className)}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className={cn(
            'inline-flex items-center gap-2 rounded-full bg-lux-black border border-lux-gold/30 hover:border-lux-gold/60 transition-all group',
            compact ? 'px-3 py-1.5' : 'px-4 py-2'
          )}
        >
          <div
            className={cn(
              'rounded-full bg-lux-gold/10 flex items-center justify-center group-hover:bg-lux-gold/20 transition-all',
              compact ? 'w-6 h-6' : 'w-8 h-8'
            )}
          >
            <badge.icon className={cn('text-lux-gold', compact ? 'w-3 h-3' : 'w-4 h-4')} />
          </div>
          <span className={cn('text-lux-white font-medium whitespace-nowrap', compact ? 'text-xs' : 'text-sm')}>
            {badge.title}
          </span>
        </div>
      ))}
    </div>
  );
}
