// src/components/sub-categories/SubCategoryForm.jsx
import React, { useState, useEffect } from "react";
import { categoryApi } from "../categories/categoryApi";
import { subCategoryApi } from "./subCategoryApi";
// import { subCategoryApi } from "../../services/subCategoryApi";
// import { categoryApi } from "../../services/categoryApi";

function SubCategoryForm({ subCategory, onBack, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    status: "active",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSlug = (name) =>
    name.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getAll();
      if (res.success) setCategories(res.data);
    };
    fetchCategories();
    if (subCategory) setFormData(subCategory);
  }, [subCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (subCategory) {
        await subCategoryApi.update(subCategory.slug, formData);
      } else {
        await subCategoryApi.create(formData);
      }
      onSave();
    } catch (err) {
      setError("Failed to save sub-category.");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-md mt-6">
      <h2 className="text-xl font-semibold mb-4">{subCategory ? "Edit" : "Add"} Sub-Category</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubCategoryForm;
