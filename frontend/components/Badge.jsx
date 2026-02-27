'use client';

import clsx from 'clsx';

const badgeVariants = {
  success: 'bg-neon-green/20 text-neon-green',
  warning: 'bg-neon-pink/20 text-neon-pink',
  info: 'bg-neon-blue/20 text-neon-blue',
  premium: 'bg-neon-purple/20 text-neon-purple',
};

export default function Badge({ children, variant = 'info', className }) {
  return (
    <span className={clsx(
      'px-3 py-1 rounded-lg text-sm font-medium',
      badgeVariants[variant],
      className
    )}>
      {children}
    </span>
  );
}