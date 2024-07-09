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
    type: "",
  });

  const handleChecked = (e) => {
    const { checked, id } = e.target;
    setTransaction({
      ...transaction,
      type: checked && id === "Deposit" ? "Deposit" : "Withdrawal",
    });
  };

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
      type: "",
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
    <div className="flex flex-col justify-center">
      <h1 className="text-center text-5xl">Add a new item</h1>
      <form
        onSubmit={handleSubmit}
        className="ml-auto mr-auto flex flex-col text-start"
      >
        <label htmlFor="itemName" className="flex flex-col text-lg">
          <br />
          Item Name:
          <input
            className="border-2"
            type="text"
            id="itemName"
            value={transaction.itemName}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="amount" className="flex flex-col text-lg">
          Amount:
          <input
            className="appearance-none border-2"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            type="number"
            id="amount"
            value={transaction.amount}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="category" className="flex flex-col text-lg">
          Category:
          <input
            className="border-2"
            type="text"
            id="category"
            value={transaction.category}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="from" className="flex flex-col text-lg">
          From:
          <input
            className="border-2"
            type="text"
            id="from"
            value={transaction.from}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <label htmlFor="date" className="flex flex-col text-lg">
          Date:
          <input
            className="border-2"
            type="date"
            id="date"
            value={transaction.date}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />

        <div className="flex justify-between self-center align-middle">
          <label htmlFor="Deposit" className="mr-4 flex flex-row text-lg">
            <p className="mr-2">Deposit:</p>
            <input
              className="border-2"
              type="checkbox"
              id="Deposit"
              checked={transaction.type === "Deposit"}
              onChange={handleChecked}
            />
          </label>
          <br />
          <label htmlFor="Withdrawal" className="flex flex-row text-lg">
            <p className="mr-2">Withdrawal:</p>
            <input
              className="border-2"
              type="checkbox"
              id="Withdrawal"
              checked={transaction.type === "Withdrawal"}
              onChange={handleChecked}
            />
          </label>
          <br />
        </div>

        <button className="my-4 border py-2 text-xs font-bold text-gray-500 hover:bg-blue-500 hover:text-white">
          CREATE NEW ITEM
        </button>
      </form>
    </div>
  );
};

export default TransactionNewForm;
