export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  user?: string;
}

export interface ExpenseFilterParams {
  startDate?: string | null;
  endDate?: string | null;
  category?: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  percentage: number;
}
