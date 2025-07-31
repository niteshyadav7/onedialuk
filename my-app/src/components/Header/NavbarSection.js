import React from "react";
import { Menu, MapPin, User, Building } from "lucide-react";

const LeftNav = function () {
  return (
    <div className="flex items-center justify-evenly ml-10 space-x-6">
      <button className="text-white p-1 font-bold">
        <Menu size={40} />
      </button>
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">O</span>
          </div>
        </div>
        <span className="text-white font-semibold text-3xl">One Dial</span>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 text-white">
        <MapPin size={25} />
        <span className="font-bold text-sm">Dwarka Tehsil</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

const RightNav = function () {
  return (
    <>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 text-white px-3 py-2 rounded transition-colors">
          <Building size={24} />
          <span className="font-bold text-xl">Free Listing</span>
        </button>
        <button className="text-white p-1">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <User size={32} className="text-blue-600" />
          </div>
        </button>
      </div>
    </>
  );
};

// Header Section for above 1024px
const Header = () => {
  return (
    <header className="px-2 py-1 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto mt-2">
        {/* Left side - Logo and Location */}
        <LeftNav />
        {/* Right side - Free Listing and User */}
        <RightNav />
      </div>
    </header>
  );
};

export default Header;
