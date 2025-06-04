// tests/parcel.test.js
const request = require("supertest");
const app = require("../app");
const Parcel = require("../models/parcel");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "testsecret";

describe("Parcel Routes", () => {
  let token;

  beforeEach(async () => {
    await Parcel.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      username: "parceluser",
      passwordHash: "hashed",
      role: "admin",
    });

    token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "testsecret",
      { expiresIn: "1h" }
    );
  });

  test("should create a parcel", async () => {
    const res = await request(app)
      .post("/api/parcels")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ParcelNumber: "12345",
        OwnerRecords: [{ Name: "John Doe" }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.ParcelNumber).toBe("12345");
  });

  test("should get parcel by id", async () => {
    const parcel = await Parcel.create({ ParcelNumber: "abc123" });

    const res = await request(app)
      .get(`/api/parcels/${parcel._id}`) // use MongoDB _id here
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.ParcelNumber).toBe("abc123");
  });
});
