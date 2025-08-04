import React, { useEffect, useState } from "react";
import {
  Star,
  Navigation,
  PenTool,
  Shield,
  MessageCircle,
  Handshake,
} from "lucide-react";
import ServiceCard from "./ServiceCard";

// Map Font Awesome class names to Lucide icons
const iconMap = {
  "fa-solid fa-star": Star,
  "fa-solid fa-location-arrow": Navigation,
  "fa-solid fa-pen-nib": PenTool,
  "fa-solid fa-shield-halved": Shield,
  "fa-solid fa-comments": MessageCircle,
  "fa-solid fa-handshake": Handshake,
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://backend.onedialusa.com/api/our-services"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter only active services and map icons
          const mappedServices = data
            .filter((service) => service.is_active)
            .map((service) => ({
              ...service,
              icon: iconMap[service.icon_class] || Star, // fallback to Star if not mapped
            }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services at One Dial
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <div className="flex flex-row flex-wrap"> */}
          {/* {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              // className="hover:scale-105 transform transition-transform duration-300"
              className="bg-[#05164c]"
            />
          ))} */}
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              className={`${
                index % 2 === 0
                  ? "bg-[#05164c] text-white"
                  : "bg-[#93a7ec] text-[#05164c]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
