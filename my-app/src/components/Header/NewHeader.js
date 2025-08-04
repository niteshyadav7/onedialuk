import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  Building2,
  Home,
  User,
  List,
  Phone,
  FileText,
  Plus,
  UserPlus,
  LogIn,
} from "lucide-react";

const NewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [location, setLocation] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "https://backend.onedialusa.com/api/new-header"
        );
        const data = await response.json();
        const activeItems = data
          .filter((item) => item.is_active === 1)
          .sort((a, b) => a.order - b.order);
        setMenuItems(activeItems);
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const logo = menuItems.find((item) => item.type === "logo");
  const navItems = menuItems.filter((item) => item.type === "menu");

  const handleSearch = () => {
    console.log("Searching for:", { location, businessCategory });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getMenuIcon = (item) => {
    switch (item.label) {
      case "Home":
        return <Home className="w-4 h-4" />;
      case "About us":
        return <User className="w-4 h-4" />;
      case "Listing":
        return <List className="w-4 h-4" />;
      case "Contact":
        return <Phone className="w-4 h-4" />;
      case "Blog":
        return <FileText className="w-4 h-4" />;
      case "Free Listing":
        return <Plus className="w-4 h-4" />;
      case "SignUp":
        return <UserPlus className="w-4 h-4" />;
      case "Login":
        return <LogIn className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded"></div>;
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg relative z-40 p-2">
        <div className="max-w-7xl p-2 mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
            <div className="flex justify-start items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-blue-600 hover:bg-gray-100 rounded-md"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex-shrink-0">
                <a href={logo?.path || "/"} className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xl font-bold">
                    <span className="text-blue-600">One</span>
                    <span className="text-orange-500 ml-1">Dial</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="relative flex-1">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  {/* <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0 appearance-none bg-white text-gray-700"
                  >
                    <option value="">Business Category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="services">Services</option>
                    <option value="healthcare">Healthcare</option>
                  </select> */}
                  <input
                    type="text"
                    placeholder="Business Category"
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-0 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>

          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-blue-700 p-1 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-0">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors duration-150"
                  onClick={toggleMenu}
                >
                  <div className="w-5 h-5 mr-4 flex items-center justify-center text-gray-600">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.label}
                        className="w-5 h-5 object-contain"
                      />
                    ) : (
                      getMenuIcon(item)
                    )}
                  </div>
                  <span className="text-base font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewHeader;
