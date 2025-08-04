import React, { useState, useEffect } from "react";

const BlogButton = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          "https://backend.onedialusa.com/api/blog/highlight-reviews-on-customer-rated-plumbing-services-usa"
        );
        const data = await response.json();
        setBlogData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog data");
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const handleCategoryClick = (slug) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!blogData) return null;

  const newDataArray = showBtn
    ? blogData?.data?.categories
    : blogData?.data?.categories?.slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-gray-600">Total: {blogData.data.allBlogs} blogs</p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {newDataArray.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.slug
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:shadow-md"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">
                  ({category.blogCount})
                </span>
              </button>
            ))}
          </div>

          {blogData?.data?.categories?.length > 15 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowBtn((prev) => !prev)}
                className="text-blue-600 hover:underline font-medium"
              >
                {showBtn ? "Show Less Categories" : "Show More Categories"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogButton;
