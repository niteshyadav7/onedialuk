import React from "react";
import { Plus, Megaphone } from "lucide-react";

const Ads = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Advertisements</h2>
          <p className="text-gray-600 mt-1">
            Manage your advertising campaigns and banners
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
          <Plus className="w-4 h-4" />
          New Ad Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Advertisement Management
        </h3>
        <p className="text-gray-500 mb-6">
          Create and manage your advertising campaigns, banners, and promotional
          content. Track performance and optimize your marketing efforts.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          Create Your First Ad
        </button>
      </div>
    </div>
  );
};

export default Ads;
