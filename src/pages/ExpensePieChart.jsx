import { useContext, useMemo } from "react";
import { ExpenseContext } from "../ContextApi/ExpenseContext";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28BFE",
  "#FF6699",
  "#33CC99",
  "#FF4444",
  "#8884D8"
];

const ExpensePieChart = () => {
  const { transactions } = useContext(ExpenseContext);

  // 1️⃣ Filter valid expense transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (expense) =>
        expense.expense_type !== "others" &&
        expense.credit_or_debit === "debit"
    );
  }, [transactions]);

  // 2️⃣ Group by category and sum amounts
  const chartData = useMemo(() => {
    const grouped = filteredTransactions.reduce((acc, item) => {
      const amount = Number(item.amount);

      if (!acc[item.category]) {
        acc[item.category] = 0;
      }

      acc[item.category] += amount;

      return acc;
    }, {});

    // Convert object → array & sort by highest expense
    return Object.keys(grouped)
      .map((key) => ({
        name: key,
        value: grouped[key]
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.value, 0);
  }, [chartData]);

  return (
    <div className="w-full h-screen bg-white rounded-xl shadow">
      <h2 className="text-xl text-center font-semibold p-6">
        Expense Distribution
      </h2>
      <hr />
      {chartData.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No expense data available
        </p>
      ) : (
        <>
          {chartData.length > 0 && (
            <div className="mt-4 font-semibold text-lg px-6 text-center">
              Total Expense: ₹{totalExpense}
            </div>
          )}
          <ResponsiveContainer width="100%" height="50%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => `₹${value}`}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default ExpensePieChart;