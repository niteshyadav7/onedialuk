import React from 'react';
import { stripHtml, formatDate } from './utils';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={`https://backend.onedialusa.com/storage/blogs/${blog.image}`}
        alt={blog.title}
        className="h-48 w-full object-cover"
        onError={(e) => {
          e.target.src = `https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400`;
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{stripHtml(blog.content)}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formatDate(blog.created_at)}</span>
          <a href={`/blog/${blog.slug}`} className="text-blue-600 hover:underline">
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
