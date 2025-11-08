'use client';

import { useState } from 'react';
import { ArrowLeftRight, ArrowDown, Info, Zap } from 'lucide-react';

export default function BridgePage() {
  const [fromChain, setFromChain] = useState<'Base' | 'Solana'>('Solana');
  const [toChain, setToChain] = useState<'Base' | 'Solana'>('Base');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDC');

  const handleSwapChains = () => {
    setFromChain(toChain);
    setToChain(fromChain);
  };

  const tokens = ['USDC', 'USDT', 'ETH', 'SOL', 'WETH'];

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      <div className="animate-fade-in text-center">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Cross-Chain Bridge</h1>
        <p className="text-fg/70">Seamlessly move assets between Base and Solana</p>
      </div>

      {/* Bridge Card */}
      <div className="glass-effect rounded-theme-lg p-6 space-y-6 animate-slide-up">
        {/* From Chain */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-fg/70">From</label>
          <div className="glass-effect rounded-theme-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value as 'Base' | 'Solana')}
                className="bg-surface rounded-theme-sm px-3 py-2 text-fg font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Base">Base</option>
                <option value="Solana">Solana</option>
              </select>
              <div className="text-xs text-fg/60">Balance: 1,234.56 {selectedToken}</div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-2xl font-bold text-fg focus:outline-none"
              />
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="bg-surface rounded-theme-sm px-3 py-2 text-fg font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {tokens.map((token) => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapChains}
            className="p-3 glass-effect rounded-full hover:bg-surface/50 transition-all duration-200 hover:rotate-180"
          >
            <ArrowDown className="w-6 h-6 text-accent" />
          </button>
        </div>

        {/* To Chain */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-fg/70">To</label>
          <div className="glass-effect rounded-theme-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <select
                value={toChain}
                onChange={(e) => setToChain(e.target.value as 'Base' | 'Solana')}
                className="bg-surface rounded-theme-sm px-3 py-2 text-fg font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Base">Base</option>
                <option value="Solana">Solana</option>
              </select>
              <div className="text-xs text-fg/60">Balance: 567.89 {selectedToken}</div>
            </div>
            <div className="text-2xl font-bold text-fg">
              {amount || '0.00'} {selectedToken}
            </div>
          </div>
        </div>

        {/* Bridge Info */}
        <div className="glass-effect rounded-theme-md p-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-fg/60">Bridge Fee</span>
            <span className="font-semibold text-fg">0.1%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg/60">Estimated Time</span>
            <span className="font-semibold text-fg">~2-5 minutes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-fg/60">Gas (Base)</span>
            <span className="font-semibold text-success flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Sponsored
            </span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-theme-md p-4 flex gap-3">
          <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-fg/80">
            All Base transactions are gas-sponsored. You only pay the bridge fee.
          </p>
        </div>

        {/* Bridge Button */}
        <button
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full py-4 bg-accent text-white rounded-theme-md font-bold text-lg hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeftRight className="w-5 h-5" />
          Bridge Assets
        </button>
      </div>

      {/* Recent Bridges */}
      <div className="glass-effect rounded-theme-lg p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-bold text-lg mb-4 text-fg">Recent Bridges</h3>
        <div className="space-y-3">
          {[
            { from: 'Solana', to: 'Base', amount: '500 USDC', time: '2 hours ago', status: 'completed' },
            { from: 'Base', to: 'Solana', amount: '0.5 ETH', time: '1 day ago', status: 'completed' },
            { from: 'Solana', to: 'Base', amount: '1000 USDT', time: '3 days ago', status: 'completed' },
          ].map((bridge, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-theme-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-semibold text-fg">{bridge.from}</span>
                  <ArrowLeftRight className="w-3 h-3 text-fg/60" />
                  <span className="font-semibold text-fg">{bridge.to}</span>
                </div>
                <span className="text-sm text-fg/70">{bridge.amount}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-success">Completed</div>
                <div className="text-xs text-fg/50">{bridge.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
