/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchTransactions } from "@/api/transactionsApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BudgetsPage() {
  const [budgets] = useState<Record<string, number>>({
    Food: 2000,
    Transport: 1000,
    Utilities: 1500,
    Entertainment: 1200,
    Health: 1000,
    Shopping: 2000,
    Rent: 1000,
    Other: 1500,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTransactions().then((transactions) => {
      const spent = transactions.reduce((acc: Record<string, number>, t: any) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

      const combined = Object.keys(budgets).map((category) => ({
        category,
        budget: budgets[category],
        spent: spent[category] || 0,
      }));

      setChartData(combined);
    });
  }, [budgets]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Budgets</h1>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#82ca9d" />
              <Bar dataKey="spent" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
