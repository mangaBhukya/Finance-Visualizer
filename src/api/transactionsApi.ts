/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const fetchTransactions = async () => {
  const res = await axios.get(`${API_BASE}/transactions`);
  console.log(' res.data-----',  res.data)
  return res.data;  // axios response is wrapped in a `data` field
};

export const createTransaction = async (data: any) => {
  const res = await axios.post(`${API_BASE}/transactions`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateTransaction = async (id: string, data: any) => {
  const res = await axios.put(`${API_BASE}/transactions/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteTransaction = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/transactions/${id}`);
  return res.data;
};
