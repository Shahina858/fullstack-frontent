import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, PlusCircle, List, BarChart3, Users } from "lucide-react";

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 text-gray-800 font-sans">
      {/* Welcome Section */}
      <header className="text-center py-10">
        <h2 className="text-4xl font-extrabold mb-2 text-indigo-700">
          Welcome, Admin 👋
        </h2>
        <p className="text-gray-600 text-lg">
          Manage your book store efficiently and monitor key insights.
        </p>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <BookOpen size={40} className="mx-auto text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold">Total Books</h3>
          <p className="text-2xl font-bold text-gray-700 mt-1">128</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <Users size={40} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-gray-700 mt-1">340</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <BarChart3 size={40} className="mx-auto text-green-600 mb-3" />
          <h3 className="text-lg font-semibold">Monthly Sales</h3>
          <p className="text-2xl font-bold text-gray-700 mt-1">$4,230</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <List size={40} className="mx-auto text-yellow-600 mb-3" />
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold text-gray-700 mt-1">52</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12">
        <Link
          to="/admin/booklist"
          className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <BookOpen size={40} className="mx-auto text-blue-600 mb-3" />
          <h3 className="text-xl font-bold mb-2">Manage Books</h3>
          <p className="text-gray-600">
            View, edit, or delete books from your collection.
          </p>
        </Link>

        <Link
          to="/admin/addbook"
          className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <PlusCircle size={40} className="mx-auto text-green-600 mb-3" />
          <h3 className="text-xl font-bold mb-2">Add New Book</h3>
          <p className="text-gray-600">
            Add new books to your store quickly and easily.
          </p>
        </Link>

        <Link
          to="/admin/booklist"
          className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <List size={40} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="text-xl font-bold mb-2">View All Books</h3>
          <p className="text-gray-600">
            Browse the complete inventory and manage stock levels.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
