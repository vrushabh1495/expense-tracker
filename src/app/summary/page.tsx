"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ExpenseResponse {
  expenses: Array<{
    id: number;
    Item: string;
    Price: number;
    Date: string;
  }>;
}

type Expense = {
  id: number;
  Item: string;
  Price: number;
  Date: string;
};

export default function SummaryPage() {
  const [data, setData] = useState<Expense[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/expense");
        const json = (await response.json()) as ExpenseResponse;
        setData(json.expenses);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const total = data
    ? data.reduce((sum, expense) => sum + expense.Price, 0)
    : 0;

  return (
    <div>
      {data && data.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Item</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((expense) => (
              <tr key={expense.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.Item}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.Price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(expense.Date).toLocaleDateString()}
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2">{total}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>No expenses found</div>
      )}
    <Link href="/" className="bg-blue-600 text-white px-4 rounded"> Back to Home </Link>
    </div>
  );
}
