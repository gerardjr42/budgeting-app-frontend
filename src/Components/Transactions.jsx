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
      <div className="mb-6 mt-6 flex justify-center text-5xl">
        <h1 className="pr-2">Bank Account Total: </h1>{" "}
        <h1
          className={
            totalAmount > 100
              ? "text-green-500"
              : totalAmount >= 0 && totalAmount <= 100
                ? "text-yellow-500"
                : "text-red-500"
          }
        >
          ${totalAmount}
        </h1>
      </div>
      {transactions.map((transaction) => {
        return <Transaction key={transaction.id} transaction={transaction} />;
      })}
    </div>
  );
};

export default Transactions;
