import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import BlogGrid from './BlogGrid';
import Pagination from './Pagination';

const BlogListing = () => {
  const [blogsData, setBlogsData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) setCurrentPage(parseInt(pageParam, 10));
  }, []);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`https://backend.onedialusa.com/api/blogs?page=${page}`);
      const data = await res.json();
      setBlogsData(data);
      window.history.pushState({}, '', `${window.location.pathname}?page=${page}`);
    } catch {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const res = await fetch(`https://backend.onedialusa.com/api/blog/highlight-reviews-on-customer-rated-plumbing-services-usa`);
      const data = await res.json();
      setCategories(data?.data?.categories || []);
    } catch {
      setError('Failed to load categories');
    } finally {
      setCategoryLoading(false);
    }
  };

  const filteredBlogs =
    blogsData?.blogs.blogs.data.filter((blog) => !selectedCategory || blog.categorySlug === selectedCategory) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
        {blogsData && (
          <p className="text-gray-600">
            Showing {blogsData.blogs.blogs.from}-{blogsData.blogs.blogs.to} of {blogsData.blogs.blogs.total} articles
          </p>
        )}
      </div>

      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading blogs...</div>
      ) : (
        <BlogGrid blogs={filteredBlogs} />
      )}

      {!loading && blogsData && filteredBlogs.length > 0 && (
        <Pagination
          currentPage={blogsData.blogs.blogs.current_page}
          lastPage={blogsData.blogs.blogs.last_page}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
};

export default BlogListing;
