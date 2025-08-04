import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "") || "Contact";

  return (
    <div className=" py-3 px-4 rounded-md mb-6">
      <nav className="text-sm text-gray-600">
        <ul className="flex items-center space-x-2 p-2">
          <li>
            <Link
              to="/"
              className="hover:underline text-blue-600 font-semibold text-xl"
            >
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="capitalize text-gray-700 text-lg font-semibold">{currentPath}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;
