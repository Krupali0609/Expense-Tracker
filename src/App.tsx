import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"; 
import './App.css';
import GroupForm from './components/GroupForm';
import ExpenseForm from './components/ExpenseForm';
import MemberSummary from './components/MemberSummary';
import ExpenseList from './components/ExpenseList';
import Home from "./pages/Home"; 
export  interface Member{
  id: string,
  name:string
}

export interface Expense{
  id: string,
  title:string,
  amount:number,
  paidBy:string,
  splitBetween:string []
}

function App() {

  
  const[members, setMembers]=useState<Member[]>([])
  const[expenses, setExpenses]=useState<Expense[]>([])

  const onAddMember=(name:string)=>{
    const newMember={id:Date.now().toString(), name}
    setMembers([...members, newMember])

  }
  const onAddExpense=(expense:Omit<Expense, "id">)=>{
    const newExpense={...expense,id:Date.now().toString()}
    setExpenses([...expenses,newExpense])
  }
  return (
    <>
    <Router>
      {/* Updated header with new class names */}
      <header className="app-header">
        <h1 className="app-title">Expense Tracker</h1>
        <nav className="nav-container">
        <NavLink 
  to="/" 
  className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
  end
>
  Home
</NavLink>
<NavLink 
  to="/group" 
  className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
>
  Add Members
</NavLink>
<NavLink 
  to="/expense" 
  className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
>
  Add Expense
</NavLink>
<NavLink 
  to="/expenses" 
  className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
>
  View Expenses
</NavLink>
<NavLink 
  to="/summary" 
  className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
>
  View Summary
</NavLink>
        </nav>
      </header>

      {/* Content section with updated class */}
      <div className="app-content">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/group" element={<GroupForm  onAddMember={onAddMember} members={members}/>} />
          <Route path="/expense" element={<ExpenseForm  members={members} onAddExpense={onAddExpense}/>} />
          <Route path="/expenses" element={<ExpenseList  expenses={expenses} members={members}/>} />
          <Route path="/summary" element={<MemberSummary  expenses={expenses} members={members}/>} />
        </Routes>
      </div>
    </Router>
        

      

</>
  );
    
  
}

export default App;
