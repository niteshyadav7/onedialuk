import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 inline-block" /> Previous
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-2 text-sm border rounded-lg">1</button>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm rounded-lg ${
            page === currentPage ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < lastPage && (
        <>
          {endPage < lastPage - 1 && <span className="px-2 text-gray-400">...</span>}
          <button onClick={() => onPageChange(lastPage)} className="px-3 py-2 text-sm border rounded-lg">
            {lastPage}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        Next <ChevronRight className="w-4 h-4 inline-block" />
      </button>
    </div>
  );
};

export default Pagination;
