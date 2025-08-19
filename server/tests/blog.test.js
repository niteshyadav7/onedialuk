// tests/blog.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

const Blog = require("../models/blog.model");
const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");
const Admin = require("../models/admin.model");

// --------------------
// Mock admin middleware
// --------------------
jest.mock("../middlewares/admin.middleware", () => {
  const mongoose = require("mongoose");
  const fixedAdminId = new mongoose.Types.ObjectId("64eabcd1234567890abcdef0");
  return {
    isAdminAuthenticated: (req, res, next) => {
      req.adminId = fixedAdminId;
      next();
    },
    __mockAdminId: fixedAdminId,
  };
});

let mongoServer;
let category;
let subCategory;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create Admin
  await Admin.create({
    _id: "64eabcd1234567890abcdef0",
    fullName: "Admin User",
    email: "admin@example.com",
    password: "password123",
    phone: "1234567890",
    role: "admin",
  });

  // Create Category and SubCategory
  category = await Category.create({
    name: "Tech",
    slug: "tech",
    createdBy: "64eabcd1234567890abcdef0",
  });

  subCategory = await SubCategory.create({
    name: "AI",
    slug: "ai",
    category: category._id,
    createdBy: "64eabcd1234567890abcdef0",
  });
});

afterEach(async () => {
  await Blog.deleteMany();
});

afterAll(async () => {
  await Admin.deleteMany();
  await Category.deleteMany();
  await SubCategory.deleteMany();
  await mongoose.disconnect();
  await mongoServer.stop();
});

// --------------------
// Blog API Tests
// --------------------
describe("Blog API Integration", () => {
  describe("POST /api/blogs", () => {
    it("should create a blog successfully", async () => {
      const res = await request(app).post("/api/blogs").send({
        title: "First Blog",
        content: "This is the first blog content",
        category: category._id,
        subCategory: subCategory._id,
        image: "test.jpg",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("First Blog");
      expect(res.body.data.slug).toBe("first-blog");
      expect(res.body.data.category.toString()).toBe(category._id.toString());
    });

    it("should not allow duplicate slug", async () => {
      await Blog.create({
        title: "Duplicate",
        slug: "duplicate",
        content: "Already exists",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).post("/api/blogs").send({
        title: "Duplicate",
        content: "Trying again",
        category: category._id,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toMatch(/already exists/i);
    });
  });

  describe("GET /api/blogs", () => {
    it("should return all blogs", async () => {
      await Blog.create([
        {
          title: "Blog 1",
          slug: "blog-1",
          content: "content",
          category: category._id,
          createdBy: "64eabcd1234567890abcdef0",
        },
        {
          title: "Blog 2",
          slug: "blog-2",
          content: "content",
          category: category._id,
          createdBy: "64eabcd1234567890abcdef0",
        },
      ]);

      const res = await request(app).get("/api/blogs");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe("GET /api/blogs/:slug", () => {
    it("should return blog by slug", async () => {
      const blog = await Blog.create({
        title: "Single Blog",
        slug: "single-blog",
        content: "Some content",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).get(`/api/blogs/${blog.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe("Single Blog");
    });

    it("should return 404 if blog not found", async () => {
      const res = await request(app).get("/api/blogs/not-found");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });

  describe("PUT /api/blogs/:slug", () => {
    it("should update a blog", async () => {
      const blog = await Blog.create({
        title: "Old Title",
        slug: "old-title",
        content: "Old content",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).put(`/api/blogs/${blog.slug}`).send({
        title: "New Title",
        content: "Updated content",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe("New Title");
      expect(res.body.data.slug).toBe("new-title");
    });

    it("should return 404 when updating non-existing blog", async () => {
      const res = await request(app)
        .put("/api/blogs/not-found")
        .send({ title: "Doesn't matter" });

      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/blogs/:slug", () => {
    it("should soft delete a blog", async () => {
      const blog = await Blog.create({
        title: "Delete Me",
        slug: "delete-me",
        content: "content",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).delete(`/api/blogs/${blog.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      const deleted = await Blog.findOne({ slug: "delete-me" });
      expect(deleted.isDeleted).toBe(true);
    });

    it("should return 404 when deleting already deleted blog", async () => {
      await Blog.create({
        title: "Deleted",
        slug: "deleted",
        content: "content",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
        isDeleted: true,
      });

      const res = await request(app).delete("/api/blogs/deleted");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });
});
