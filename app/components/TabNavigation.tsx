'use client';

import { Users, TrendingUp, ArrowLeftRight } from 'lucide-react';

type Tab = 'agents' | 'strategies' | 'bridge';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: 'agents' as Tab, label: 'Agents', icon: Users },
  { id: 'strategies' as Tab, label: 'Strategies', icon: TrendingUp },
  { id: 'bridge' as Tab, label: 'Bridge', icon: ArrowLeftRight },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 border-b border-accent/20 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200 border-b-2 ${
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-fg/60 hover:text-fg hover:border-accent/30'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
