import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categoryOptions = ["all", ...categories.map((cat) => cat._id)];
  // console.log(categoryOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/blogs"),
          axios.get("http://localhost:8080/api/categories"),
        ]);
        // console.log(blogsRes?.data?.data);
        // console.log(categoriesRes?.data?.data);

        setBlogs(blogsRes?.data?.data || []);
        setCategories(categoriesRes.data.data || []);
        // console.log(blogsRes);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(blogs);
  // console.log(categories);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);

    let name;
    if (category) {
      name = category.name;
    } else {
      name = "Unknown";
    }
    console.log(name);
    return name;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || blog.categoryId === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-gray-600 mt-1">
            Manage your blog content and publications
          </p>
        </div>
        <Link
          to="/blogs/create"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {categoryOptions.map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {categoryId === "all"
                      ? "All Categories"
                      : getCategoryName(categoryId)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading blogs...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No blog posts found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 line-clamp-1">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {blog.content
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 100)}
                            ...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getCategoryName(blog.categoryId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blog.status || "Draft"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/blogs/view/${blog._id}`}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/blogs/edit/${blog._id}`}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
