/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE = process.env.API_BASE || "http://localhost:8000/api/budgets";

// Fetch budgets for a specific month or all budgets
export const fetchBudgets = async (month: string) => {
  const response = await fetch(`${API_BASE}?month=${month}`);
  if (!response.ok) {
    throw new Error("Failed to fetch budgets");
  }
  const data = await response.json();
  return data;
};

// Create or update budget
export const createOrUpdateBudget = async (budgetData: {
  category: string;
  amount: number;
  month: string;
}) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budgetData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to save budget");
  }

  return data;
};
