import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  FolderOpen,
  FileImage, 
  Megaphone, 
  Settings,
  User
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/posts', icon: FileText, label: 'Posts' },
    { to: '/categories', icon: FolderOpen, label: 'Categories' },
    { to: '/sub-category', icon: FolderOpen, label: 'Sub-Categories' },
    { to: '/blogs', icon: BookOpen, label: 'Blogs' },
    { to: '/pages', icon: FileImage, label: 'Pages' },
    { to: '/ads', icon: Megaphone, label: 'Ads' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-gray-400">Content Management</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-800 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
