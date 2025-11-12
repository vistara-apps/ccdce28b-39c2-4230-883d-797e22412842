'use client';

import { Wallet } from 'lucide-react';
import { useState } from 'react';

export function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <button
      onClick={handleConnect}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        isConnected
          ? 'bg-success/20 text-success border border-success/30'
          : 'bg-accent hover:bg-accent/90 text-white'
      }`}
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">
        {isConnected ? 'Connected' : 'Connect Wallet'}
      </span>
    </button>
  );
}
