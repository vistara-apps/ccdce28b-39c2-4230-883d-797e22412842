'use client';

import { useState } from 'react';
import { AgentCard } from '../components/AgentCard';
import { mockAgents } from '@/lib/mock-data';
import { Search, Filter, TrendingUp } from 'lucide-react';

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFollow = (fid: number) => {
    setAgents(agents.map(agent => 
      agent.fid === fid ? { ...agent, isFollowing: !agent.isFollowing } : agent
    ));
  };

  const filteredAgents = agents.filter(agent =>
    agent.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.basename?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 gradient-text">DeFi Agents</h1>
        <p className="text-fg/70">Discover and follow top-performing DeFi strategists</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 animate-slide-up">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fg/40" />
          <input
            type="text"
            placeholder="Search agents by name or basename..."
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-success">+42.7%</p>
          <p className="text-xs text-fg/60">Avg Return</p>
        </div>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <p className="text-2xl font-bold text-accent">{agents.length}</p>
          <p className="text-xs text-fg/60">Active Agents</p>
        </div>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <p className="text-2xl font-bold text-warning">78%</p>
          <p className="text-xs text-fg/60">Avg Win Rate</p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent, index) => (
          <div
            key={agent.fid}
            className="animate-slide-up"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <AgentCard agent={agent} onFollow={handleFollow} variant="detailed" />
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12 glass-effect rounded-theme-lg">
          <p className="text-fg/60">No agents found matching your search.</p>
        </div>
      )}
    </div>
  );
}
