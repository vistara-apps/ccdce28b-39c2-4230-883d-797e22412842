'use client';

import { TrendingUp, Shield, DollarSign } from 'lucide-react';

interface StrategyCardProps {
  name: string;
  description: string;
  apy: string;
  tvl: string;
  risk: string;
  chains: string[];
  creator: string;
}

export function StrategyCard({
  name,
  description,
  apy,
  tvl,
  risk,
  chains,
  creator,
}: StrategyCardProps) {
  const riskColor = {
    Low: 'text-success',
    Medium: 'text-warning',
    High: 'text-error',
  }[risk] || 'text-fg/60';

  return (
    <div className="glass-effect rounded-theme-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg group-hover:text-accent transition-colors duration-200">
          {name}
        </h3>
        <div className="flex gap-1">
          {chains.map((chain) => (
            <span
              key={chain}
              className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-theme-sm font-medium"
            >
              {chain}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-fg/70 mb-4">{description}</p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-1 text-fg/60 mb-1">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">APY</span>
          </div>
          <p className="font-bold text-success">{apy}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-fg/60 mb-1">
            <DollarSign className="w-3 h-3" />
            <span className="text-xs">TVL</span>
          </div>
          <p className="font-bold">{tvl}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-fg/60 mb-1">
            <Shield className="w-3 h-3" />
            <span className="text-xs">Risk</span>
          </div>
          <p className={`font-bold ${riskColor}`}>{risk}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-fg/60">by {creator}</span>
        <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-theme-md font-medium transition-all duration-200 text-sm">
          Execute
        </button>
      </div>
    </div>
  );
}
