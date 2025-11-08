'use client';

import { Wallet } from 'lucide-react';

export function ConnectWallet() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-theme-lg font-medium transition-all duration-200 glow-accent">
      <Wallet className="w-4 h-4" />
      <span>Connect</span>
    </button>
  );
}
