import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import axios from "axios";
// import { mockCategories } from '../../data/mockData';

const CategoryForm = ({ onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(useParams());

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/api/categories/${id}`, config)
        .then((res) => {
          setFormData({ name: res.data.name, slug: res.data.slug });
        })
        .catch((err) => console.error("Error loading category:", err));
    }
  }, [isEdit, id]);

  const handleNameChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8080/api/categories/${id}`,
          formData,
          config
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/categories",
          formData,
          config
        );
      }
      onSave(formData);
      navigate("/categories");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/categories")}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Edit Category" : "Create New Category"}
            </h2>
            <p className="text-gray-600 mt-1">
              {isEdit
                ? "Update category information"
                : "Add a new category for organizing content"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save Category"}
        </button>
      </div>

      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter category name..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be displayed as the category name
              </p>
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="category-url-slug"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                URL-friendly version of the name (automatically generated)
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Saving..." : "Save Category"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/categories")}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
