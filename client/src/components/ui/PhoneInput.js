import React, { useState } from "react";
import { motion } from "framer-motion";

const PhoneInput = ({
  value,
  onChange,
  placeholder = "+1",
  error,
  required = false,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative flex">
        <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
          <img
            src="https://flagcdn.com/w20/us.png"
            alt="US Flag"
            className="w-5 h-3 mr-2"
          />
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <motion.input
          type="tel"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-1 px-4 py-3 border rounded-r-lg 
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300"}
            ${isFocused ? "shadow-md" : "shadow-sm"} bg-white`}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default PhoneInput;
