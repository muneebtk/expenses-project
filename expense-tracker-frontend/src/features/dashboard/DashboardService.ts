import http from "../../api/http";
import type { Expense, ExpenseFilterParams } from "./Types";

export const fetchExpenses = async (params?: ExpenseFilterParams) => {
  const response = await http.get("/api/expenses/", { params });
  return response.data;
};

export const fetchCategorySummary = async (params?: ExpenseFilterParams) => {
  const response = await http.get("/api/summary/", { params });
  return response.data;
};

export const createExpense = async (expenseData: Omit<Expense, "id">) => {
  const response = await http.post("/api/expenses/", expenseData);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  await http.delete(`/api/expenses/${id}/`);
};
