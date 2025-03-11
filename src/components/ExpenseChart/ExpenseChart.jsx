import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import './ExpenseChart.css'

const ExpenseChart = () => {
  const { transactions } = useSelector((state) => state.transactions);

  const data = transactions.reduce((acc, tx) => {
    const month = new Date(tx.updatedAt).toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.amount += tx.amount;
    } else {
      acc.push({ month, amount: tx.amount });
    }
    return acc;
  }, []);

  return (
    <>
        <h1>Trak with Chart</h1>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    </>
  );
};

export default ExpenseChart;
