import { useEffect, useState } from "react";
import { fetchTransactions, deleteTransaction } from "@/api/transactionsApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";

export default function TransactionList({ refresh }: { refresh: number }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | null } | null>(null);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, [refresh]);

  const handleDelete = async (id: string) => {
    const res = await deleteTransaction(id);
    if (res.success) {
      setAlert({ message: "Transaction deleted!", type: "success" });
    } else {
      setAlert({ message: "Error deleting transaction", type: "error" });
    }
    const updated = await fetchTransactions();
    setTransactions(updated);
  };

  if (loading) return <p>Loading transactions...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-white">Transaction List</CardTitle>
      </CardHeader>
      <CardContent>
        {alert && (
          <Alert variant={alert.type === "error" ? "destructive" : "success"}>
            {alert.message}
          </Alert>
        )}

        {transactions.length === 0 ? (
          <p className="text-muted-foreground">No transactions yet.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((t: any) => (
              <li key={t._id} className="flex justify-between items-center border p-2 rounded-md">
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.date} - ${t.amount}
                  </p>
                  <Badge className="mt-1">{t.category}</Badge>
                </div>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(t._id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
