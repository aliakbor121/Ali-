
import React, { useState } from 'react';
import { Transaction, TransactionType, CATEGORIES } from '../types';
import { ICONS } from '../constants';

interface TransactionFormProps {
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  initialData?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onSave, initialData }) => {
  const [type, setType] = useState<TransactionType>(initialData?.type || 'expense');
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [category, setCategory] = useState(initialData?.category || CATEGORIES.expense[0]);
  const [date, setDate] = useState(initialData?.date.split('T')[0] || new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(initialData?.note || '');

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    onSave({
      id: initialData?.id || Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      note
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-slate-900 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800">
        <h2 className="text-xl font-bold dark:text-white">{initialData ? 'Edit Record' : 'Add New'}</h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-400">
          {ICONS.Close}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        {/* Type Selector */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          {(['expense', 'income'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setCategory(CATEGORIES[t][0]);
              }}
              className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all capitalize ${
                type === t 
                  ? t === 'expense' ? 'bg-rose-500 text-white shadow-md' : 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Amount</label>
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-light text-slate-400">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 bg-transparent text-5xl font-light focus:outline-none dark:text-white"
              autoFocus
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Category</label>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES[type].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-3 px-2 text-xs font-medium rounded-2xl border transition-all ${
                  category === cat
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Note */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 dark:text-white focus:ring-2 ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Notes</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Lunch, taxi..."
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 dark:text-white focus:ring-2 ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t dark:border-slate-800">
        <button
          onClick={handleSave}
          className="w-full py-5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-[0.98] transition-all"
        >
          Save Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
