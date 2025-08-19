// tests/subcategory.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

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

  // Create Category for subcategory reference
  category = await Category.create({
    name: "Tech",
    slug: "tech",
    createdBy: "64eabcd1234567890abcdef0",
  });
});

afterEach(async () => {
  await SubCategory.deleteMany();
});

afterAll(async () => {
  await Admin.deleteMany();
  await Category.deleteMany();
  await mongoose.disconnect();
  await mongoServer.stop();
});

// --------------------
// SubCategory API Tests
// --------------------
describe("SubCategory API Integration", () => {
  describe("POST /api/sub-category", () => {
    it("should create a subcategory successfully", async () => {
      const res = await request(app).post("/api/sub-category").send({
        name: "Artificial Intelligence",
        category: category._id,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Artificial Intelligence");
      expect(res.body.data.slug).toBe("artificial-intelligence");
      expect(res.body.data.category.toString()).toBe(category._id.toString());
    });

    it("should not allow duplicate slug", async () => {
      await SubCategory.create({
        name: "Duplicate",
        slug: "duplicate",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).post("/api/sub-category").send({
        name: "Duplicate",
        category: category._id,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toMatch(/already exists/i);
    });
  });

  describe("GET /api/sub-category", () => {
    it("should return all subcategories", async () => {
      await SubCategory.create([
        {
          name: "AI",
          slug: "ai",
          category: category._id,
          createdBy: "64eabcd1234567890abcdef0",
        },
        {
          name: "ML",
          slug: "ml",
          category: category._id,
          createdBy: "64eabcd1234567890abcdef0",
        },
      ]);

      const res = await request(app).get("/api/sub-category");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe("GET /api/sub-category/:slug", () => {
    it("should return subcategory by slug", async () => {
      const subCat = await SubCategory.create({
        name: "Data Science",
        slug: "data-science",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).get(`/api/sub-category/${subCat.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("Data Science");
    });

    it("should return 404 if subcategory not found", async () => {
      const res = await request(app).get("/api/sub-category/not-found");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });

  describe("PUT /api/sub-category/:slug", () => {
    it("should update a subcategory", async () => {
      const subCat = await SubCategory.create({
        name: "Old Name",
        slug: "old-name",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app)
        .put(`/api/sub-category/${subCat.slug}`)
        .send({ name: "New Name" });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("New Name");
      expect(res.body.data.slug).toBe("new-name");
    });

    it("should not update if slug conflicts with another subcategory", async () => {
      await SubCategory.create({
        name: "First",
        slug: "first",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const subCat = await SubCategory.create({
        name: "Second",
        slug: "second",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app)
        .put(`/api/sub-category/${subCat.slug}`)
        .send({ name: "First" });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toMatch(/already exists/i);
    });
  });

  describe("DELETE /api/sub-category/:slug", () => {
    it("should soft delete a subcategory", async () => {
      const subCat = await SubCategory.create({
        name: "Delete Me",
        slug: "delete-me",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
      });

      const res = await request(app).delete(`/api/sub-category/${subCat.slug}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      const deleted = await SubCategory.findOne({ slug: "delete-me" });
      expect(deleted.isDeleted).toBe(true);
    });

    it("should return 404 when deleting already deleted subcategory", async () => {
      await SubCategory.create({
        name: "Deleted",
        slug: "deleted",
        category: category._id,
        createdBy: "64eabcd1234567890abcdef0",
        isDeleted: true,
      });

      const res = await request(app).delete("/api/sub-category/deleted");

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });
});
