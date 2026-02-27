'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { useAuthStore } from '@/lib/store';
import { authAPI } from '@/lib/api';

export default function WalletConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuthStore();

  const connectWallet = async () => {
    try {
      setIsLoading(true);

      if (!window.ethereum) {
        alert('MetaMask is required. Please install it.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const walletAddress = accounts[0];

      // Login/Register user
      const response = await authAPI.login(walletAddress);
      setUser(response.data.user);

      localStorage.setItem('walletAddress', walletAddress);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    localStorage.removeItem('walletAddress');
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-neon-blue">{user.username || 'Web3 User'}</p>
          <p className="text-xs text-gray-400">{user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}</p>
        </div>
        <button
          onClick={disconnectWallet}
          className="btn-glass"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isLoading}
      className="btn-neon disabled:opacity-50"
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}