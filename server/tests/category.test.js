// tests/category.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Category = require("../models/category.model");
const Admin = require("../models/admin.model");

// --------------------
// Mock admin authentication middleware
// --------------------
jest.mock("../middlewares/admin.middleware", () => {
  const mongoose = require("mongoose");
  const fixedAdminId = new mongoose.Types.ObjectId("64eabcd1234567890abcdef0"); // fixed string literal

  return {
    isAdminAuthenticated: (req, res, next) => {
      req.adminId = fixedAdminId; // inject fixed admin ID
      next();
    },
    __mockAdminId: fixedAdminId, // optional export for use in tests
  };
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a test admin using same fixed ID
  await Admin.create({
    _id: "64eabcd1234567890abcdef0", // must match fixedAdminId
    fullName: "Admin User",
    email: "admin@example.com",
    password: "password123",
    phone: "1234567890",
    role: "admin",
  });
});

afterEach(async () => {
  await Category.deleteMany();
});

afterAll(async () => {
  await Admin.deleteMany();
  await mongoose.disconnect();
  await mongoServer.stop();
});

// --------------------
// Category API Tests
// --------------------
describe("Category API Integration", () => {
  describe("POST /api/categories", () => {
    it("should create a category successfully", async () => {
      const res = await request(app)
        .post("/api/categories")
        .send({ name: "Test Category" });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Test Category");
      expect(res.body.data.slug).toBe("test-category");
      expect(res.body.data.createdBy).toBeDefined();
    });

    it("should not create category with duplicate slug", async () => {
      await Category.create({
        name: "Existing Category",
        slug: "existing-category",
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app)
        .post("/api/categories")
        .send({ name: "Existing Category" });

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already exists/i);
    });
  });

  describe("GET /api/categories", () => {
    it("should get all categories", async () => {
      await Category.create([
        { name: "Cat 1", slug: "cat-1", createdBy: "64eabcd1234567890abcdef0" },
        { name: "Cat 2", slug: "cat-2", createdBy: "64eabcd1234567890abcdef0" },
      ]);

      const res = await request(app).get("/api/categories");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe("GET /api/categories/:slug", () => {
    it("should get category by slug", async () => {
      const category = await Category.create({
        name: "Single Cat",
        slug: "single-cat",
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).get(`/api/categories/${category.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Single Cat");
    });

    it("should return 404 for non-existing category", async () => {
      const res = await request(app).get("/api/categories/not-found");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  describe("PUT /api/categories/:slug", () => {
    it("should update category name and slug", async () => {
      const category = await Category.create({
        name: "Old Name",
        slug: "old-name",
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app)
        .put(`/api/categories/${category.slug}`)
        .send({ name: "New Name" });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("New Name");
      expect(res.body.data.slug).toBe("new-name");
    });

    it("should not update if new name causes slug conflict", async () => {
      await Category.create({
        name: "Cat 1",
        slug: "cat-1",
        createdBy: "64eabcd1234567890abcdef0",
      });
      const category = await Category.create({
        name: "Cat 2",
        slug: "cat-2",
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app)
        .put(`/api/categories/${category.slug}`)
        .send({ name: "Cat 1" });

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already exists/i);
    });
  });

  describe("DELETE /api/categories/:slug", () => {
    it("should soft-delete a category", async () => {
      const category = await Category.create({
        name: "To Delete",
        slug: "to-delete",
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).delete(`/api/categories/${category.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isDeleted).toBe(true);
    });

    it("should return 404 for already deleted category", async () => {
      const category = await Category.create({
        name: "Already Deleted",
        slug: "already-deleted",
        createdBy: "64eabcd1234567890abcdef0",
        isDeleted: true,
      });

      const res = await request(app).delete(`/api/categories/${category.slug}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
  });
});
