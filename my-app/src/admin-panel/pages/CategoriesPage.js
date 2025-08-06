import React, { useState } from 'react';
// import CategoryList from './CategoryList';
// import CategoryForm from './CategoryForm';

import CategoryForm from '../components/categories/CategoryForm';
import CategoryList from '../components/categories/CategoryList';

function CategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      {isFormOpen ? (
        <CategoryForm
          category={editingCategory}
          onBack={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      ) : (
        <CategoryList onAdd={handleAdd} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default CategoriesPage;
