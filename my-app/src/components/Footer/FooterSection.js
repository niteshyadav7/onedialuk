import React, { useEffect, useState } from "react";
import axios from "axios";

const FooterSection = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend.onedialusa.com/api/footer-data")
      .then((res) => {
        setFooterData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load footer data", err);
      });
  }, []);

  if (!footerData) return null;

  // Destructure for easier access
  const { footer_sections, footer_links, app_icons, footer_content } =
    footerData;

  // Group links by section
  const sectionLinks = footer_sections.map((section) => {
    return {
      ...section,
      links: footer_links.filter((link) => link.section_id === section.id),
    };
  });

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Company */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Cities
          </h3>
          {/* <p className="text-sm text-gray-700 max-w-3xl">{footer_content.about_company}</p> */}
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {sectionLinks.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.path}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Store Buttons */}
        <hr />
        <div className="flex flex-col sm:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <h3 className="text-lg font-semibold text-center  text-gray-900 mb-4 mt-6">
            Follow us on
          </h3>

          <div className="mt-5">
            <div className="flex gap-4 ">
              {app_icons.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={app.image_url}
                    alt={app.label}
                    className="h-12 w-auto"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <div
          className="text-gray-600 text-sm font-bold mb-4 sm:mb-0"
          dangerouslySetInnerHTML={{ __html: footer_content?.copyright_text }}
        />
        <div className="flex space-x-6">
          <a
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200 font-semibold"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">-</span>
          <a
            href="/terms"
            className="text-gray-600 font-semibold hover:text-blue-600 text-sm transition-colors duration-200"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
