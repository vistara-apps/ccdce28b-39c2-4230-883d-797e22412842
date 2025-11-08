'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { TrendingUp, Users, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { AgentCard } from './components/AgentCard';
import { StrategyCard } from './components/StrategyCard';
import { mockAgents, mockStrategies } from '@/lib/mock-data';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse-glow">
          <div className="w-16 h-16 rounded-theme-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Hero Section */}
      <section className="text-center py-8 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Cross-Chain DeFi Orchestration
        </h2>
        <p className="text-lg text-fg/70 mb-6 max-w-2xl mx-auto">
          Execute strategies across Base and Solana. Follow top agents. Build your reputation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="glass-effect rounded-theme-lg px-6 py-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-success" />
            <div className="text-left">
              <p className="text-2xl font-bold text-success">$12.4M</p>
              <p className="text-xs text-fg/60">Total TVL</p>
            </div>
          </div>
          <div className="glass-effect rounded-theme-lg px-6 py-4 flex items-center gap-3">
            <Users className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="text-2xl font-bold text-accent">6,806</p>
              <p className="text-xs text-fg/60">Active Users</p>
            </div>
          </div>
          <div className="glass-effect rounded-theme-lg px-6 py-4 flex items-center gap-3">
            <Zap className="w-6 h-6 text-warning" />
            <div className="text-left">
              <p className="text-2xl font-bold text-warning">9,278</p>
              <p className="text-xs text-fg/60">Executions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-fg">Top Performing Agents</h3>
          <button className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.slice(0, 3).map((agent) => (
            <AgentCard key={agent.fid} agent={agent} variant="detailed" />
          ))}
        </div>
      </section>

      {/* Featured Strategies */}
      <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-fg">Featured Strategies</h3>
          <button className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            Explore All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockStrategies.slice(0, 2).map((strategy) => (
            <StrategyCard key={strategy.strategyID} strategy={strategy} variant="actionable" />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="glass-effect rounded-theme-lg p-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-xl font-bold mb-4 text-fg">Ready to get started?</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-accent text-white rounded-theme-md font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Execute Strategy
          </button>
          <button className="px-6 py-3 bg-surface text-fg rounded-theme-md font-semibold hover:bg-surface/80 transition-all duration-200 border border-border flex items-center gap-2">
            <Users className="w-5 h-5" />
            Follow Agents
          </button>
        </div>
      </section>
    </div>
  );
}
