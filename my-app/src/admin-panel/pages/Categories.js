import React from "react";
import CategoryList from "../components/categories/CategoryList";

const Categories = () => {
  const handleCategoryDelete = (id) => {
    // In a real app, this would delete from a database
    console.log("Deleting category:", id);
  };

  return <CategoryList onDelete={handleCategoryDelete} />;
};

export default Categories;
