"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { CATEGORIES } from "@/constants/categories";
import { createTransaction } from "@/api/transactionsApi";

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ amount: "", date: "", description: "", category: "Other" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors: string[] = [];
    if (!form.amount || Number(form.amount) <= 0) errors.push("Amount must be greater than 0");
    if (!form.date) errors.push("Date is required");
    if (!form.description || form.description.trim().length < 2) errors.push("Description must be at least 2 characters");
    if (!form.category) errors.push("Category is required");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (errors.length > 0) {
      setError(errors.join(", "));
      setSuccess(null);
      return;
    }

    setLoading(true);
    const res = await createTransaction(form);
    console.log('res---',res);
    setLoading(false);

    if (!res) {
      setError(res.errors?.join(", ") || "Failed to add transaction");
      setSuccess(null);
      return;
    }

    setSuccess("Transaction added!");
    setForm({ amount: "", date: "", description: "", category: "Other" });
    setError('')
    onSuccess();
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      
      <div className="w-full h-5 mb-[20px] ">
      <h2 className="text-2xl font-semibold mb-6">Add Transaction</h2>
        <div className="">
          <Input 
            name="amount" 
            type="number" 
            placeholder="Amount" 
            value={form.amount} 
            onChange={handleChange} 
            className="w-full py-3 px-4 text-lg" 
          />
          <Input 
            name="date" 
            type="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full py-3 px-4 text-lg" 
          />
          <Input 
            name="description" 
            placeholder="Description" 
            value={form.description} 
            onChange={handleChange} 
            className="w-full py-3 px-4 text-lg" 
          />

          <Select value={form.category} onValueChange={(val) => setForm({ ...form, category: val })}>
            <SelectTrigger className="w-full py-3 px-4 text-lg">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={loading} 
          className="w-full py-3 mt-4 bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </Button>

        {error && <Alert variant="destructive">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
      </div>
      </div>
  );
}
