import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StaticPages from "./StaticPages";
// import StaticPages from "../components/StaticPages";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const CACHE_DURATION = 24 * 60 * 60 * 1000;
let cache = {
  timestamp: 0,
  data: null,
};

const fetchPages = async () => {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  try {
    const res = await fetch("https://backend.onedialusa.com/api/pages");
    const json = await res.json();
    if (json?.pages) {
      cache = {
        timestamp: now,
        data: json.pages,
      };
      return json.pages;
    }
  } catch (err) {
    console.error("Error fetching pages:", err);
  }
  return cache.data;
};

const PageByTitle = () => {
  const { title } = useParams();
  console.log(title);

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      const pages = await fetchPages();
      if (!pages) return;

      const matched = pages.find((page) => slugify(page.title) === title);
      setPageData(matched || null);
    };

    loadPage();
  }, [title]);

  if (!pageData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">Page Not Found</h1>
      </div>
    );
  }

  return (
    <>
      {/* <title>{pageData.meta_title || pageData.title} | One Dial</title> */}
      {/* <meta
        name="description"
        content={pageData.meta_description || `About ${pageData.title}`}
      /> */}
      {/* <meta name="keywords" content={pageData.title} /> */}
      <StaticPages title={pageData.title} content={pageData.content} />
    </>
  );
};

export default PageByTitle;
