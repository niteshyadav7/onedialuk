import React, { useState, useEffect } from "react";
import { categoryApi } from "./categoryApi";

function CategoryList({ onAdd, onEdit }) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await categoryApi.getAll();
    if (res.success) {
      setCategories(res.data);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure to delete this category?")) {
      await categoryApi.delete(slug);
      setCategories(categories.filter((c) => c.slug !== slug));
    }
  };

  const filtered = categories.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Category List</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Category
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <table className="w-full text-left border-t">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{c.name}</td>
              <td className="py-2 px-4 border-b">{c.slug}</td>
              <td className="py-2 px-4 border-b capitalize">{c.status}</td>
              <td className="py-2 px-4 border-b text-right space-x-2">
                <button
                  onClick={() => onEdit(c)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.slug)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
