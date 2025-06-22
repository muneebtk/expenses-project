import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchExpenses,
  fetchCategorySummary,
  createExpense as createExpenseApi,
  deleteExpense as deleteExpenseApi,
} from "./dashboardService";
import type { Expense, CategorySummary, ExpenseFilterParams } from "./Types";

interface DashboardState {
  expenses: Expense[];
  categorySummary: CategorySummary[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  expenses: [],
  categorySummary: [],
  loading: false,
  error: null,
};

export const loadExpenses = createAsyncThunk(
  "dashboard/loadExpenses",
  async (params?: ExpenseFilterParams) => {
    return await fetchExpenses(params);
  }
);

export const loadCategorySummary = createAsyncThunk(
  "dashboard/loadCategorySummary",
  async (params?: ExpenseFilterParams) => {
    return await fetchCategorySummary(params);
  }
);

export const addExpense = createAsyncThunk(
  "dashboard/addExpense",
  async (expenseData: Omit<Expense, "id">, { dispatch }) => {
    const newExpense = await createExpenseApi(expenseData);
    dispatch(loadExpenses());
    dispatch(loadCategorySummary());
    return newExpense;
  }
);

export const removeExpense = createAsyncThunk(
  "dashboard/removeExpense",
  async (id: string, { dispatch }) => {
    await deleteExpenseApi(id);
    dispatch(loadExpenses());
    dispatch(loadCategorySummary());
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(loadExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load expenses";
      })
      .addCase(loadCategorySummary.fulfilled, (state, action) => {
        state.categorySummary = action.payload;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete expense";
      });
  },
});

export default dashboardSlice.reducer;
