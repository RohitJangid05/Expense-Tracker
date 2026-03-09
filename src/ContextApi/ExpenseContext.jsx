import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [form, setForm] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedData);
  }, []);

  // Sync to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (data) => {
    setTransactions((prev) => [
      ...prev,
      { ...data, id: Date.now() },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        form,
        setForm,
        transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;