import React from "react";

const StaticPages = ({ title, content }) => {
  return (
    <div className="pt-24">
      <h1 className="text-center text-2xl font-semibold mb-8">{title}</h1>
      <div
        className="prose prose-lg max-w-5xl mx-auto text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default StaticPages;
