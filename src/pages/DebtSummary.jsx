import { useContext, useMemo } from "react";
import { ExpenseContext } from "../ContextApi/ExpenseContext";
import { MdDelete } from "react-icons/md";

const DebtSummary = () => {
  const { transactions, deleteTransaction } = useContext(ExpenseContext);

  // 1 Filter non-personal transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (expense) => expense.expense_type !== "personal"
    );
  }, [transactions]);

  //  Group by unique name
  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {});
  }, [filteredTransactions]);

  //  Calculate overall balance
  const totalBalance = useMemo(() => {
    return filteredTransactions.reduce((acc, item) => {
      const amount = Number(item.amount);
      return item.credit_or_debit === "credit"
        ? acc + amount
        : acc - amount;
    }, 0);
  }, [filteredTransactions]);

  return (
    <div className="h-[68vh] ">
      {/* Overall Balance */}
      <h1 className="text-white text-2xl h-30 flex items-center p-4">
        Total Balance: ₹{totalBalance}
      </h1>

      <div className="h-full overflow-y-auto bg-white rounded-t-3xl p-4 space-y-6">

        {/* Empty State */}
        {Object.keys(groupedTransactions).length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No debt transactions yet
          </p>
        )}

        {/* Render Table Per Unique Name */}
        {Object.entries(groupedTransactions).map(([name, records]) => {

          // Calculate individual balance
          const personBalance = records.reduce((acc, item) => {
            const amount = Number(item.amount);
            return item.credit_or_debit === "credit"
              ? acc + amount
              : acc - amount;
          }, 0);

          return (
            <div
              key={name}
              className="border rounded-xl shadow-sm p-4"
            >
              {/* Person Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold">{name}</h2>
                <span
                  className={`font-semibold ${
                    personBalance >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{personBalance}
                </span>
              </div>

              {/* Transactions Table */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="text-left py-2">Note</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-right py-2">Amount</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((item,index) => (
                    <tr key={item.id} className={`${
        index !== records.length - 1 ? "border-b" : ""
      }`}>
                      <td className="py-2">{item.note}</td>
                      <td className="py-2">{item.date}</td>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebtSummary;