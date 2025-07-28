import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, User, LogOut, Home, Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = user
    ? [
        { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
        { to: "/profile", label: "Profile", icon: <User size={18} /> },
        { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
      ]
    : [
        { to: "/login", label: "Login", icon: <User size={18} /> },
        { to: "/register", label: "Register", icon: <ShoppingBag size={18} /> },
      ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">One Dial</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive(item.to)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {user && (
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-300">
                <span className="text-sm text-gray-700">
                  Welcome, {user.fullName}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
