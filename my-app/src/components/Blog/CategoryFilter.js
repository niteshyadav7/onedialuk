import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect, showMore, setShowMore }) => {
  const visibleCategories = showMore ? categories : categories.slice(0, 15);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.slug)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
            <span className="ml-1 text-xs">({category.blogCount})</span>
          </button>
        ))}
      </div>
      {categories.length > 15 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="text-blue-600 hover:underline font-medium"
          >
            {showMore ? 'Show Less Categories' : 'Show More Categories'}
          </button>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
