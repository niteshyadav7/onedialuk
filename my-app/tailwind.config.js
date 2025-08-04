// // tailwind.config.js
// module.exports = {
//   content: ["./public/index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.js
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #0678b1 0%, #0e3d74 100%)",
      },
      keyframes: {
        wiggleX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        wiggleX: "wiggleX 0.9s ease-in-out infinite",
      },
    },
  },
  
  plugins: [require("@tailwindcss/typography")],
};
