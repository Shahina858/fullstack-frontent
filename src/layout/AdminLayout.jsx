import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/admin/booklist" className="hover:text-indigo-400">Book List</Link>
          <Link to="/admin/addbook" className="hover:text-indigo-400">Add New Book</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* The Outlet will render the matched admin page (AdminHome, BookList, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;