import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import axios from "axios";

// --- StarRating Component ---
const StarRating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

// --- BookCard Component ---
const BookCard = ({ book, addToCart }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow duration-300 hover:shadow-xl"
  >
    {book.img && (
      <div className="relative">
        <img src={book.img} alt={book.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-full text-sm"
            onClick={() => addToCart(book)}
          >
            Quick Add
          </button>
        </div>
      </div>
    )}

    <div className="p-4 flex flex-col h-full">
      <h3 className="font-bold text-lg text-gray-800 truncate">{book.title ?? "Untitled"}</h3>
      <p className="text-sm text-gray-500 mb-2">{book.author ?? "Unknown Author"}</p>

      {book.description && (
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{book.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <p className="text-xl font-bold text-indigo-600">
          ₹{(book.price ?? 0).toFixed(2)}
        </p>
        <StarRating rating={book.rating ?? 0} />
      </div>

      <button
        onClick={() => addToCart(book)}
        className="mt-3 w-full bg-gray-800 text-white font-bold py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </motion.div>
);

export default function BookView() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const priceRanges = [
    { label: "Under ₹400", value: "0-400" },
    { label: "₹400 to ₹500", value: "400-500" },
    { label: "Over ₹500", value: "500-Infinity" },
  ];

  const languages = ["English", "Malayalam"]; // optional if your data has 'language' field

  // --- Fetch books from backend ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5004/api/books/get");
        if (res.data.success) {
          setBooks(res.data.data);
          setFilteredBooks(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);

  // --- Filtering ---
  useEffect(() => {
    let filtered = [...books];

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter(
        (book) => book.price >= min && book.price <= (max || Infinity)
      );
    }

    if (languageFilter) {
      filtered = filtered.filter((book) => book.language === languageFilter);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, priceFilter, languageFilter, books]);

  const resetFilters = () => {
    setSearchTerm("");
    setPriceFilter("");
    setLanguageFilter("");
  };

  const addToCart = async (book) => {
    try {
      const res = await axios.post("http://localhost:5004/api/books/cart", {
        bookId: book._id,
      });
      if (res.data.success) {
        const alertBox = document.createElement("div");
        alertBox.textContent = `${book.title} added to cart 🛒`;
        alertBox.className =
          "fixed bottom-6 right-6 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg animate-bounce";
        document.body.appendChild(alertBox);
        setTimeout(() => alertBox.remove(), 2000);
      } else {
        alert("❌ Failed to add book to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Could not connect to cart API");
    }
  };

  const FilterSidebar = () => (
    <aside className="w-full lg:w-72 lg:flex-shrink-0">
      <div className="p-6 bg-white rounded-lg shadow-sm sticky top-24">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Price</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setPriceFilter(range.value)}
                className={`w-full text-left px-4 py-2 rounded ${
                  priceFilter === range.value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Language</h3>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`w-full text-left px-4 py-2 rounded ${
                  languageFilter === lang
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          <FiX className="mr-2"/>Reset Filters
        </button>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mt-20">Explore Our Collection</h1>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden px-4">
            <button
              onClick={() => setFiltersVisible(!isFiltersVisible)}
              className="w-full bg-white font-bold py-3 px-4 rounded-lg shadow-sm"
            >
              {isFiltersVisible ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {isFiltersVisible && (
            <div className="lg:hidden px-4">
              <FilterSidebar/>
            </div>
          )}

          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            {filteredBooks.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 lg:px-0"
              >
                {filteredBooks.map((book) => (
                  <BookCard key={book._id} book={book} addToCart={addToCart} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-700">No Books Found</h2>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
