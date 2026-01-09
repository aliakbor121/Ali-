
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useApp } from '../store/AppContext';
import { getCategoryData } from '../utils/finance';
import { CATEGORY_COLORS } from '../types';

const AnalyticsView: React.FC = () => {
  const { state } = useApp();
  const expenseData = getCategoryData(state.transactions, 'expense');
  const incomeData = getCategoryData(state.transactions, 'income');

  // Last 6 months dummy trend logic for demo
  const monthlyData = [
    { name: 'Jan', income: 4500, expense: 3200 },
    { name: 'Feb', income: 4200, expense: 2800 },
    { name: 'Mar', income: 4800, expense: 4100 },
    { name: 'Apr', income: 5100, expense: 3500 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-8">
      <h2 className="text-2xl font-bold dark:text-white">Analysis</h2>

      {/* Expense Distribution */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm">
        <h3 className="text-lg font-bold mb-6 dark:text-white">Spending by Category</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#CBD5E1'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {expenseData.slice(0, 4).map((entry) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[entry.name] }} />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Income vs Expense Monthly */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm">
        <h3 className="text-lg font-bold mb-6 dark:text-white">Monthly Comparison</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip 
                 cursor={{fill: 'transparent'}}
                 contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="income" fill="#10B981" radius={[10, 10, 0, 0]} />
              <Bar dataKey="expense" fill="#F43F5E" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Legend Card */}
      <div className="glass dark:bg-slate-800/50 p-6 rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold dark:text-white">Analytics Summary</span>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-full uppercase">Real-time</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Your highest expense this month is <span className="text-rose-500 font-bold">Food</span>. 
          You've saved 24% more compared to last month.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsView;
