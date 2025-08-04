import React from "react";

const services = [
  {
    id: 1,
    title: "Logo Designing",
    description:
      "We will help you to turn your company's logo into a unique brand.",
    image: "https://www.perfectmarketingsolution.com/assets/images/edit-tools.png",
    bg: "bg-red-100",
  },
  {
    id: 2,
    title: "Mobile Responsive",
    description:
      "Give your website the perfect mobile responsive experience by making Responsive Website.",
    image:
      "https://www.perfectmarketingsolution.com/assets/images/responsive.png",
    bg: "bg-orange-100",
  },
  {
    id: 3,
    title: "Website Redesigning",
    description:
      "Drive more leads and traffice to the site by redesigning your website.",
    image: "https://www.perfectmarketingsolution.com/assets/images/website.png",
    bg: "bg-yellow-100",
  },
  {
    id: 4,
    title: "UX/UI Designing",
    description:
      "Grab your customer attention by providing them a rich user experience.",
    image: "https://www.perfectmarketingsolution.com/assets/images/website.png",
    bg: "bg-green-100",
  },
  {
    id: 5,
    title: "HTML Page Designing",
    description:
      "Provide your page's content a responsive design through HTML page designing.",
    image:
      "https://www.perfectmarketingsolution.com/assets/images/programing.png",
    bg: "bg-blue-100",
  },
  {
    id: 6,
    title: "Layout Designing",
    description:
      "Stunning and effective home page design layout attracting user's attention.",
    image: "https://www.perfectmarketingsolution.com/assets/images/sidebar.png",
    bg: "bg-purple-100",
  },
];

const ExpertiseSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-10">
      {/* Left Section */}
      <div className="lg:w-1/4 bg-gray-800 text-white p-6 rounded-lg">
        <h5 className="text-xl font-semibold mb-3 text-left">OUR EXPERTISE</h5>
        <p className="text-sm mb-4 text-left">
          Our services range from SEO to PPC taking your brand to new heights
          by generating traffic and leads. Our expertise includes Web Designing,
          Web Development, SEO, SMM, PPC, E-Mail Marketing and other top
          digital services.
        </p>
        <div className="text-left">
          <a
            href="https://www.perfectmarketingsolution.com/all-services"
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            All Services
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`${service.bg} p-5 rounded-lg shadow-md hover:shadow-lg transition`}
          >
            <div className="mb-3 text-left">
              <img src={service.image} alt={service.title} className="mb-2" />
            </div>
            <h6 className="text-lg font-semibold mb-2 text-left">
              {service.title}
            </h6>
            <p className="text-sm text-left">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseSection;
