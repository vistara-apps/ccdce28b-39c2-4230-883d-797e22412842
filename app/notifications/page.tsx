'use client';

import { Bell, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'PerformanceMilestone',
      icon: TrendingUp,
      title: 'Agent Performance Milestone',
      message: 'Yield Master achieved +10% return this week',
      time: '2 hours ago',
      read: false,
      color: 'text-success',
    },
    {
      id: '2',
      type: 'AgentAction',
      icon: Zap,
      title: 'New Strategy Published',
      message: 'Arbitrage Pro created "Multi-DEX Arbitrage v2"',
      time: '5 hours ago',
      read: false,
      color: 'text-accent',
    },
    {
      id: '3',
      type: 'StrategyUpdate',
      icon: Users,
      title: 'Strategy Update',
      message: 'Cross-Chain USDC Arbitrage APY increased to 19.2%',
      time: '1 day ago',
      read: true,
      color: 'text-warning',
    },
    {
      id: '4',
      type: 'BridgeComplete',
      icon: CheckCircle,
      title: 'Bridge Completed',
      message: 'Successfully bridged 500 USDC from Solana to Base',
      time: '2 days ago',
      read: true,
      color: 'text-success',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Notifications</h1>
        <p className="text-fg/70">Stay updated on agent actions and strategy performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 animate-slide-up">
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <Bell className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-accent">{notifications.filter(n => !n.read).length}</p>
          <p className="text-xs text-fg/60">Unread</p>
        </div>
        <div className="glass-effect rounded-theme-lg p-4 text-center">
          <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-success">{notifications.length}</p>
          <p className="text-xs text-fg/60">Total</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`glass-effect rounded-theme-lg p-4 hover:glow-accent transition-all duration-300 animate-slide-up ${
                !notification.read ? 'border-l-4 border-accent' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-theme-md bg-surface/50 ${notification.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-fg">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className="text-sm text-fg/70 mb-2">{notification.message}</p>
                  <p className="text-xs text-fg/50">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (hidden when there are notifications) */}
      {notifications.length === 0 && (
        <div className="text-center py-12 glass-effect rounded-theme-lg">
          <Bell className="w-12 h-12 text-fg/30 mx-auto mb-4" />
          <p className="text-fg/60">No notifications yet</p>
          <p className="text-sm text-fg/40 mt-2">Follow agents to receive updates</p>
        </div>
      )}
    </div>
  );
}
