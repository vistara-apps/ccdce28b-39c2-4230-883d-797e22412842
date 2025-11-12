'use client';

import { Activity } from 'lucide-react';
import { ConnectWallet } from './ConnectWallet';

export function Header() {
  return (
    <header className="glass border-b border-accent/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center glow">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">DeFi Agent Hub</h1>
              <p className="text-xs text-fg/60">Cross-Chain Strategy Orchestration</p>
            </div>
          </div>
          
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
}
