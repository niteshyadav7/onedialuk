import React from "react";
import { Star, Heart, MapPin } from "lucide-react";

const ListingCard = ({
  title,
  address,
  rating,
  reviewCount,
  category,
  isPremium = false,
  isVerified = false,
  backgroundImage,
  categoryIcon,
}) => {
  const renderStars = (rating) => {
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Background Image */}
      <div
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isPremium && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              ⭐ Premium
            </span>
          )}
          {isVerified && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <div className="absolute top-3 right-3">
          <Heart className="w-6 h-6 text-white hover:text-red-500 cursor-pointer transition-colors" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <div className="flex items-center gap-1 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm opacity-90">{address}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
              {rating}
            </span>
            <span className="text-sm opacity-90">{reviewCount} Reviews</span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <div className="bg-pink-500 p-2 rounded-full">
              {categoryIcon || <Heart className="w-4 h-4 text-white" />}
            </div>
            <span className="text-sm font-medium">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
