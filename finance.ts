
import { Transaction } from '../types';

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateSummary = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;
  return { income, expense, balance };
};

export const getCategoryData = (transactions: Transaction[], type: 'income' | 'expense') => {
  const filtered = transactions.filter((t) => t.type === type);
  const groups: Record<string, number> = {};
  filtered.forEach((t) => {
    groups[t.category] = (groups[t.category] || 0) + t.amount;
  });
  return Object.entries(groups).map(([name, value]) => ({ name, value }));
};

export const generateCSV = (transactions: Transaction[]) => {
  const header = 'Date,Type,Category,Amount,Note\n';
  const rows = transactions
    .map((t) => `${t.date},${t.type},${t.category},${t.amount},"${t.note || ''}"`)
    .join('\n');
  return header + rows;
};

export const downloadFile = (content: string, fileName: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};
