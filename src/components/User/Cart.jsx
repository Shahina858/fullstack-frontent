import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingBag,
  FiCheckCircle,
} from "react-icons/fi";

// --- Empty Cart Component ---
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center text-center py-20">
    <FiShoppingBag className="text-gray-300" size={80} />
    <h2 className="mt-8 text-2xl font-semibold text-gray-800">Your Cart is Empty</h2>
    <p className="mt-2 text-gray-500">
      Looks like you haven't added any books to your cart yet.
    </p>
    <Link
      to="/books"
      className="mt-6 bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors duration-300"
    >
      Continue Shopping
    </Link>
  </div>
);

const Mycart = () => {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5004/api/books/cart");
        if (res.data && res.data.data) {
          // Map cart items to flatten the book details for easier access
          const mappedCart = res.data.data.map((item) => ({
            ...item,
            title: item.book.title,
            author: item.book.author,
            price: item.book.price,
            img: item.book.img,
          }));
          setCart(mappedCart);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // 🟠 Remove item from backend + update UI
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/books/cart/${id}`);
      setCart((prev) => prev.filter((item) => item._id !== id));
      alert("Removed successfully");
    } catch (err) {
      console.error("Error deleting cart item:", err);
      alert("❌ Failed to remove item");
    }
  };

  // 🟣 Update quantity locally (no API yet)
  const handleQuantityChange = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // 💰 Calculate totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shippingCost;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading your cart...
      </div>
    );
  }

  if (!cart.length) {
    return <EmptyCart />;
  }

  if (checkout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-green-500 mb-6"
        >
          <FiCheckCircle size={100} />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Checkout Successful!
        </h2>
        <p className="text-gray-500">
          Thank you for your purchase. You’ll receive an email confirmation soon.
        </p>
        <Link
          to="/books"
          className="mt-8 bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-24">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6 last:border-b-0"
                >
                  {/* <img
                    src={item.img}
                    alt={item.title}
                    className="w-28 h-40 object-cover rounded-md flex-shrink-0"
                  /> */}

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500">by {item.author}</p>
                    <p className="text-lg font-semibold text-indigo-600 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <FiMinus />
                    </button>
                    <span className="font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <p className="font-bold text-lg w-24 text-center">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleRemove(item._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={22} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-gray-900"
                  >
                    ₹{total.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCheckout(true)}
                className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mycart;
