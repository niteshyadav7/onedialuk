import React, { useEffect, useState } from "react";

const AppDetailContent = () => {
  const [appContent, setAppContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://backend.onedialusa.com/api/app-detail-content"
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAppContent(data[0]);
        }
      } catch (error) {
        console.error("Error fetching app content:", error);
      }
    };

    fetchData();
  }, []);

  if (!appContent) return null;

  return (
    <section className="  py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - image */}
          <div className="flex justify-center lg:justify-start h-auto lg:h-[500px]">
            <img
              src="https://onedialusa.com/img/mobileApp.avif"
              alt="Mobile App"
              className="w-full h-full object-cover rounded-3xl "
            />
          </div>

          {/* Right side - dynamic content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {appContent.title}
            </h1>

            {/* Dynamic List Content */}
            <div
              className="text-gray-700 space-y-2"
              dangerouslySetInnerHTML={{ __html: appContent.list_content }}
            />

            {/* Description */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Get the App:</span>{" "}
                {appContent.description}
              </p>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={appContent.play_store_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white rounded-lg px-3 py-3 flex items-center space-x-3 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <img
                  src={appContent.playstore_image}
                  alt="Play Store"
                  className="w-full h-full object-cover rounded-4xl "
                />
                {/* <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div> */}
              </a>

              <a
                href={appContent.app_store_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white rounded-lg px-3 py-3 flex items-center space-x-3 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <img
                  src={appContent.appstore_image}
                  alt="App Store"
                  className="w-full h-full object-cover rounded-4xl "
                />
                {/* <div>
                  <div className="text-xs">Available on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDetailContent;
