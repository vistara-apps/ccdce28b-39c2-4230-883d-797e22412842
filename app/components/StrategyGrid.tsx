'use client';

import { TrendingUp, Shield, Zap } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  apy: string;
  risk: 'Low' | 'Medium' | 'High';
  chain: 'Base' | 'Solana' | 'Both';
  executions: number;
  creator: string;
}

const strategies: Strategy[] = [
  {
    id: '1',
    name: 'USDC Arbitrage',
    description: 'Cross-chain arbitrage between Base and Solana DEXs',
    apy: '24.3%',
    risk: 'Low',
    chain: 'Both',
    executions: 1247,
    creator: 'alpha.base.eth',
  },
  {
    id: '2',
    name: 'Yield Farming Pro',
    description: 'Automated yield farming across multiple protocols',
    apy: '42.7%',
    risk: 'Medium',
    chain: 'Base',
    executions: 892,
    creator: 'yield.base.eth',
  },
  {
    id: '3',
    name: 'Liquidity Mining',
    description: 'Optimized liquidity provision with auto-compounding',
    apy: '31.5%',
    risk: 'Low',
    chain: 'Both',
    executions: 1893,
    creator: 'crosschain.base.eth',
  },
  {
    id: '4',
    name: 'Flash Loan Strategy',
    description: 'Advanced flash loan arbitrage opportunities',
    apy: '67.2%',
    risk: 'High',
    chain: 'Base',
    executions: 456,
    creator: 'wizard.base.eth',
  },
];

const riskColors = {
  Low: 'text-success',
  Medium: 'text-warning',
  High: 'text-error',
};

const chainColors = {
  Base: 'bg-accent/20 text-accent',
  Solana: 'bg-purple-500/20 text-purple-400',
  Both: 'bg-success/20 text-success',
};

export function StrategyGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {strategies.map((strategy, index) => (
        <div
          key={strategy.id}
          className="glass rounded-lg p-6 hover:border-accent/40 transition-all duration-200 hover:scale-105 cursor-pointer animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{strategy.name}</h3>
              <p className="text-sm text-fg/60 mb-3">{strategy.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-fg/60">by</span>
                <span className="text-accent font-semibold">{strategy.creator}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${chainColors[strategy.chain]}`}>
                {strategy.chain}
              </span>
              <span className={`text-xs font-semibold ${riskColors[strategy.risk]}`}>
                {strategy.risk} Risk
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-fg/60 mb-1">APY</div>
              <div className="text-success font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {strategy.apy}
              </div>
            </div>
            <div>
              <div className="text-xs text-fg/60 mb-1">Executions</div>
              <div className="font-bold flex items-center gap-1">
                <Zap className="w-4 h-4 text-accent" />
                {strategy.executions}
              </div>
            </div>
            <div>
              <div className="text-xs text-fg/60 mb-1">Security</div>
              <div className="font-bold flex items-center gap-1">
                <Shield className="w-4 h-4 text-success" />
                Verified
              </div>
            </div>
          </div>

          <button className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Execute Strategy
          </button>
        </div>
      ))}
    </div>
  );
}
