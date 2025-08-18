// tests/auth.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // Your Express app
const Admin = require("../models/admin.model");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await Admin.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth API Integration", () => {

  describe("POST /api/auth/register", () => {
    it("should register a user successfully", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Test User",
          email: "test@example.com",
          password: "password123",
          phone: "1234567890"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should not allow registration with existing email", async () => {
      // Create an existing user first
      await Admin.create({
        fullName: "Existing User",
        email: "existing@example.com",
        password: "password123",
        phone: "1234567890"
      });

      const res = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Another User",
          email: "existing@example.com",
          password: "password123",
          phone: "0987654321"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it("should return validation error for short password", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Short Pass",
          email: "shortpass@example.com",
          password: "123",
          phone: "1234567890"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/at least 6 characters/i);
    });

    it("should return validation error for missing phone", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "No Phone",
          email: "nophone@example.com",
          password: "password123"
          // phone missing
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/phone/i);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Ensure a user exists for login tests
      await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Login User",
          email: "login@example.com",
          password: "password123",
          phone: "1234567890"
        });
    });

    it("should login successfully with correct credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@example.com",
          password: "password123"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe("login@example.com");
    });

    it("should not login with incorrect password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@example.com",
          password: "wrongpass"
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });

    it("should return validation error for invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "notanemail",
          password: "password123"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/valid email/i);
    });
  });

});
