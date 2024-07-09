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
    type: "",
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
    updateTransaction();
    setTransaction({
      itemName: "",
      amount: 0,
      category: "",
      from: "",
      date: "",
      type: "",
    });
  };
  return (
    <div className="flex flex-col justify-center">
      <h1 className="my-6 text-center text-5xl">Edit Transaction</h1>
      <form
        onSubmit={handleSubmit}
        className="ml-auto mr-auto flex flex-col text-start"
      >
        <label htmlFor="itemName" className="flex flex-col text-lg">
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionEditForm;
