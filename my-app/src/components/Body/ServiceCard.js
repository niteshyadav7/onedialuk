import React from "react";
import { DivideIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  icon: Icon = DivideIcon,
  title,
  description,
  link,
  className = "",
}) => {
  return (
    <div className={`rounded-lg shadow-md p-2  text-center ${className}`}>
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16  rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-white " />
        </div>
      </div>

      <Link to={link}>
        <h3 className="text-xl font-semibold text-white mb-4 hover:text-blue-500">
          {title}
        </h3>
      </Link>

      <p className="text-white leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;

// import React from "react";
// import { DivideIcon } from "lucide-react";
// import { Link } from "react-router-dom";

// const ServiceCard = ({
//   icon: Icon = DivideIcon,
//   title,
//   description,
//   link,
//   className = "",
// }) => {
//   return (
//     <div className={`rounded-lg shadow-md p-6 text-left ${className}`}>
//       <div className="mb-4">
//         <Icon className="w-8 h-8 mb-2 text-white" />
//       </div>
//       <Link to={link}>
//         <h3
//           className={`text-lg font-semibold mb-2 ${
//             className.includes("text-white") ? "text-white" : "text-[#05164c]"
//           } hover:text-blue-500 transition`}
//         >
//           {title}
//         </h3>
//       </Link>
//       <p className="text-sm leading-relaxed">
//         {description}
//       </p>
//     </div>
//   );
// };

// export default ServiceCard;
