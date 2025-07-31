import React from "react";
import { MapPin, Briefcase, Search, ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import CategorySection from "./CategorySection";
import {
  faDollarSign,
  faUtensils,
  faStethoscope,
  faScaleBalanced,
  faHelmetSafety,
  faCar,
  faTooth,
  faHotel,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const SearchSection = () => {
  return (
    <section className="hidden lg:block py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl font-semibold text-white mb-12">
          Find a{" "}
          <span className="text-yellow-400">
            <Typewriter
              words={["Coworker", "Plot", "Apartment"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={70}
              delaySpeed={2000}
            />
          </span>{" "}
          Near You
        </h1>

        {/* Search Form */}
        <div className="bg-white rounded-md shadow-md border border-red-500 p-4 mb-8">
          <div className="flex gap-4">
            {/* Location Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full pl-10 pr-3 py-3 rounded-md focus:outline-none"
              />
            </div>

            {/* Category Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Enter Category"
                className="w-full pl-10 pr-3 py-3 rounded-md focus:outline-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-blue-700 hover:bg-custom-gradient text-white px-8 py-3 rounded-md flex items-center justify-center space-x-2 transition-colors">
              <Search size={20} />
              <span className="font-semibold">Search</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <CategorySection icon={faDollarSign} name={"Finance"} />
          <CategorySection icon={faUtensils} name={"Restaurants"} />
          <CategorySection icon={faStethoscope} name={"Doctors"} />
          <CategorySection icon={faScaleBalanced} name={"Lawyers"} />
          <CategorySection icon={faHelmetSafety} name={"Construction"} />
          <CategorySection icon={faCar} name={"Automotive"} />
          <CategorySection icon={faTooth} name={"Dentist"} />
          <CategorySection icon={faHotel} name={"Hotels"} />
          <CategorySection icon={faGraduationCap} name={"Education"} />
        </div>
        <div className="text-center mt-8">
          <button className="text-white font-medium flex items-center gap-2 mx-auto hover:text-yellow-400 transition-colors">
            All Categories
            <ArrowRight className="w-6 h-6 animate-wiggleX" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
