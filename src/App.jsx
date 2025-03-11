import React from "react";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import ExpenseChart from "./components/ExpenseChart/ExpenseChart";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import './App.css'

const App = () => (
  <div className="container">
    <h1>Transaction Tracker</h1>
    <Provider store={store}>
      <TransactionForm />
      <TransactionList />
      <ExpenseChart />
    </Provider>
  </div>
);

export default App;
