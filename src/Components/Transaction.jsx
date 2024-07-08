import React from "react";
import { Link } from "react-router-dom";

const Transaction = ({ transaction }) => {
  return (
    <div className="flex justify-center">
      <Link to={`/transactions/${transaction.id}`} className="w-2/5">
        <div className="mb-3 flex items-center justify-start border-b-2 pb-3">
          <span className="flex-none">{transaction.date} </span>
          <span className="ml-8 flex-grow text-sky-400 underline hover:text-blue-600">
            {transaction.itemName}{" "}
          </span>
          <span>${transaction.amount}</span>
        </div>
      </Link>
    </div>
  );
};

export default Transaction;
