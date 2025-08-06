
import React, { useState } from 'react';
import BlogForm from '../components/blogs/BlogForm';
import BlogList from '../components/blogs/BlogList';

// import BlogForm from '../components/blogs/BlogForm';
// import BlogList from '../components/blogs/BlogList';

function BlogPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleAdd = () => {
    setEditingBlog(null);
    setIsFormOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      {isFormOpen ? (
        <BlogForm
          blog={editingBlog}
          onBack={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      ) : (
        <BlogList onAdd={handleAdd} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default BlogPage;
