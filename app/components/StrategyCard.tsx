'use client';

import { Strategy } from '@/lib/types';
import { TrendingUp, Shield, Zap, ExternalLink } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  onExecute?: (strategyId: string) => void;
  variant?: 'default' | 'actionable';
}

export function StrategyCard({ strategy, onExecute, variant = 'default' }: StrategyCardProps) {
  const getRiskColor = (risk: number) => {
    if (risk <= 2) return 'text-success';
    if (risk <= 3) return 'text-warning';
    return 'text-error';
  };

  const getRiskLabel = (risk: number) => {
    if (risk <= 2) return 'Low';
    if (risk <= 3) return 'Medium';
    return 'High';
  };

  const getChainBadge = (chain: string) => {
    const colors = {
      Base: 'bg-accent/20 text-accent',
      Solana: 'bg-purple-500/20 text-purple-400',
      Both: 'bg-gradient-to-r from-accent/20 to-purple-500/20 text-fg',
    };
    return colors[chain as keyof typeof colors] || colors.Base;
  };

  return (
    <div className="glass-effect rounded-theme-lg p-6 hover:glow-accent transition-all duration-300 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-fg">{strategy.name}</h3>
            <span className={`px-2 py-1 rounded-theme-sm text-xs font-semibold ${getChainBadge(strategy.targetChain)}`}>
              {strategy.targetChain}
            </span>
          </div>
          <p className="text-sm text-fg/70 mb-3">{strategy.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface/50 rounded-theme-md p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-success mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-success">{strategy.currentAPY}%</p>
          <p className="text-xs text-fg/60">APY</p>
        </div>
        <div className="bg-surface/50 rounded-theme-md p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className={`w-4 h-4 ${getRiskColor(strategy.riskScore)}`} />
          </div>
          <p className={`text-xl font-bold ${getRiskColor(strategy.riskScore)}`}>
            {getRiskLabel(strategy.riskScore)}
          </p>
          <p className="text-xs text-fg/60">Risk</p>
        </div>
        <div className="bg-surface/50 rounded-theme-md p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-accent mb-1">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-xl font-bold text-accent">{strategy.executionCount}</p>
          <p className="text-xs text-fg/60">Executions</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {strategy.protocolIntegrations.map((protocol) => (
          <span
            key={protocol}
            className="px-2 py-1 bg-surface/30 rounded-theme-sm text-xs text-fg/80 border border-border"
          >
            {protocol}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
            {strategy.creatorName.charAt(0)}
          </div>
          <span className="text-sm text-fg/70">{strategy.creatorName}</span>
        </div>
        {variant === 'actionable' && onExecute && (
          <button
            onClick={() => onExecute(strategy.strategyID)}
            className="px-4 py-2 bg-accent text-white rounded-theme-md font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center gap-2"
          >
            Execute
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-3 text-xs text-fg/50 text-center">
        TVL: ${(strategy.tvl / 1000000).toFixed(1)}M
      </div>
    </div>
  );
}
