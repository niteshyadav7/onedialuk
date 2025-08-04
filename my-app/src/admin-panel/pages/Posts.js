import React from 'react';
import { Plus, FileText } from 'lucide-react';

const Posts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Posts</h2>
          <p className="text-gray-600 mt-1">Manage your general posts and articles</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Posts Management</h3>
        <p className="text-gray-500 mb-6">
          This section will contain your general posts management interface. 
          Similar functionality to blogs but for different content types.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          Create Your First Post
        </button>
      </div>
    </div>
  );
};

export default Posts;
