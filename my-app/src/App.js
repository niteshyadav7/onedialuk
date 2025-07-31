import React from "react";
import HeroSection from "./components/Header/HeroSection";
import ListingCarousel from "./components/Body/ListingCarousal";
import ManageFreeListing from "./components/Body/ManageFreeListing";
import ReachLocalCustomers from "./components/Body/ReachLocalCustomers";
import SimpleStepsSection from "./components/Body/SimpleStepsSection";
import ReadyToGetStarted from "./components/Body/ReadyToGetStarted";
import AboutSection from "./components/Body/AboutSection";
import ServicesSection from "./components/Body/ServiceSection";
import AppDetailContent from "./components/Body/AppDetailContent";
import FooterSection from "./components/Footer/FooterSection";

const App = () => {
  return (
    <div className="overflow-x-hidden w-screen">
      <HeroSection />

      {/* ⬇️ FIRST MAIN — wider layout */}
      <main className="overflow-auto px-2 sm:px-4 lg:px-10 xl:px-16 mx-auto max-w-full">
        {" "}
        {/* ✅ UPDATED */}
        <div className="flex justify-center items-center bg-white p-8">
          <h2 className="text-2xl font-bold">The Featured Listings</h2>
        </div>
        <ListingCarousel />
        <ManageFreeListing />
        <ReachLocalCustomers />
        <SimpleStepsSection />
      </main>

      <ReadyToGetStarted />

      {/* ⬇️ SECOND MAIN — wider layout */}
      <main className="overflow-auto px-2 sm:px-4 lg:px-10 xl:px-16 mx-auto max-w-full">
        {" "}
        {/* ✅ UPDATED */}
        <AboutSection />
        <ServicesSection />
        <AppDetailContent />
        <FooterSection />
      </main>
    </div>
  );
};

export default App;
