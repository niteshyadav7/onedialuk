// components/Body/ListingCarousel.jsx
import React, { useRef, useEffect } from "react";
import ListingCard from "./ListingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dummyListings = [
  {
    title: "Sunset Cafe",
    address: "Beach Road, Goa",
    rating: 4.5,
    reviewCount: 120,
    category: "Restaurant",
    isPremium: true,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "TechHub Workspace",
    address: "Sector 62, Noida",
    rating: 4.0,
    reviewCount: 90,
    category: "Coworking",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Palm Fitness",
    address: "Downtown LA",
    rating: 4.8,
    reviewCount: 200,
    category: "Gym",
    isPremium: true,
    isVerified: false,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Dr. Smith Clinic",
    address: "5th Avenue, NYC",
    rating: 4.2,
    reviewCount: 75,
    category: "Clinic",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "TechHub Workspace",
    address: "Sector 62, Noida",
    rating: 4.0,
    reviewCount: 90,
    category: "Coworking",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Palm Fitness",
    address: "Downtown LA",
    rating: 4.8,
    reviewCount: 200,
    category: "Gym",
    isPremium: true,
    isVerified: false,
    backgroundImage:
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Dr. Smith Clinic",
    address: "5th Avenue, NYC",
    rating: 4.2,
    reviewCount: 75,
    category: "Clinic",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "TechHub Workspace",
    address: "Sector 62, Noida",
    rating: 4.0,
    reviewCount: 90,
    category: "Coworking",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Palm Fitness",
    address: "Downtown LA",
    rating: 4.8,
    reviewCount: 200,
    category: "Gym",
    isPremium: true,
    isVerified: false,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Dr. Smith Clinic",
    address: "5th Avenue, NYC",
    rating: 4.2,
    reviewCount: 75,
    category: "Clinic",
    isPremium: false,
    isVerified: true,
    backgroundImage:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const ListingCarousel = () => {
  const containerRef = useRef(null);

  const scrollNextCard = () => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector("div")?.offsetWidth || 300;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft + cardWidth >= maxScrollLeft - 10) {
      // Reset to start smoothly
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll to next card
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollNextCard, 4000); // every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    const cardWidth = container?.querySelector("div")?.offsetWidth || 300;
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollNextCard();
  };

  return (
    <div className="relative py-4">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll no-scrollbar gap-6 px-4 scroll-smooth"
      >
        {dummyListings.map((item, idx) => (
          <div key={idx} className="min-w-[300px] max-w-xs flex-shrink-0">
            <ListingCard {...item} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ListingCarousel;
