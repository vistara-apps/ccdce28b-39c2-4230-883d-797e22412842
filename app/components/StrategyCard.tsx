'use client';

import { TrendingUp, Shield, DollarSign } from 'lucide-react';
import type { Strategy } from '@/lib/types';

interface StrategyCardProps {
  strategy: Strategy;
  onExecute?: (strategyId: string) => void;
  variant?: 'default' | 'detailed';
}

export function StrategyCard({
  strategy,
  onExecute,
  variant = 'default',
}: StrategyCardProps) {
  const {
    strategyID,
    name,
    description,
    currentAPY,
    tvl,
    riskScore,
    targetChain,
    creatorName,
  } = strategy;

  const getRiskLevel = (score: number) => {
    if (score <= 2) return { level: 'Low', color: 'text-success' };
    if (score <= 3) return { level: 'Medium', color: 'text-warning' };
    return { level: 'High', color: 'text-error' };
  };

  const risk = getRiskLevel(riskScore);
  const chains = targetChain === 'Both' ? ['Base', 'Solana'] : [targetChain];

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
          <p className="font-bold text-success">{currentAPY.toFixed(1)}%</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-fg/60 mb-1">
            <DollarSign className="w-3 h-3" />
            <span className="text-xs">TVL</span>
          </div>
          <p className="font-bold">${(tvl / 1000000).toFixed(1)}M</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-fg/60 mb-1">
            <Shield className="w-3 h-3" />
            <span className="text-xs">Risk</span>
          </div>
          <p className={`font-bold ${risk.color}`}>{risk.level}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-fg/60">by {creatorName}</span>
        <button 
          onClick={() => onExecute?.(strategyID)}
          className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-theme-md font-medium transition-all duration-200 text-sm"
        >
          Execute
        </button>
      </div>
    </div>
  );
}
