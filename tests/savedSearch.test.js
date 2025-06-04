const request = require("supertest");
const app = require("../app");
const SavedSearch = require("../models/savedSearch");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "testsecret";

describe("Saved Search Routes", () => {
  let user;
  let userId;
  let token;

  beforeEach(async () => {
    // Create a user and assign to `user`
    user = await User.create({
      username: "testuser",
      passwordHash: "hashed",
      role: "user",
    });

    userId = user._id;

    token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "testsecret",
      { expiresIn: "1h" }
    );
  });

  test("should create a new saved search", async () => {
    const res = await request(app)
      .post("/api/saved-searches")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Search",
        criteria: {
          "Residences.Bedrooms": { $gte: 3 },
        },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Search");

    const saved = await SavedSearch.findOne({ name: "Test Search" });
    expect(saved).not.toBeNull();
    expect(saved.userId.toString()).toBe(userId.toString());
  });
});
