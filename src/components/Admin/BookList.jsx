import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5004/api/books/get";

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setBooks(res.data.data);
      } else {
        alert("⚠️ Failed to fetch books from server.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("❌ Failed to load books. Check server connection.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/books/delete/${id}`);
   setBooks((prev) => prev.filter((book) => book._id !== id));
   alert(" ✅successfully deleted")
    } catch (err) {
      console.error(err);
      alert("❌ Could not delete book");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">📚 Book List</h2>

      {books.length === 0 ? (
        <p className="text-gray-600 text-lg">No books available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-blue-700 mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-500 mb-2">₹{book.price}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/admin/update/${book._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
