import React, { useState } from "react";
import "./ExpenseForm.css"; // Import CSS file

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
  members: { id: string; name: string }[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, members }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState<string>("");
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && amount && paidBy && splitBetween.length > 0) {
      onAddExpense({
        title,
        amount,
        paidBy,
        splitBetween,
      });
      setTitle("");
      setAmount(0);
      setPaidBy("");
      setSplitBetween([]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSplitBetween((prev) =>
      prev.includes(id)
        ? prev.filter((memberId) => memberId !== id) // REMOVE if already in the list
        : [...prev, id] // ADD if not in the list
    );
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2 className="expense-form-title">Add an Expense</h2>

      <input
        value={title}
        type="text"
        placeholder="Enter the title"
        onChange={(e) => setTitle(e.target.value)}
        className="expense-input"
      />

      <input
        value={amount}
        type="number"
        placeholder="Enter the expense amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        className="expense-input"
      />

      <select
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        className="expense-select"
      >
        <option value="">Select who paid</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>

      <div className="split-between-container">
        <h3 className="split-between-title">Split Between:</h3>
        {members.map((member) => (
          <label key={member.id} className="split-between-label">
            <input
              type="checkbox"
              checked={splitBetween.includes(member.id)}
              onChange={() => handleCheckboxChange(member.id)}
              className="split-between-checkbox"
            />
            {member.name}
          </label>
        ))}
      </div>

      <button type="submit" className="expense-submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
