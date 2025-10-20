import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://fullstack-h3hj.onrender.com/api/books/get/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p className="mb-2"><strong>Author:</strong> {book.author}</p>
      <p className="mb-2"><strong>Price:</strong> {book.price}</p>
      <p className="mb-4"><strong>Description:</strong> {book.description}</p>
      <Link to="/admin/booklist" className="text-blue-600 hover:underline">Back to List</Link>
    </div>
  );
};

export default BookDetail;
