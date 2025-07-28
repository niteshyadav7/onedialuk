import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <ul className="flex space-x-6 font-semibold">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-yellow-300 transition-colors">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-yellow-300 transition-colors">
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
