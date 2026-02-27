'use client';

import WalletConnect from './WalletConnect';
import { useAuthStore } from '@/lib/store';

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="border-b border-white/10 glass sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient">Web3 Career Hub</h1>
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm">{user.username || 'User'}</p>
              <p className="text-xs text-neon-blue">{user.xp || 0} XP</p>
            </div>
          </div>
        )}
        <WalletConnect />
      </div>
    </header>
  );
}