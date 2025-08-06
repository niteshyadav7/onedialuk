const BASE_URL = "http://localhost:8080/api/sub-category";

const getToken = () => {
  return localStorage.getItem("token"); // Adjust if you're using cookies or another key
};

export const subCategoryApi = {
  getAll: async () => {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },

  getBySlug: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (slug, data) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (slug) => {
    const res = await fetch(`${BASE_URL}/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },
};
