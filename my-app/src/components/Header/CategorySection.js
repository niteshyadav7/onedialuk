import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CategorySection = function ({ icon, name }) {
  return (
    <div className="ml-10 hover:cursor-pointer">
      <FontAwesomeIcon icon={icon} className="text-white w-5 h-5" />
      <div className="text-white">{name}</div>
    </div>
  );
};

export default CategorySection;
