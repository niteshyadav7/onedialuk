import React, { useEffect, useState } from "react";
import axios from "axios";

const ReachLocalCustomers = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchBusinessContent = async () => {
      try {
        const res = await axios.get(
          "https://backend.onedialusa.com/api/business-content"
        );
        const data = res.data;

        if (data && data.length > 0 && data[0].is_active === 1) {
          setContent(data[0]);
        }
      } catch (error) {
        console.error("Error fetching business content:", error);
      }
    };

    fetchBusinessContent();
  }, []);

  if (!content) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 flex justify-center items-center flex-col">
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{
                __html: content.heading.replace(
                  /<span>/g,
                  '<span class="text-orange-500">'
                ),
              }}
            />

            <p
              className="text-center mx-auto max-w-2xl leading-relaxed text-base text-gray-700"
              style={{ width: "400px" }}
            >
              {content.paragraph}
            </p>
            {/* <a href={content.link_url}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl text-center mx-auto max-w-2xl leading-relaxed text-base ">
                {content.link_text}
              </button>
            </a> */}
            {content.link_text && content.link_url && (
              <a
                href={content.link_url}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl mt-4"
              >
                {content.link_text}
              </a>
            )}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* <img
                src={content.image_url.startsWith('http') ? content.image_url : `https://backend.onedialusa.com${content.image_url}`}
                alt="Business promo"
                className="rounded-lg shadow-2xl w-full h-auto"
              /> */}
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business meeting and collaboration"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReachLocalCustomers;
