"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchTransactions } from "@/api/transactionsApi";

export default function MonthlyChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const txs = await fetchTransactions();
        const monthTotals: Record<string, number> = {};

        txs.forEach((t) => {
          const month = new Date(t.date).toLocaleString("default", { month: "short" });
          monthTotals[month] = (monthTotals[month] || 0) + t.amount;
        });

        const formattedData = Object.entries(monthTotals).map(([month, amount]) => ({
          month,
          amount,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getTransactions();
  }, []);

  return (
    <div className="w-full md:w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Monthly Expenses
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#8884d8"
              tick={{ angle: -45, textAnchor: "end" }}
            />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
