import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReadyToGetStarted = () => {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    const fetchCTAContent = async () => {
      try {
        const res = await axios.get(
          "https://backend.onedialusa.com/api/cta-content"
        );
        const activeCTA = res.data.find((item) => item.is_active === 1);
        setCtaData(activeCTA);
      } catch (error) {
        console.error("Failed to fetch CTA content:", error);
      }
    };

    fetchCTAContent();
  }, []);

  if (!ctaData) return null; // You can also show a spinner here

  return (
    <section className="bg-gray-900 py-16 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-blue-900 to-gray-900"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          {ctaData.heading}
        </h2>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {ctaData.description}
        </p>

        <Link
          to={`/${ctaData.button_link}`}
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        >
          {ctaData.button_text}
        </Link>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};

export default ReadyToGetStarted;
