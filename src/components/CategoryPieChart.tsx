/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchTransactions } from "@/api/transactionsApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#7B61FF", "#FF6B6B"];

export default function CategoryPieChart() {

  const [data, setData] = useState<any[]>([]);

  
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      const txs = await fetchTransactions();
      const categoryTotals: Record<string, number> = {};

      txs.forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

      // Format the data to match Pie chart expectations
      const formatted = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
      }));

      setData(formatted);
      console.log(formatted, 'formatted---------');
    };

    fetchData(); // Call the async function
  }, []); 
  console.log('data', data.length)
  return (
    <div className="w-full max-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Spending by Category
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width={'99%'} height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"   // This is the field we want to use as the value for each slice
              nameKey="name"    // This is the field for the label
              outerRadius={90}
              label
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
