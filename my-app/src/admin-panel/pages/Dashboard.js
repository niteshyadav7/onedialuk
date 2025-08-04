

import React from 'react';
import {
  FileText,
  BookOpen,
  FileImage,
  Megaphone,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Posts',
      value: '23',
      change: '+12%',
      changeType: 'increase',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Blog Articles',
      value: '12',
      change: '+5%',
      changeType: 'increase',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Pages',
      value: '8',
      change: '+2%',
      changeType: 'increase',
      icon: FileImage,
      color: 'bg-purple-500'
    },
    {
      name: 'Active Ads',
      value: '6',
      change: '-3%',
      changeType: 'decrease',
      icon: Megaphone,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New blog post published',
      title: 'Getting Started with React and TypeScript',
      time: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: 2,
      action: 'Page updated',
      title: 'About Us',
      time: '4 hours ago',
      user: 'Jane Smith'
    },
    {
      id: 3,
      action: 'New ad campaign created',
      title: 'Summer Sale 2024',
      time: '6 hours ago',
      user: 'Mike Johnson'
    },
    {
      id: 4,
      action: 'Blog post edited',
      title: 'Advanced CSS Grid Layout Techniques',
      time: '1 day ago',
      user: 'Sarah Wilson'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time} • by {activity.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">New Post</p>
                <p className="text-sm text-gray-500">Create a new post</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <BookOpen className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">New Blog</p>
                <p className="text-sm text-gray-500">Write a blog article</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <FileImage className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">New Page</p>
                <p className="text-sm text-gray-500">Create a new page</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-500">View performance</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
