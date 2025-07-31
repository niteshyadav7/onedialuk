import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageFreeListing = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchClaimContent = async () => {
      try {
        const response = await axios.get(
          "https://backend.onedialusa.com/api/claim-content"
        );
        const activeContent = response.data.find(
          (item) => item.is_active === 1
        );
        setContent(activeContent);
      } catch (error) {
        console.error("Error fetching claim content:", error);
      }
    };

    fetchClaimContent();
  }, []);

  if (!content) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-1 lg:order-1">
            <div className="relative">
              {/* <img
                src={`https://backend.onedialusa.com${content.image_url}`}
                alt="Free Listing Visual"
                className="rounded-lg shadow-2xl w-full h-auto"
              /> */}
              <img
                src={`https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800`}
                alt="Free Listing Visual"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Content */}
          {/* <div className="order-2 lg:order-2 flex justify-center items-center flex-col">
            <h1
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: content.heading }}
            />

            <p className="text-center mx-auto max-w-2xl leading-relaxed text-base text-gray-700">
              {content.paragraph}
            </p>

            {content.subheading && (
              <div className="mb-8">
                <p
                  className="text-gray-700 font-medium text-center mx-auto max-w-2xl leading-relaxed text-base "
                  dangerouslySetInnerHTML={{ __html: content.subheading }}
                />
              </div>
            )}

            {content.link_text && content.link_url && (
              <a
                href={content.link_url}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {content.link_text}
              </a>
            )}
          </div> */}
          {/* Content */}
          <div className="order-2 lg:order-1 flex justify-center items-center flex-col">
            {/* <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: content.heading }}
            /> */}
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
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl mt-3"
              >
                {content.link_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageFreeListing;
