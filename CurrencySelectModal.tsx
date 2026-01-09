
import React from 'react';
import { ICONS } from '../constants';

interface CurrencySelectModalProps {
  currentCurrency: string;
  onClose: () => void;
  onSelect: (currency: string) => void;
}

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

const CurrencySelectModal: React.FC<CurrencySelectModalProps> = ({ currentCurrency, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 pb-10 shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-4 duration-300 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h2 className="text-2xl font-bold dark:text-white">Choose Currency</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-400"
          >
            {ICONS.Close}
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto pr-2 hide-scrollbar">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onSelect(c.code);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                currentCurrency === c.code 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  currentCurrency === c.code ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-700 text-indigo-600'
                }`}>
                  {c.symbol}
                </div>
                <div className="text-left">
                  <p className="font-bold">{c.code}</p>
                  <p className={`text-xs ${currentCurrency === c.code ? 'text-indigo-100' : 'text-slate-500'}`}>{c.name}</p>
                </div>
              </div>
              {currentCurrency === c.code && (
                <div className="bg-white/20 rounded-full p-1">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencySelectModal;
