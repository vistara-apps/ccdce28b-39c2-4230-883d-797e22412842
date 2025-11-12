'use client';

import { useState } from 'react';
import { StrategyCard } from '../components/StrategyCard';
import { mockStrategies } from '@/lib/mock-data';
import { Search, Filter, Zap } from 'lucide-react';

export default function StrategiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('All');

  const handleExecute = (strategyId: string) => {
    console.log('Executing strategy:', strategyId);
    // Implementation would trigger transaction flow
  };

  const filteredStrategies = mockStrategies.filter(strategy => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChain = selectedChain === 'All' || strategy.targetChain === selectedChain;
    return matchesSearch && matchesChain;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 gradient-text">DeFi Strategies</h1>
        <p className="text-fg/70">Execute proven cross-chain strategies with gas sponsorship</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4 animate-slide-up">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fg/40" />
            <input
              type="text"
              placeholder="Search strategies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-theme-md text-fg placeholder-fg/40 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button className="px-4 py-3 glass-effect rounded-theme-md hover:bg-surface/50 transition-all duration-200 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Chain Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Base', 'Solana', 'Both'].map((chain) => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-4 py-2 rounded-theme-md font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedChain === chain
                  ? 'bg-accent text-white'
                  : 'glass-effect text-fg/70 hover:text-fg'
              }`}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-accent">{mockStrategies.length}</p>
          <p className="text-xs text-fg/60">Strategies</p>
        </div>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <p className="text-2xl font-bold text-success">21.8%</p>
          <p className="text-xs text-fg/60">Avg APY</p>
        </div>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <p className="text-2xl font-bold text-warning">$12.4M</p>
          <p className="text-xs text-fg/60">Total TVL</p>
        </div>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStrategies.map((strategy, index) => (
          <div
            key={strategy.strategyID}
            className="animate-slide-up"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <StrategyCard strategy={strategy} onExecute={handleExecute} variant="detailed" />
          </div>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <div className="text-center py-12 glass-effect rounded-theme-lg">
          <p className="text-fg/60">No strategies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
