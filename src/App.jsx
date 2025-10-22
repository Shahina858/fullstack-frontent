import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

// User Pages
import HomePage from "./components/User/Home";
import Mycart from "./Pages/Mycart";

// Admin Pages
import AdminHome from "./components/Admin/Homes";
import AddBook from "./components/Admin/AddBook";
import UpdateBook from "./components/Admin/UpdateBook";
import BookList from "./components/Admin/BookList";
import BookDetail from "./components/Admin/BookDetails";

import "./index.css";
import ViewBook from "./Pages/ViewBook";
import { LogIn } from "lucide-react";
import Signup from "./Pages/signup";
import Login from "./Pages/login";

// 🛒 Create Cart Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div className="font-sans bg-gray-50 text-gray-900">
        <BrowserRouter>
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} />
              <Route path="books" element={<ViewBook />} />
              <Route path="mycart" element={<Mycart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="addbook" element={<AddBook />} />
              <Route path="update/:id" element={<UpdateBook />} />
              <Route path="booklist" element={<BookList />} />
              <Route path="bookdetail/:id" element={<BookDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
};

export default App;
