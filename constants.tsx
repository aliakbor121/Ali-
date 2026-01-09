
import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  PieChart as ChartIcon, 
  Settings as SettingsIcon,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
  FileDown,
  ChevronRight,
  X,
  Trash2,
  Edit2
} from 'lucide-react';

export const ICONS = {
  Dashboard: <LayoutDashboard size={24} />,
  History: <History size={24} />,
  Analytics: <ChartIcon size={24} />,
  Settings: <SettingsIcon size={24} />,
  Plus: <Plus size={24} />,
  Income: <ArrowUpCircle size={20} />,
  Expense: <ArrowDownCircle size={20} />,
  Wallet: <Wallet size={24} />,
  Trending: <TrendingUp size={24} />,
  Export: <FileDown size={20} />,
  Next: <ChevronRight size={20} />,
  Close: <X size={24} />,
  Delete: <Trash2 size={20} />,
  Edit: <Edit2 size={20} />
};
