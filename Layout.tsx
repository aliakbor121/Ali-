import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onAddClick }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Network Status Toast (Material 3 style) */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-[100] p-4 animate-in slide-in-from-top duration-300">
          <div className="bg-slate-800 text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              <p className="text-sm font-medium">Working Offline</p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Local Data Only</p>
          </div>
        </div>
      )}

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24 px-4 pt-6">
        {children}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={onAddClick}
        className="absolute bottom-24 right-6 w-14 h-14 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
      >
        {ICONS.Plus}
      </button>

      {/* Bottom Navigation */}
      <nav className="h-20 glass dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 fixed bottom-0 left-0 right-0 max-w-md mx-auto flex items-center justify-around px-2 z-50">
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
          icon={ICONS.Dashboard} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={ICONS.History} 
          label="History" 
        />
        <div className="w-14" /> {/* FAB Area */}
        <NavButton 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')} 
          icon={ICONS.Analytics} 
          label="Charts" 
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
          icon={ICONS.Settings} 
          label="Setup" 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ 
  active, onClick, icon, label 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
      active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
    }`}
  >
    <div className={`p-1 rounded-xl transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;