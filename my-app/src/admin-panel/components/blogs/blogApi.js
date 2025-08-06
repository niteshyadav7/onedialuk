const BASE_URL = "http://localhost:8080/api/blogs";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const blogApi = {
  // Create a blog
  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Get all blogs
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  // Get blog by slug
  getBySlug: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`);
    return res.json();
  },

  // Update blog by slug
  update: async (slug, data) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Delete blog by slug
  delete: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },
};
