import React from "react";
import "./ExpenseList.css"; // Import CSS for styling

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface ExpenseListProps {
  expenses: Expense[];
  members: { id: string; name: string }[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, members }) => {
  return (
    <div className="expense-list-container">
      <h2 className="expense-list-heading">Expenses</h2>

      {expenses.length === 0 ? (
        <p className="no-expense-message">No expenses yet. Start adding some!</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <h3 className="expense-title">{expense.title}</h3>
              <p className="expense-detail">
                <span className="expense-label">💰 Amount:</span> ${expense.amount}
              </p>
              <p className="expense-detail">
                <span className="expense-label">🧑 Paid By:</span>{" "}
                {members.find((m) => m.id === expense.paidBy)?.name ?? "Unknown"}
              </p>
              <p className="expense-detail">
                <span className="expense-label">🔄 Split Between:</span>{" "}
                {expense.splitBetween
                  .map((id) => members.find((m) => m.id === id)?.name)
                  .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;