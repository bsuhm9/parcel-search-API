const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "testsecret";

// Mock the batchFetchAndStore function
jest.mock("../seed/yakimaFetcher", () => ({
  batchFetchAndStore: jest.fn(),
}));

const { batchFetchAndStore } = require("../seed/yakimaFetcher");

describe("Yakima Routes", () => {
  let adminToken;
  let userToken;

  beforeAll(() => {
    // Create tokens once
    const adminUser = {
      id: "adminId123",
      username: "adminUser",
      role: "admin",
    };
    const normalUser = {
      id: "user123",
      username: "user",
      role: "user",
    };
    adminToken = jwt.sign(adminUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    userToken = jwt.sign(normalUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/yakima/batch - success", async () => {
    batchFetchAndStore.mockResolvedValue([
      { id: 1, data: "sample1" },
      { id: 2, data: "sample2" },
    ]);

    const res = await request(app)
      .post("/api/yakima/batch?limit=2")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Batch fetch and store successful");
    expect(res.body.count).toBe(2);
    expect(res.body.results).toHaveLength(2);
    expect(batchFetchAndStore).toHaveBeenCalledWith(2);
  });

  test("POST /api/yakima/batch - failure", async () => {
    batchFetchAndStore.mockRejectedValue(new Error("Fetch failed"));

    const res = await request(app)
      .post("/api/yakima/batch")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Batch fetch failed");
    expect(batchFetchAndStore).toHaveBeenCalledWith(10); // default limit
  });

  test("POST /api/yakima/batch - unauthorized if no token", async () => {
    const res = await request(app).post("/api/yakima/batch");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/invalid/i);
  });

  test("POST /api/yakima/batch - forbidden if not admin", async () => {
    const res = await request(app)
      .post("/api/yakima/batch")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch("Access denied: Admins only");
  });
});
