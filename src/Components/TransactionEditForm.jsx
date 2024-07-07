import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const TransactionEditForm = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  const [transaction, setTransaction] = useState({
    itemName: "",
    amount: 0,
    category: "",
    from: "",
    date: "",
  });

  useEffect(() => {
    fetch(`${API}/transactions/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => {
        console.log(resJSON);
        setTransaction(resJSON);
      })
      .catch((e) => console.error(e));
  }, [id]);

  const updateTransaction = () => {
    fetch(`${API}/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/transactions");
      })
      .catch((e) => console.erorr(e));
  };

  const handleTextChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction();
    setTransaction({
      itemName: "",
      amount: 0,
      category: "",
      from: "",
      date: "",
    });
  };
  return (
    <div>
      Edit Transaction
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

export default TransactionEditForm;
