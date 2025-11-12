'use client';

import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react';

const stats = [
  {
    label: 'Total Value Locked',
    value: '$12.4M',
    change: '+15.3%',
    icon: DollarSign,
    positive: true,
  },
  {
    label: 'Active Agents',
    value: '1,247',
    change: '+8.2%',
    icon: Users,
    positive: true,
  },
  {
    label: 'Strategies Executed',
    value: '8,932',
    change: '+23.1%',
    icon: Zap,
    positive: true,
  },
  {
    label: 'Avg. APY',
    value: '18.7%',
    change: '+2.4%',
    icon: TrendingUp,
    positive: true,
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass rounded-lg p-4 hover:border-accent/40 transition-all duration-200 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className="w-5 h-5 text-accent" />
            <span
              className={`text-xs font-semibold ${
                stat.positive ? 'text-success' : 'text-error'
              }`}
            >
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-xs text-fg/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
