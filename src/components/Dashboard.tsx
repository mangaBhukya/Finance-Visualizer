"use client";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/api/transactionsApi";


export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  const recent = transactions.slice(0, 5);

  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="w-[350px] ml-[20px] mb-[20px]">
        <h2 className="text-2xl font-semibold">Total: ${total}</h2>
        <div className="p-4 border rounded-lg shadow-md bg-blue-50">
          <h3 className="text-xl font-semibold ml-[20px] text-black">Categories</h3>
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <div key={cat}>
              <h4 className="font-semibold ml-[20px] text-gray-800">{cat}</h4>
              <p className="text-xl font-medium ml-[20px] text-gray-700">${amt}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="mb-[20px]">
       
        <div className="w-2/3 border rounded-lg shadow-md bg-blue">
          <h3 className="font-bold text-lg mb-2 ml-[20px]">Recent Transactions</h3>
          <table className="w-full table-auto  mb-10">
            <thead className="text-white">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t: any) => (
                <tr key={t._id} className="border-t hover:bg-gray-50 hover:text-black">
                  <td className="px-4 py-2">{t.date}</td>
                  <td className="px-4 py-2">{t.description}</td>
                  <td className="px-4 py-2">{t.category}</td>
                  <td className="px-4 py-2 text-left font-semibold text-gray-700">
                    ${t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
