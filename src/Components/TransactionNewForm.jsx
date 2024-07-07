import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const TransactionNewForm = () => {
  let navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    itemName: "",
    amount: 0,
    category: "",
    from: "",
    date: "",
  });

  const handleTextChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction();
    setTransaction({
      itemName: "",
      amount: 0,
      category: "",
      from: "",
      date: "",
    });
  };

  const addTransaction = () => {
    fetch(`${API}/transactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/transactions`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      New Transaction
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">
          Item Name:
          <input
            type="text"
            id="itemName"
            value={transaction.itemName}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="amount">
          Amount:
          <input
            type="number"
            id="amount"
            value={transaction.amount}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="category">
          Category:
          <input
            type="text"
            id="category"
            value={transaction.category}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="from">
          From:
          <input
            type="text"
            id="from"
            value={transaction.from}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            value={transaction.date}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default TransactionNewForm;
