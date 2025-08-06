import React, { useEffect, useState } from "react";
import { blogApi } from "./blogApi"; // Your API abstraction layer

const BlogList = ({ onAdd, onEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await blogApi.getAll();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.error("Error loading blogs", err);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogApi.delete(slug);
        setBlogs(blogs.filter((b) => b.slug !== slug));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blog List</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Blog
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
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">SubCategory</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{b.title}</td>
              <td className="py-2 px-4 border-b">{b.slug}</td>
              <td className="py-2 px-4 border-b">{b.category?.name || "N/A"}</td>
              <td className="py-2 px-4 border-b">{b.subCategory?.name || "N/A"}</td>
              <td className="py-2 px-4 border-b capitalize">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                    b.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-right space-x-2">
                <button
                  onClick={() => onEdit(b)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.slug)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredBlogs.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
