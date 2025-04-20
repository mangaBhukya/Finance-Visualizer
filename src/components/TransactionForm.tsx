"use client";
import { useState } from "react";
import { createTransaction } from "@/api/transactionsApi";
import { CATEGORIES } from "@/constants/categories";

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "Other",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.date || !form.description) return;
    await createTransaction(form);
    setForm({ amount: "", date: "", description: "" });
    onSuccess();
  };

  return (
    <div className="space-y-2">
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
