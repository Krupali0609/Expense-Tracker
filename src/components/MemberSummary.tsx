import React from 'react';
import './MemberSummary.css';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface MemberSummaryProps {
  expenses: Expense[];
  members: { id: string; name: string }[];
}

const MemberSummary: React.FC<MemberSummaryProps> = ({ members, expenses }) => {
  const balances: Record<string, number> = {};

  // Initialize balances for each member
  members.forEach(member => {
    balances[member.id] = 0;
  });

  // **Total Expense Calculation**
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const amountOwedPerPerson = totalExpense / members.length; // Each person's fair share

  // Calculate how much each member paid
  expenses.forEach(expense => {
    balances[expense.paidBy] += expense.amount; // Crediting the person who paid
  });

  // **Who Owes Money** - Added the person to whom they owe the money
  const owesMoneyList = members
    .map(member => {
      const paid = balances[member.id]; // Total paid by the member
      const amountOwed = amountOwedPerPerson; // Fair share
      const amountOwes = amountOwed - paid; // If positive, they owe money
      if (amountOwes > 0) {
        // Find who they owe based on the total expense
        const owedTo = members.find(m => m.id !== member.id); // Just an example for illustration
        return { id: member.id, name: member.name, amount: amountOwes, owedTo: owedTo?.name };
      }
      return null;
    })
    .filter(item => item !== null) as { name: string; amount: number; owedTo: string }[]; // Type assertion

  // **Who Gets Back Money**
  const getsBackMoneyList = members
    .map(member => {
      const paid = balances[member.id]; // Total paid by the member
      const amountOwed = amountOwedPerPerson; // Fair share
      const amountGetsBack = paid - amountOwed; // If positive, they get money back
      return { id: member.id, name: member.name, amount: amountGetsBack };
    })
    .filter(({ amount }) => amount > 0.01) // Ignore small floating errors
    .map(({ name, amount }) => `${name} should get back $${amount.toFixed(2)}`);

  // **Summary of Payments**
  const summaryList = members
    .map(member => {
      const paid = balances[member.id]; // Total paid by the member
      const amountOwed = amountOwedPerPerson; // Fair share
      const amountOwes = amountOwed - paid; // Positive amount they owe
      const amountGetsBack = paid - amountOwed; // Positive amount they should get back

      return {
        id: member.id,
        name: member.name,
        paid,
        amountOwes,
        amountGetsBack,
      };
    });

  return (
    <div className="member-summary-container">
      <h2 className="member-summary-title">Member Summary</h2>

      {/* Who Owes Money */}
      <div className="owes-money-section">
        <h3 className="section-title">Who Owes Money:</h3>
        {owesMoneyList.length > 0 ? (
          <ul className="owes-list">
            {owesMoneyList.map((info, index) => (
              <li key={index} className="owes-item">
                {info.name} owes {info.owedTo} ${info.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-owes">🎉 No one owes money!</p>
        )}
      </div>

      {/* Who Gets Back Money */}
      <div className="gets-back-money-section">
        <h3 className="section-title">Who Gets Back Money:</h3>
        {getsBackMoneyList.length > 0 ? (
          <ul className="gets-back-list">
            {getsBackMoneyList.map((info, index) => (
              <li key={index} className="gets-back-item">
                {info}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-gets-back">🎉 No one needs to get back money!</p>
        )}
      </div>

      {/* Summary List */}
      <div className="summary-list-section">
        <h3 className="section-title">Summary:</h3>
        <ul className="summary-list">
          {summaryList.map(({ name, paid, amountOwes, amountGetsBack }, index) => (
            <li key={index} className="summary-item">
              <h4 className="summary-name">{name}</h4>
              <p>Total Paid: ${paid.toFixed(2)}</p>
              <p>Amount Owes: ${amountOwes > 0 ? amountOwes.toFixed(2) : "0.00"}</p>
              <p>Amount Gets Back: ${amountGetsBack > 0 ? amountGetsBack.toFixed(2) : "0.00"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberSummary;
