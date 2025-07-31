// import CategorySection from "./CategorySection";
import Navbar from "./NavbarSection";
import SearchSection from "./SearchSection";

const HeroSection = () => {
  return (
    <>
      <div className="bg-custom-gradient h-screen w-screen">
        <div className="absolute top-0 left-0 w-full h-16  px-3  z-10">
          <Navbar />
        </div>
        <div className="flex justify-center items-center h-screen flex-col">
          <SearchSection />
        </div>
      </div>
    </>
  );
};
export default HeroSection;
