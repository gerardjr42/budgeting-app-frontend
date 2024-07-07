import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";

const API = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    fetch(`${API}/transactions`)
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => {
        console.log(resJSON);
        setTransactions(resJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let sum = 0;
    transactions.forEach((transaction) => {
      sum += Number(transaction.amount);
    });
    setTotalAmount(sum);
  }, [transactions, setTotalAmount]);

  return (
    <div>
      <h1>Transactions</h1>
      {transactions.map((transaction) => {
        return <Transaction key={transaction.id} transaction={transaction} />;
      })}
      <p
        className={
          totalAmount > 100
            ? "text-green-500"
            : totalAmount >= 0 && totalAmount <= 100
              ? "text-yellow-500"
              : "text-red-500"
        }
      >
        Total: ${totalAmount}
      </p>
    </div>
  );
};

export default Transactions;
