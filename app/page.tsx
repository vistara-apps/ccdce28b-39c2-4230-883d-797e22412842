'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Header } from './components/Header';
import { AgentGrid } from './components/AgentGrid';
import { StrategyGrid } from './components/StrategyGrid';
import { StatsOverview } from './components/StatsOverview';
import { TabNavigation } from './components/TabNavigation';

type Tab = 'agents' | 'strategies' | 'bridge';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('agents');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-fg/60">Loading DeFi Agent Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsOverview />
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-8 animate-fade-in">
          {activeTab === 'agents' && <AgentGrid />}
          {activeTab === 'strategies' && <StrategyGrid />}
          {activeTab === 'bridge' && (
            <div className="glass rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Cross-Chain Bridge</h2>
              <p className="text-fg/60 mb-6">
                Seamlessly bridge assets between Base and Solana with gas-sponsored transactions.
              </p>
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
