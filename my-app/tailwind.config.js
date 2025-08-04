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
