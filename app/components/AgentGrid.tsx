'use client';

import { Star, TrendingUp, Shield } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  basename: string;
  rating: number;
  performance: string;
  strategies: number;
  followers: number;
  verified: boolean;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Alpha Strategist',
    basename: 'alpha.base.eth',
    rating: 4.8,
    performance: '+127.3%',
    strategies: 24,
    followers: 1247,
    verified: true,
  },
  {
    id: '2',
    name: 'Yield Hunter',
    basename: 'yield.base.eth',
    rating: 4.6,
    performance: '+98.7%',
    strategies: 18,
    followers: 892,
    verified: true,
  },
  {
    id: '3',
    name: 'Cross-Chain Pro',
    basename: 'crosschain.base.eth',
    rating: 4.9,
    performance: '+156.2%',
    strategies: 31,
    followers: 1893,
    verified: true,
  },
  {
    id: '4',
    name: 'DeFi Wizard',
    basename: 'wizard.base.eth',
    rating: 4.7,
    performance: '+112.8%',
    strategies: 22,
    followers: 1056,
    verified: true,
  },
];

export function AgentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <div
          key={agent.id}
          className="glass rounded-lg p-6 hover:border-accent/40 transition-all duration-200 hover:scale-105 cursor-pointer animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center text-white font-bold text-lg">
                {agent.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{agent.name}</h3>
                  {agent.verified && (
                    <Shield className="w-4 h-4 text-success" />
                  )}
                </div>
                <p className="text-xs text-fg/60">{agent.basename}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-fg/60">Performance</span>
              <span className="text-success font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {agent.performance}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-fg/60">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-semibold">{agent.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-fg/60">Strategies</span>
              <span className="font-semibold">{agent.strategies}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-fg/60">Followers</span>
              <span className="font-semibold">{agent.followers.toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-accent hover:bg-accent/90 text-white py-2 rounded-lg font-semibold transition-all duration-200">
            Follow Agent
          </button>
        </div>
      ))}
    </div>
  );
}
