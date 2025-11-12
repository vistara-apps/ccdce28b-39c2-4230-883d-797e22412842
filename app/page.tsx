'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Activity, TrendingUp, Users, Zap } from 'lucide-react';
import { ConnectWallet } from './components/ConnectWallet';
import { AgentCard } from './components/AgentCard';
import { StrategyCard } from './components/StrategyCard';
import { StatsCard } from './components/StatsCard';
import { mockAgents, mockStrategies } from '@/lib/mock-data';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [userContext, setUserContext] = useState<any>(null);

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready();
    setIsReady(true);

    // Get user context from Farcaster
    const context = sdk.context;
    setUserContext(context);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent"></div>
        <div className="relative px-4 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                  DeFi Agent Hub
                </h1>
                <p className="text-fg/70">
                  Cross-chain strategies on Base + Solana
                </p>
              </div>
              <ConnectWallet />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                icon={<Users className="w-5 h-5" />}
                label="Active Agents"
                value="127"
                trend="+12%"
              />
              <StatsCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Total TVL"
                value="$2.4M"
                trend="+8.3%"
              />
              <StatsCard
                icon={<Activity className="w-5 h-5" />}
                label="Strategies"
                value="43"
                trend="+5"
              />
              <StatsCard
                icon={<Zap className="w-5 h-5" />}
                label="Avg APY"
                value="18.2%"
                trend="+2.1%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Agents Section */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top Performing Agents</h2>
            <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAgents.slice(0, 3).map((agent) => (
              <AgentCard key={agent.fid} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Strategies Section */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Strategies</h2>
            <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
              Explore All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStrategies.slice(0, 4).map((strategy) => (
              <StrategyCard key={strategy.strategyID} strategy={strategy} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-accent">
              <Activity className="w-5 h-5" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg transition-colors duration-200">
              <Users className="w-5 h-5" />
              <span className="text-xs font-medium">Agents</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg transition-colors duration-200">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-medium">Strategies</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg transition-colors duration-200">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-medium">Bridge</span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
