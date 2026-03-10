import { useContext } from "react";
import { ExpenseContext } from "../ContextApi/ExpenseContext";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const { transactions, deleteTransaction } = useContext(ExpenseContext);

  // Filter non-"others"
  const filteredTransaction = transactions.filter(
    (expense) => expense.expense_type !== "others"
  );

  // Calculate total balance
  const totalBalance = filteredTransaction.reduce((acc, item) => {
    const amount = Number(item.amount);
    return item.credit_or_debit === "credit"
      ? acc + amount
      : acc - amount;
  }, 0);

  return (
    <div className="h-[68vh]">
      {/* Header */}
      <h1 className="text-white text-2xl h-30 flex items-center p-4">
        Total Expense: ₹{totalBalance}
      </h1>

      <div className="h-full overflow-y-auto bg-white rounded-t-3xl p-4">

        {filteredTransaction.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No transactions yet
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Note</th>
                <th className="text-right py-2">Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredTransaction.map((item,index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 capitalize">{item.category}</td>
                  <td className="py-2">{item.date}</td>
                  <td className="py-2 text-gray-500">
                    {item.note || "-"}
                  </td>
                  <td
                    className={`py-2 text-right font-semibold ${
                      item.credit_or_debit === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.credit_or_debit === "credit" ? "+" : "-"}₹
                    {item.amount}
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => deleteTransaction(item.id)}
                      className="text-xl text-red-500 px-5"
                    >
                      <MdDelete/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;