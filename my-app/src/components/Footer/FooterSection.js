import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Perfect Marketing Solution is a one stop Digital Marketing Company
              providing{" "}
              <Link
                to="/about"
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Read More
              </Link>
            </p>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <div className="text-lg font-bold">
                  <span className="text-white">PERFECT MARKETING</span>
                </div>
                <div className="text-sm text-gray-300 tracking-wider">
                  SOLUTION
                </div>
              </div>
            </div>

            {/* Newsletter */}
            {/* <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="px-6 py-3 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div> */}
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Address</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  99 Wall Street STE#1597 New York NY 10005
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300">+91- 9212306116</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-300">
                  info@perfectmarketingsolution.com
                </span>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                { label: "SMO", to: "/services/smo" },
                { label: "Organic SEO", to: "/services/seo" },
                { label: "PPC", to: "/services/ppc" },
                { label: "Web Design", to: "/services/web-design" },
                { label: "Web Development", to: "/services/web-development" },
                { label: "Blog", to: "/blog" },
              ].map(({ label, to }) => (
                <li key={label} className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                  <Link
                    to={to}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "Privacy Policy", to: "/privacy-policy" },
              ].map(({ label, to }) => (
                <li key={label} className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-orange-500" />
                  <Link
                    to={to}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Icons - external links remain <a> */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              2025 © ALL COPYRIGHT RESERVED BY ONEDIALUK.COM
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
