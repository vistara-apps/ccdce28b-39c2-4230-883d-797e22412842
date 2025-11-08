'use client';

import { DeFiAgent } from '@/lib/types';
import { TrendingUp, Users, Award, ExternalLink } from 'lucide-react';

interface AgentCardProps {
  agent: DeFiAgent;
  onFollow?: (fid: number) => void;
  variant?: 'default' | 'detailed';
}

export function AgentCard({ agent, onFollow, variant = 'default' }: AgentCardProps) {
  const handleFollow = () => {
    if (onFollow) {
      onFollow(agent.fid);
    }
  };

  return (
    <div className="glass-effect rounded-theme-lg p-6 hover:glow-accent transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            {agent.displayName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-fg">{agent.displayName}</h3>
            {agent.basename && (
              <p className="text-sm text-accent flex items-center gap-1">
                {agent.basename}
                <ExternalLink className="w-3 h-3" />
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Award className="w-4 h-4" />
          <span className="font-semibold">{agent.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-surface/50 rounded-theme-md p-3">
          <div className="flex items-center gap-2 text-success mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs text-fg/60">Total Return</span>
          </div>
          <p className="text-xl font-bold text-success">+{agent.performanceMetrics.totalReturn}%</p>
        </div>
        <div className="bg-surface/50 rounded-theme-md p-3">
          <div className="flex items-center gap-2 text-accent mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs text-fg/60">Win Rate</span>
          </div>
          <p className="text-xl font-bold text-accent">{agent.performanceMetrics.winRate}%</p>
        </div>
      </div>

      {variant === 'detailed' && (
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-fg/60">Avg APY:</span>
            <span className="font-semibold text-fg">{agent.performanceMetrics.avgAPY}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg/60">Strategies:</span>
            <span className="font-semibold text-fg">{agent.performanceMetrics.strategiesCreated}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-fg/60">Total Earnings:</span>
            <span className="font-semibold text-success">${(agent.earnings / 1000).toFixed(1)}k</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-fg/60">{agent.followers.toLocaleString()} followers</span>
        <button
          onClick={handleFollow}
          className={`px-4 py-2 rounded-theme-md font-semibold transition-all duration-200 ${
            agent.isFollowing
              ? 'bg-surface text-fg border border-border'
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
        >
          {agent.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
