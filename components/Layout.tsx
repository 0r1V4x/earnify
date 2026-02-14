
import React from 'react';
import { View } from '../types';
import { 
  HomeIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  WalletIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeSolid, 
  CurrencyDollarIcon as CurrencySolid, 
  UserGroupIcon as GroupSolid, 
  WalletIcon as WalletSolid, 
  UserCircleIcon as UserSolid 
} from '@heroicons/react/24/solid';

interface LayoutProps {
  currentView: View;
  onViewChange: (view: View) => void;
  children: React.ReactNode;
  userCoins: number;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children, userCoins }) => {
  const navItems = [
    { id: 'home', label: 'Home', outline: HomeIcon, solid: HomeSolid },
    { id: 'earn', label: 'Earn', outline: CurrencyDollarIcon, solid: CurrencySolid },
    { id: 'invite', label: 'Invite', outline: UserGroupIcon, solid: GroupSolid },
    { id: 'wallet', label: 'Wallet', outline: WalletIcon, solid: WalletSolid },
    { id: 'profile', label: 'Profile', outline: UserCircleIcon, solid: UserSolid },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      {/* Top Header */}
      <header className="bg-white px-4 py-3 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-xl font-bold text-indigo-600">Earnify</h1>
        <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-full">
          <img src="https://cdn-icons-png.flaticon.com/512/1292/1292744.png" alt="coin" className="w-5 h-5" />
          <span className="text-sm font-bold text-indigo-700">{userCoins.toLocaleString()}</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center safe-bottom z-10">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = isActive ? item.solid : item.outline;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${
                isActive ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
