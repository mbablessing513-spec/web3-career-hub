'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/learn', label: 'Learning Paths', icon: '📚' },
  { href: '/jobs', label: 'Job Board', icon: '💼' },
  { href: '/certificates', label: 'Certificates', icon: '🏆' },
  { href: '/admin', label: 'Admin Panel', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={clsx(
      'fixed left-0 top-0 h-screen bg-gradient-to-b from-dark-900 to-dark-950 border-r border-white/10 transition-all duration-300 flex flex-col',
      isOpen ? 'w-64' : 'w-20'
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🚀</div>
          {isOpen && <span className="text-gradient font-bold text-lg">Web3 Hub</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
              pathname === item.href
                ? 'glass bg-neon-blue/20'
                : 'hover:glass hover:bg-white/5'
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Toggle */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-glass w-full"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
    </aside>
  );
}