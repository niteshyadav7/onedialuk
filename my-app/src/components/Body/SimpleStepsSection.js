import React, { useEffect, useState } from "react";
import axios from "axios";

const SimpleStepsSection = () => {
  const [section, setSection] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchStepsData = async () => {
      try {
        const res = await axios.get(
          "https://backend.onedialusa.com/api/detail-content"
        );
        const data = res.data;

        const sectionData = data.find(
          (item) => item.content_type === "section" && item.is_active === 1
        );
        const stepsData = data
          .filter(
            (item) => item.content_type === "step" && item.is_active === 1
          )
          .sort((a, b) => a.order_number - b.order_number);

        setSection(sectionData);
        setSteps(stepsData);
      } catch (error) {
        console.error("Error fetching steps data:", error);
      }
    };

    fetchStepsData();
  }, []);

  if (!section) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={step.image_url}
                  alt={step.title}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleStepsSection;
