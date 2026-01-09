
import React, { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';
import { calculateSummary, formatCurrency } from '../utils/finance';
import { ICONS } from '../constants';
import { getSmartTips } from '../services/geminiService';
import NameEditModal from './NameEditModal';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useApp();
  const { income, expense, balance } = calculateSummary(state.transactions);
  const [tips, setTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    async function fetchTips() {
      setLoadingTips(true);
      const newTips = await getSmartTips(state.transactions);
      setTips(newTips);
      setLoadingTips(false);
    }
    fetchTips();
  }, [state.transactions.length]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setIsEditingName(true)}
          className="text-left group"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Welcome back,</p>
          <h1 className="text-2xl font-bold dark:text-white flex items-center">
            {state.user.name} 👋
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">
              {ICONS.Edit}
            </span>
          </h1>
        </button>
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          {ICONS.Wallet}
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-indigo-600 dark:bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <p className="text-indigo-100 text-sm font-medium mb-1">Total Balance</p>
        <h2 className="text-4xl font-bold mb-8">{formatCurrency(balance, state.user.currency)}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-3xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-indigo-100 text-xs mb-1">
              {ICONS.Income} <span>Income</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(income, state.user.currency)}</p>
          </div>
          <div className="bg-white/10 rounded-3xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-indigo-100 text-xs mb-1">
              {ICONS.Expense} <span>Expenses</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(expense, state.user.currency)}</p>
          </div>
        </div>
      </div>

      {/* Smart Tips Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold dark:text-white flex items-center space-x-2">
            <span>Smart Insights</span>
            <span className="text-xs font-normal text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">AI</span>
          </h3>
          {loadingTips && <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />}
        </div>
        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div key={idx} className="glass dark:bg-slate-800/50 p-4 rounded-3xl flex items-start space-x-4 border-none shadow-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                {ICONS.Trending}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold dark:text-white">Recent Transactions</h3>
          <button className="text-indigo-600 text-sm font-bold">See All</button>
        </div>
        <div className="space-y-3">
          {state.transactions.slice(0, 5).map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {t.type === 'income' ? ICONS.Income : ICONS.Expense}
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{t.category}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800 dark:text-white'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, state.user.currency)}
              </p>
            </div>
          ))}
          {state.transactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No transactions yet. Tap + to start!</p>
            </div>
          )}
        </div>
      </section>

      {isEditingName && (
        <NameEditModal 
          currentName={state.user.name}
          onClose={() => setIsEditingName(false)}
          onSave={(newName) => dispatch({ type: 'UPDATE_USER', payload: { name: newName } })}
        />
      )}
    </div>
  );
};

export default Dashboard;
