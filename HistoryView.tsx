
import React, { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { formatCurrency, generateCSV, downloadFile } from '../utils/finance';
import { ICONS } from '../constants';
import { TransactionType, CATEGORIES } from '../types';

const HistoryView: React.FC = () => {
  const { state, dispatch } = useApp();
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    return state.transactions.filter(t => {
      const matchType = filterType === 'all' || t.type === filterType;
      const matchSearch = t.category.toLowerCase().includes(search.toLowerCase()) || 
                          (t.note || '').toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [state.transactions, filterType, search]);

  const handleExport = () => {
    const csv = generateCSV(state.transactions);
    downloadFile(csv, 'transactions_export.csv', 'text/csv');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">History</h2>
        <button 
          onClick={handleExport}
          className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {ICONS.Export}
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search category or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border-none shadow-sm focus:ring-2 ring-indigo-500 outline-none dark:text-white"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {ICONS.Dashboard}
          </div>
        </div>

        <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
          {(['all', 'expense', 'income'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredTransactions.map((t) => (
          <div key={t.id} className="group relative bg-white dark:bg-slate-800/50 p-4 rounded-3xl flex items-center justify-between shadow-sm transition-all">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {t.type === 'income' ? ICONS.Income : ICONS.Expense}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white">{t.category}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(t.date).toLocaleDateString()} • {t.note || 'No note'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800 dark:text-white'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount, state.user.currency)}
              </p>
              <button 
                onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: t.id })}
                className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
              >
                {ICONS.Delete}
              </button>
            </div>
          </div>
        ))}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400">No transactions match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
