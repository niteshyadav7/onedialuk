const BASE_URL = "http://localhost:8080/api/categories";

// Optional helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // or from context
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const categoryApi = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`);
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (slug, data) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.json();
  },
};
