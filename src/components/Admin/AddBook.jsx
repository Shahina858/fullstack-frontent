import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // for image preview
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for sending both text + image
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      await axios.post("https://fullstack-h3hj.onrender.com/api/books/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Book added successfully!");
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

        {/* ✅ Image Upload Field */}
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

          {/* ✅ Preview Section */}
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
    </div>
  );
};

export default AddBook;
