import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "Automotive",
  "Real Estate",
  "Health & Medical",
  "Restaurants & Food",
  "Hotels & Travel",
  "Construction & Contractors",
  "Education & Training",
  "Beauty & Spa",
  "Legal Services",
  "Finance & Insurance",
  "Home & Garden",
  "Retail & Shopping",
  "Technology & IT",
  "Marketing & Advertising",
  "Manufacturing",
  "Transportation & Logistics",
  "Entertainment & Media",
  "Sports & Recreation",
  "Agriculture & Farming",
];

function BlogContent() {
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, []);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://backend.onedialusa.com/api/blogs?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogsData(data);
      const newUrl = `${window.location.pathname}?page=${page}`;
      window.history.pushState({ page }, "", newUrl);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const filteredBlogs =
    blogsData?.blogs.blogs.data.filter(
      (blog) => !selectedCategory || blog.categoryName === selectedCategory
    ) || [];

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderPagination = () => {
    if (!blogsData) return null;

    const { current_page, last_page } = blogsData.blogs.blogs;
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              page === current_page
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < last_page && (
          <>
            {endPage < last_page - 1 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => handlePageChange(last_page)}
              className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              {last_page}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (loading && !blogsData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Blogs
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchBlogs(currentPage)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* ...snipped here since you've already pasted the full content... */}
      {/* You can keep the rest of the original JSX content unchanged from your TSX version as it's already valid JSX now */}
    </div>
  );
}

export default BlogContent;
