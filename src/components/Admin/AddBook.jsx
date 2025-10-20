import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://fullstack-h3hj.onrender.com/api/books/add", form);
      alert("✅ Book added successfully!");
      setForm({ title: "", author: "", price: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add book.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.title}
        />
        <input
          name="author"
          placeholder="Author"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.author}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.price}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.description}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
