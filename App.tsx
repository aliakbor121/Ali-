import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import TransactionForm from './components/TransactionForm';
import { ICONS } from './constants';

const AppContent: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdding, setIsAdding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Splash Screen Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // 1.5s for that premium "boot" feel
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-indigo-600 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center text-indigo-600 shadow-2xl animate-bounce">
          {ICONS.Wallet}
        </div>
        <h1 className="mt-8 text-white text-2xl font-bold tracking-tight">FinTracker Pro</h1>
        <div className="absolute bottom-12 flex flex-col items-center">
          <div className="w-12 h-1 border-2 border-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-white animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
          </div>
          <p className="mt-4 text-white/60 text-xs font-medium uppercase tracking-widest">Premium Finance</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
        `}</style>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'history': return <HistoryView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onAddClick={() => setIsAdding(true)}
      >
        {renderContent()}
      </Layout>

      {isAdding && (
        <TransactionForm 
          onClose={() => setIsAdding(false)} 
          onSave={(t) => dispatch({ type: 'ADD_TRANSACTION', payload: t })}
        />
      )}
    </>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;