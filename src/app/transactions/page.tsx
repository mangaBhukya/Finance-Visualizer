"use client";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useState } from "react";

export default function TransactionsPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>
       <div className="flex lg:flex-row gap-6">
              <div className="flex-1">
                 <TransactionForm  onSuccess={() => setRefresh((prev) => prev + 1)}  />
              </div>
              <div className="flex-1">
                 <TransactionList refresh={refresh} />
              </div>
            </div>
     
     
    </div>
  );
}
