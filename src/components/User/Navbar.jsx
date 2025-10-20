import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../../App"; // ✅ make sure App.jsx exports useCart

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  // 🧮 Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // 🔍 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div className="flex items-center space-x-2 text-amber-500 font-bold text-xl">
            <Link to="/">📚 BookStore</Link>
          </div>

          {/* DESKTOP LINKS (Home, Books, Cart beside each other) */}
          <div className="hidden md:flex items-center space-x-8 text-gray-300">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link to="/books" className="hover:text-amber-400 transition-colors">
              Books
            </Link>
            {/* 🛒 Cart beside Books */}
            <Link
              to="/mycart"
              className="relative flex items-center space-x-1 hover:text-amber-400 transition-colors"
            >
              <FiShoppingCart size={20} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-500 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* DESKTOP SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-800 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-500"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className="bg-transparent outline-none text-gray-200 placeholder-gray-400 px-2 w-40 md:w-56"
            />
            <button
              type="submit"
              className="text-gray-300 hover:text-amber-500 transition-colors"
            >
              <FiSearch size={20} />
            </button>
          </form>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-amber-500 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3 text-gray-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-amber-400"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-amber-400"
            >
              Books
            </Link>
            {/* Mobile Cart beside Books */}
            <Link
              to="/mycart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-amber-400"
            >
              <FiShoppingCart size={20} />
              <span>Cart ({totalItems})</span>
            </Link>

            {/* MOBILE SEARCH BAR */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-800 rounded-full px-3 py-2 mt-2"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="bg-transparent outline-none text-gray-200 placeholder-gray-400 flex-1"
              />
              <button
                type="submit"
                className="text-gray-300 hover:text-amber-500 transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
