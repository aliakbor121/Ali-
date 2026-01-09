
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface NameEditModalProps {
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const NameEditModal: React.FC<NameEditModalProps> = ({ currentName, onClose, onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold dark:text-white">Change Name</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors dark:text-slate-400"
          >
            {ICONS.Close}
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">What should we call you?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoFocus
              className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none text-lg font-semibold dark:text-white transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-5 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameEditModal;
