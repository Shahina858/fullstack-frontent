import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StarInput = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        onClick={() => setRating(star)}
        className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", price: "", description: "", rating: 0 });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://fullstack-h3hj.onrender.com/api/books/get/${id}`);
        const data = await res.json();
        if (data.success) setBook(data.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://fullstack-h3hj.onrender.com/api/books/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (res.ok) navigate("/admin/booklist");
      else alert("Failed to update book");
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={book.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="author" value={book.author} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={book.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" value={book.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        {/* <div>
          <label className="font-semibold mb-1 block">Rating:</label>
          <StarInput rating={book.rating} setRating={(r) => setBook({ ...book, rating: r })} />
        </div> */}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
