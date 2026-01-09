
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ICONS } from '../constants';
import NameEditModal from './NameEditModal';
import CurrencySelectModal from './CurrencySelectModal';

const SettingsView: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingCurrency, setIsEditingCurrency] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold dark:text-white">Setup</h2>

      <div className="flex flex-col items-center py-8">
        <button 
          onClick={() => setIsEditingName(true)}
          className="relative group"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-4xl font-bold mb-4 group-hover:scale-105 transition-transform">
            {state.user.name[0]}
          </div>
          <div className="absolute bottom-6 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
            {ICONS.Edit}
          </div>
        </button>
        <h3 className="text-xl font-bold dark:text-white">{state.user.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">FinTracker Pro Gold</p>
      </div>

      <div className="space-y-4">
        <SettingItem 
          icon={ICONS.Dashboard} 
          title="Display Name" 
          value={state.user.name} 
          onClick={() => setIsEditingName(true)}
        />
        <SettingItem 
          icon={ICONS.Analytics} 
          title="Default Currency" 
          value={state.user.currency} 
          onClick={() => setIsEditingCurrency(true)}
        />
        <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
              {ICONS.Settings}
            </div>
            <div>
              <p className="font-bold dark:text-white">Dark Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Reduce eye strain</p>
            </div>
          </div>
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className={`w-14 h-8 rounded-full transition-all relative ${state.darkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${state.darkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="p-6 bg-rose-50 dark:bg-rose-900/10 rounded-3xl border border-rose-100 dark:border-rose-900/30">
        <p className="text-rose-600 dark:text-rose-400 text-xs font-bold uppercase mb-2">Danger Zone</p>
        <button 
          onClick={() => {
            if(confirm("Are you sure you want to reset all data?")) {
              localStorage.removeItem('fin_tracker_data');
              window.location.reload();
            }
          }}
          className="text-sm font-bold text-rose-600 hover:underline"
        >
          Reset All Application Data
        </button>
      </div>

      {isEditingName && (
        <NameEditModal 
          currentName={state.user.name}
          onClose={() => setIsEditingName(false)}
          onSave={(newName) => dispatch({ type: 'UPDATE_USER', payload: { name: newName } })}
        />
      )}

      {isEditingCurrency && (
        <CurrencySelectModal
          currentCurrency={state.user.currency}
          onClose={() => setIsEditingCurrency(false)}
          onSelect={(currency) => dispatch({ type: 'UPDATE_USER', payload: { currency } })}
        />
      )}
    </div>
  );
};

const SettingItem: React.FC<{ icon: React.ReactNode; title: string; value: string; onClick: () => void }> = ({ 
  icon, title, value, onClick 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
  >
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-bold dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Change preferences</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-sm font-semibold text-indigo-600">{value}</span>
      <div className="text-slate-400">{ICONS.Next}</div>
    </div>
  </button>
);

export default SettingsView;
