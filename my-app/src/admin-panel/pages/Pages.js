import React from "react";
import { Plus, FileImage } from "lucide-react";

const Pages = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pages</h2>
          <p className="text-gray-600 mt-1">
            Manage your static pages and content
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <FileImage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Pages Management
        </h3>
        <p className="text-gray-500 mb-6">
          Create and manage static pages like About Us, Contact, Terms of
          Service, Privacy Policy, and other important pages for your website.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          Create Your First Page
        </button>
      </div>
    </div>
  );
};

export default Pages;
