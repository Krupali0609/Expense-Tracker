import React from "react";
import { Link } from "react-router-dom"
import "./Home.css"

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">Welcome to Expense Tracker</h2>
      <div className="home-content">
        <img src="https://www.shutterstock.com/shutterstock/photos/2382150379/display_1500/stock-vector-finance-control-hand-drawn-composition-expense-tracker-in-mobile-bank-account-smartphone-app-with-2382150379.jpg" alt="Expense Tracker" className="home-image" />

        <div className="home-text">
          <p className="home-description">
            This app helps you and your friends keep track of group expenses. Add members, log shared expenses, and get clear summaries of who owes whom!
          </p>

          <Link to="/group" className="get-started-btn">
            Get Started
          </Link>

          </div>
          </div>
    </div>
  );
};

export default Home;
