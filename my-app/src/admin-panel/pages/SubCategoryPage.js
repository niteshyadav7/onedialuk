// src/pages/SubCategoriesPage.jsx
import React, { useState } from "react";
import SubCategoryForm from "../components/subcategories/SubCategoryForm";
import SubCategoryList from "../components/subcategories/SubCategoryList";
// import SubCategoryForm from "../components/sub-categories/SubCategoryForm";
// import SubCategoryList from "../components/sub-categories/SubCategoryList";

function SubCategoriesPage() {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (subCategory) => {
    setEditing(subCategory);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      {showForm ? (
        <SubCategoryForm subCategory={editing} onBack={() => setShowForm(false)} onSave={handleSave} />
      ) : (
        <SubCategoryList onAdd={handleAdd} onEdit={handleEdit} refreshKey={refreshKey} />
      )}
    </div>
  );
}

export default SubCategoriesPage;
