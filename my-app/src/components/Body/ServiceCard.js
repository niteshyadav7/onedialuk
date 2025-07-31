import React from "react";
import { DivideIcon } from "lucide-react";

const ServiceCard = ({
  icon: Icon = DivideIcon,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-gray-700" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>

      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;
