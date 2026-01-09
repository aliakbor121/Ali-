
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string; // ISO string
  note?: string;
}

export interface User {
  name: string;
  currency: string;
}

export interface AppState {
  transactions: Transaction[];
  user: User;
  darkMode: boolean;
}

export const CATEGORIES = {
  expense: [
    'Food', 'Transport', 'Shopping', 'Rent', 'Bills', 'Health', 'Entertainment', 'Education', 'Others'
  ],
  income: [
    'Salary', 'Freelance', 'Investment', 'Gift', 'Refund', 'Others'
  ]
};

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#F87171',
  Transport: '#60A5FA',
  Shopping: '#F472B6',
  Rent: '#A78BFA',
  Bills: '#FBBF24',
  Health: '#34D399',
  Entertainment: '#818CF8',
  Salary: '#10B981',
  Freelance: '#3B82F6',
  Investment: '#6366F1',
  Others: '#94A3B8'
};
