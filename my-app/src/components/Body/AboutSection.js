import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const res = await axios.get(
          "https://backend.onedialusa.com/api/home-description"
        );
        setAboutData(res.data[0]); // Only one item expected
      } catch (error) {
        console.error("Failed to fetch About content:", error);
      }
    };

    fetchAboutContent();
  }, []);

  if (!aboutData) return null; // Or a loading spinner

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {aboutData.title}
          </h2>
        </div>

        <div
          className="space-y-6 text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: aboutData.content }}
        />
      </div>
    </section>
  );
};

export default AboutSection;
