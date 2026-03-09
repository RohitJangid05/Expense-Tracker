import { ImCross } from "react-icons/im";
import { ExpenseContext } from "../ContextApi/ExpenseContext";
import { useContext, useState } from "react";

const ExpenseForm = () => {
  const { form, setForm, addTransaction } =
    useContext(ExpenseContext);

  const getInitialState = () => ({
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
    expense_type: "",
    credit_or_debit: "",
    name: "",
  });

  const [formData, setFormData] =
    useState(getInitialState());

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.amount ||
      !formData.category ||
      !formData.credit_or_debit
    ) {
      alert("Fill required fields");
      return;
    }

    addTransaction(formData);

    setFormData(getInitialState());
    setForm(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full flex flex-col bg-white rounded-t-3xl gap-5 px-5 fixed left-0 transition-all duration-300 ease-in-out
      ${form
        ? "bottom-[14vh] opacity-100"
        : "-bottom-full opacity-0"}`}
    >
      <div className="flex items-center py-2">
        <ImCross onClick={() => setForm(false)} />
        <h1 className="w-full text-2xl text-center">
          Add Transaction
        </h1>
      </div>

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Enter Amount"
        className="border-b pb-2 outline-none"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border-b pb-2 outline-none"
      >
        <option value="">Category</option>
        <option value="food">Food</option>
        <option value="tea/coffee">Tea/Coffee</option>
        <option value="rent">Rent</option>
        <option value="fare">Fare</option>
        <option value="other">Other</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="border-b pb-2 outline-none"
      />

      <select
        name="expense_type"
        value={formData.expense_type}
        onChange={handleChange}
        className="border-b pb-2 outline-none"
      >
        <option value="">Expense Type</option>
        <option value="personal">Personal</option>
        <option value="others">Others</option>
      </select>

      {formData.expense_type === "others" && (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-b pb-2 outline-none"
        />
      )}

      <select
        name="credit_or_debit"
        value={formData.credit_or_debit}
        onChange={handleChange}
        className="border-b pb-2 outline-none"
      >
        <option value="">Credit/Debit</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <input
        type="text"
        name="note"
        value={formData.note}
        onChange={handleChange}
        placeholder="Note"
        className="border-b pb-2 outline-none"
      />

      <button
        type="submit"
        className="bg-green-500 py-3 text-white text-xl rounded-xl hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;