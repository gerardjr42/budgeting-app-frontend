import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <Link to="/transactions">All Transactions</Link>
      <button>
        <Link to="/transactions/new">New Transaction</Link>
      </button>
    </div>
  );
};

export default NavBar;
