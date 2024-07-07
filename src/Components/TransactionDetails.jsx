import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const TransactionDetails = () => {
  let { id } = useParams();
  let navigate = useNavigate();

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
      .catch(() => {
        navigate("/notFound");
      });
  }, [id, navigate]);

  const handleDelete = () => {
    fetch(`${API}/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/transactions");
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>TransactionDetails</h1>
      <p>{transaction.itemName}</p>
      <p>{transaction.amount}</p>
      <p>{transaction.category}</p>
      <p>{transaction.from}</p>
      <p>{transaction.date}</p>
      <Link to={`/transactions/${id}/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TransactionDetails;
