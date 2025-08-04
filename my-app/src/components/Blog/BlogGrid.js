import React from 'react';
import BlogCard from './BlogCard';

const BlogGrid = ({ blogs }) => {
  if (blogs.length === 0) {
    return <div className="text-center py-12 text-gray-500">No blogs found for this category.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
