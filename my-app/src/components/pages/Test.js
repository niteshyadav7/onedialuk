// import React, { useState, useEffect } from 'react';
// import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// const categories = [
//   'Automotive', 'Real Estate', 'Health & Medical', 'Restaurants & Food', 'Hotels & Travel',
//   'Construction & Contractors', 'Education & Training', 'Beauty & Spa', 'Legal Services', 'Finance & Insurance',
//   'Home & Garden', 'Retail & Shopping', 'Technology & IT', 'Marketing & Advertising', 'Manufacturing',
//   'Transportation & Logistics', 'Entertainment & Media', 'Sports & Recreation', 'Agriculture & Farming'
// ];

// function Test() {
//   const [blogsData, setBlogsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const pageParam = urlParams.get('page');
//     if (pageParam) {
//       setCurrentPage(parseInt(pageParam, 10));
//     }
//   }, []);

//   useEffect(() => {
//     fetchBlogs(currentPage);
//   }, [currentPage]);

//   const fetchBlogs = async (page) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`https://backend.onedialusa.com/api/blogs?page=${page}`);
//       if (!response.ok) throw new Error('Failed to fetch blogs');
//       const data = await response.json();
//       setBlogsData(data);
//       const newUrl = `${window.location.pathname}?page=${page}`;
//       window.history.pushState({ page }, '', newUrl);
//     } catch (err) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(selectedCategory === category ? null : category);
//   };

//   const filteredBlogs = blogsData?.blogs.blogs.data.filter(blog =>
//     !selectedCategory || blog.categoryName === selectedCategory
//   ) || [];

//   const stripHtml = (html) => {
//     const tmp = document.createElement('div');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric'
//     });
//   };

//   const renderPagination = () => {
//     if (!blogsData) return null;

//     const { current_page, last_page } = blogsData.blogs.blogs;
//     const pages = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return (
//       <div className="flex items-center justify-center gap-2 mt-12">
//         <button
//           onClick={() => handlePageChange(current_page - 1)}
//           disabled={current_page === 1}
//           className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//         >
//           <ChevronLeft className="w-4 h-4" />
//           Previous
//         </button>

//         {startPage > 1 && (
//           <>
//             <button onClick={() => handlePageChange(1)} className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">1</button>
//             {startPage > 2 && <span className="px-2 py-2 text-gray-400">...</span>}
//           </>
//         )}

//         {pages.map(page => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${page === current_page
//               ? 'bg-blue-600 text-white shadow-lg'
//               : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
//               }`}
//           >
//             {page}
//           </button>
//         ))}

//         {endPage < last_page && (
//           <>
//             {endPage < last_page - 1 && <span className="px-2 py-2 text-gray-400">...</span>}
//             <button onClick={() => handlePageChange(last_page)} className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
//               {last_page}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => handlePageChange(current_page + 1)}
//           disabled={current_page === last_page}
//           className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//         >
//           Next
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     );
//   };

//   if (loading && !blogsData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Skeleton loading */}
//         <div className="flex items-center justify-center min-h-96">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading blogs...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-red-600 text-2xl">!</span>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Blogs</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button onClick={() => fetchBlogs(currentPage)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">O</span>
//               </div>
//               <div className="text-2xl font-bold">
//                 <span className="text-blue-600">One</span> <span className="text-orange-500">Dial</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input type="text" placeholder="Enter Location" className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
//               </div>
//               <div className="relative">
//                 <input type="text" placeholder="Business Category" className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
//               </div>
//               <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
//                 <Search className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <nav className="text-sm text-gray-600">
//             <span>Home</span>
//             <span className="mx-2">›</span>
//             <span className="text-gray-900">Blog</span>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blogs</h1>
//           {blogsData && (
//             <p className="text-gray-600">
//               Showing {blogsData.blogs.blogs.from}-{blogsData.blogs.blogs.to} of {blogsData.blogs.blogs.total} articles
//             </p>
//           )}
//         </div>

//         {/* Category Filters */}
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-3 justify-center">
//             {categories.map(category => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryClick(category)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                   selectedCategory === category
//                     ? 'bg-blue-600 text-white shadow-lg'
//                     : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Blog Grid */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
//                 <div className="h-48 bg-gray-200"></div>
//                 <div className="p-6">
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-6 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredBlogs.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredBlogs.map(blog => (
//               <article key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={`https://backend.onedialusa.com/storage/blogs/${blog.image}`}
//                     alt={blog.title}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                     onError={(e) => {
//                       e.target.src = `https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400`;
//                     }}
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
//                       {blog.categoryName}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
//                     {blog.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">{stripHtml(blog.content)}</p>
//                   <div className="flex items-center justify-between text-sm text-gray-500">
//                     <span>{formatDate(blog.created_at)}</span>
//                     <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
//                       Read More →
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
//             <p className="text-gray-600">Try selecting a different category or check back later.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {blogsData && filteredBlogs.length > 0 && renderPagination()}
//       </main>
//     </div>
//   );
// }

// export default Test;

import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

function Test() {
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
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
      setError(null);
      const response = await fetch(`https://backend.onedialusa.com/api/blogs?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogsData(data);
      const newUrl = `${window.location.pathname}?page=${page}`;
      window.history.pushState({ page }, '', newUrl);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const res = await fetch(
        'https://backend.onedialusa.com/api/blog/highlight-reviews-on-customer-rated-plumbing-services-usa'
      );
      const data = await res.json();
      setCategories(data?.data?.categories || []);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setCategoryLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
    setCurrentPage(1);
  };

  const filteredBlogs = blogsData?.blogs.blogs.data.filter(blog =>
    !selectedCategory || blog.categorySlug === selectedCategory
  ) || [];

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const renderPagination = () => {
    if (!blogsData) return null;

    const { current_page, last_page } = blogsData.blogs.blogs;
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 inline-block" /> Previous
        </button>
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="px-3 py-2 text-sm border rounded-lg">1</button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 text-sm rounded-lg ${page === current_page
              ? 'bg-blue-600 text-white'
              : 'border hover:bg-gray-50'}`}
          >
            {page}
          </button>
        ))}
        {endPage < last_page && (
          <>
            {endPage < last_page - 1 && <span className="px-2 text-gray-400">...</span>}
            <button onClick={() => handlePageChange(last_page)} className="px-3 py-2 text-sm border rounded-lg">
              {last_page}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          Next <ChevronRight className="w-4 h-4 inline-block" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          {blogsData && (
            <p className="text-gray-600">
              Showing {blogsData.blogs.blogs.from}-{blogsData.blogs.blogs.to} of {blogsData.blogs.blogs.total} articles
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          {categoryLoading ? (
            <p className="text-center text-gray-500">Loading categories...</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3">
                {(showMore ? categories : categories.slice(0, 15)).map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === category.slug
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} <span className="ml-1 text-xs">({category.blogCount})</span>
                  </button>
                ))}
              </div>
              {categories.length > 15 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowMore(prev => !prev)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {showMore ? 'Show Less Categories' : 'Show More Categories'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="text-center py-12">Loading blogs...</div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
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
                    <a href={`/blog/${blog.slug}`} className="text-blue-600 hover:underline">Read More →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No blogs found for this category.</div>
        )}

        {/* Pagination */}
        {blogsData && filteredBlogs.length > 0 && renderPagination()}
      </main>
    </div>
  );
}

export default Test;
