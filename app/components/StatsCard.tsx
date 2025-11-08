'use client';

import { type ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  trend: string;
}

export function StatsCard({ icon, label, value, trend }: StatsCardProps) {
  const isPositive = trend.startsWith('+');

  return (
    <div className="glass-effect rounded-theme-lg p-4">
      <div className="flex items-center gap-2 mb-2 text-accent">
        {icon}
        <span className="text-xs text-fg/60">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <span
          className={`text-xs font-medium ${
            isPositive ? 'text-success' : 'text-error'
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
