import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [savedBook, setSavedBook] = useState(null); // store saved book from backend

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(
        "https://fullstack-h3hj.onrender.com/api/books/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Book added successfully!");
      setSavedBook(res.data.data); // save returned book
      setForm({ title: "", author: "", price: "", description: "" });
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add book.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          name="author"
          placeholder="Author"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.author}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.price}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          value={form.description}
        />

        {/* Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Upload Book Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          {/* Preview before upload */}
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-56 object-cover rounded shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      {/* Display saved book from backend */}
      {savedBook && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-2">{savedBook.title}</h3>
          <p className="text-gray-700 mb-1">Author: {savedBook.author}</p>
          <p className="text-gray-700 mb-1">Price: ${savedBook.price}</p>
          <p className="text-gray-700 mb-3">{savedBook.description}</p>

          {savedBook.image && (
            <img
              src={`https://fullstack-h3hj.onrender.com${savedBook.image}`}
              alt={savedBook.title}
              className="w-40 h-56 object-cover rounded shadow-md"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddBook;
