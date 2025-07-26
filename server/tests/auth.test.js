const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // your Express app
const User = require("../models/user.model");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth API Integration", () => {
  describe("POST /api/auth/register", () => {
    it("should register a user successfully", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should not allow registration with existing email", async () => {
      await User.create({
        name: "Test",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/auth/register").send({
        name: "Test 2",
        email: "test@example.com",
        password: "newpassword",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/email already exists/i);
    });

    it("should return validation error for short password", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "ShortPass",
        email: "short@example.com",
        password: "123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/at least 6 characters/i);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send({
        name: "Login User",
        email: "login@example.com",
        password: "validpass",
      });
    });

    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "validpass",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe("login@example.com");
    });

    it("should not login with incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "wrongpass",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });

    it("should return validation error for invalid email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "bademail",
        password: "validpass",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/valid email/i);
    });
  });

  describe("POST /api/auth/forget-password", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send({
        name: "Forgot User",
        email: "forgot@example.com",
        password: "forgotpass",
      });
    });

    it("should send password reset email", async () => {
      const res = await request(app)
        .post("/api/auth/forget-password")
        .send({ email: "forgot@example.com" });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/reset email sent successfully/i);
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app)
        .post("/api/auth/forget-password")
        .send({ email: "nouser@example.com" });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/user not found/i);
    });

    it("should return validation error for invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/forget-password")
        .send({ email: "not-an-email" });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toMatch(/valid email/i);
    });
  });
});
