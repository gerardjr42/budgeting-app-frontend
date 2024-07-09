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
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-6 text-center text-5xl">Transaction Details</h1>
      <div className="flex w-[20%] flex-col">
        <p className="mb-3 flex justify-between">
          Name:
          <span className="ml-auto">{transaction.itemName}</span>
        </p>
        <p className="mb-3 flex justify-between">
          Price:
          <span className="ml-auto">${transaction.amount}</span>
        </p>
        <p className="mb-3 flex justify-between">
          Category:
          <span className="ml-auto">{transaction.category}</span>
        </p>
        <p className="mb-3 flex justify-between">
          From:
          <span className="ml-auto">{transaction.from}</span>
        </p>
        <p className="mb-3 flex justify-between">
          Date:
          <span className="ml-auto">{transaction.date}</span>
        </p>
        <p className="mb-10 flex justify-between">
          Transaction Type:
          <span className="ml-auto">{transaction.type}</span>
        </p>
        <div className="flex justify-center">
          <Link to={`/transactions/${id}/edit`}>
            <button className="mr-8 border px-4 py-1 hover:bg-blue-500">
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="border px-4 py-1 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
