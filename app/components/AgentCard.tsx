'use client';

import { Star, Users, TrendingUp } from 'lucide-react';
import type { DeFiAgent } from '@/lib/types';

interface AgentCardProps {
  agent: DeFiAgent;
  onFollow?: (fid: number) => void;
  variant?: 'default' | 'detailed';
}

export function AgentCard({
  agent,
  onFollow,
  variant = 'default',
}: AgentCardProps) {
  const {
    displayName: name,
    basename,
    pfpUrl: avatar,
    performanceMetrics,
    followers,
    rating,
  } = agent;
  return (
    <div className="glass-effect rounded-theme-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={avatar} 
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg group-hover:text-accent transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-fg/60">{basename || '@agent'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-success font-bold">+{performanceMetrics.totalReturn.toFixed(1)}%</span>
        </div>
        <span className="text-xs text-fg/60">Total Return</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-fg/70">
          <Users className="w-4 h-4" />
          <span className="text-sm">{followers.toLocaleString()}</span>
        </div>
        <div className="text-sm text-fg/70">
          {performanceMetrics.strategiesCreated} strategies
        </div>
      </div>

      <button 
        onClick={() => onFollow?.(agent.fid)}
        className="w-full mt-4 py-2 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-theme-md font-medium transition-all duration-200"
      >
        {agent.isFollowing ? 'Following' : 'Follow Agent'}
      </button>
    </div>
  );
}
