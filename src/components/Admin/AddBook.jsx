import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router";

export default function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    language: "English",
    image: null,
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post("https://fullstack-h3hj.onrender.com/api/books/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Book added successfully!");
      navigate("/admin/manage");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add book. Try again.");
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="ml-68 p-4 relative min-h-screen bg-gray-900 flex justify-center items-center px-4">

      {/* 📘 Add Book Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white py-4 px-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          ➕ Add New Book
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Biographies & Autobiographies">Biographies & Autobiographies</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Academic & Educational">Academic & Educational</option>
            <option value="Children's Books">Children's Books</option>
            <option value="Cookbooks">Cookbooks</option>
          </select>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Language</label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Select Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Add Book
        </button>
      </form>
    </div>
    </>
  );
}