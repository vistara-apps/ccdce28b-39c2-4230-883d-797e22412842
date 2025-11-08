'use client';

import { Home, Users, Zap, ArrowLeftRight, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/agents', icon: Users, label: 'Agents' },
    { href: '/strategies', icon: Zap, label: 'Strategies' },
    { href: '/bridge', icon: ArrowLeftRight, label: 'Bridge' },
    { href: '/notifications', icon: Bell, label: 'Alerts' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-theme-md transition-all duration-200 ${
                  isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-fg/60 hover:text-fg hover:bg-surface/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
