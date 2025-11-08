'use client';

import { Wallet, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 glass-effect border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-theme-md bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="font-bold text-lg gradient-text">DeFi Agent Hub</h1>
              <p className="text-xs text-fg/60">Cross-chain orchestration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={`flex items-center gap-2 px-4 py-2 rounded-theme-md font-semibold transition-all duration-200 ${
                isConnected
                  ? 'bg-success/20 text-success border border-success/30'
                  : 'bg-accent text-white hover:bg-accent/90'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isConnected ? '0x1234...5678' : 'Connect'}
              </span>
            </button>
            <button className="p-2 rounded-theme-md hover:bg-surface/50 transition-all duration-200">
              <Menu className="w-5 h-5 text-fg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
