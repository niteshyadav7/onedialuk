// src/components/sub-categories/SubCategoryList.jsx
import React, { useEffect, useState } from "react";
import { subCategoryApi } from "./subCategoryApi";
// import { subCategoryApi } from "../../services/subCategoryApi";

function SubCategoryList({ onAdd, onEdit, refreshKey }) {
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const loadData = async () => {
    const res = await subCategoryApi.getAll();
    if (res.success) {
      setSubCategories(res.data);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Delete this sub-category?")) {
      await subCategoryApi.delete(slug);
      setSubCategories(subCategories.filter((sc) => sc.slug !== slug));
    }
  };

  const filtered = subCategories.filter((sc) => {
    const matchSearch =
      sc.name.toLowerCase().includes(search.toLowerCase()) ||
      sc.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || sc.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sub-Categories</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Sub-Category
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <table className="w-full border-t text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Slug</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sc) => (
            <tr key={sc._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{sc.name}</td>
              <td className="py-2 px-4 border-b">{sc.slug}</td>
              <td className="py-2 px-4 border-b">{sc.category?.name || "-"}</td>
              <td className="py-2 px-4 border-b capitalize">{sc.status}</td>
              <td className="py-2 px-4 border-b text-right space-x-2">
                <button
                  onClick={() => onEdit(sc)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sc.slug)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No sub-categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SubCategoryList;
