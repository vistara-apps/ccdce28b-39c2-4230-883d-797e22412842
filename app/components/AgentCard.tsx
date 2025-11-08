'use client';

import { Star, Users, TrendingUp } from 'lucide-react';

interface AgentCardProps {
  name: string;
  basename: string;
  avatar: string;
  performance: string;
  followers: number;
  strategies: number;
  rating: number;
}

export function AgentCard({
  name,
  basename,
  avatar,
  performance,
  followers,
  strategies,
  rating,
}: AgentCardProps) {
  return (
    <div className="glass-effect rounded-theme-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-2xl">
            {avatar}
          </div>
          <div>
            <h3 className="font-bold text-lg group-hover:text-accent transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-fg/60">{basename}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-success font-bold">{performance}</span>
        </div>
        <span className="text-xs text-fg/60">30d performance</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-fg/70">
          <Users className="w-4 h-4" />
          <span className="text-sm">{followers.toLocaleString()}</span>
        </div>
        <div className="text-sm text-fg/70">
          {strategies} strategies
        </div>
      </div>

      <button className="w-full mt-4 py-2 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-theme-md font-medium transition-all duration-200">
        Follow Agent
      </button>
    </div>
  );
}
