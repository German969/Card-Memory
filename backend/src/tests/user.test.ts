import request from "supertest";
import app from '../server';
import mongoose from "mongoose";
import User from '../models/user';

afterAll(async () => {
  app.close();
  await mongoose.connection.close();
})

describe('POST /api/users/register', () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
  });

  it("should return error with existing user", async () => {
    await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    const res = await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Username already exists");

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
  });

  it("should return error with invalid payload", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: 'testUser',
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error registering user");
  });
});

describe('POST /api/users/login', () => {
  it("should return token and userID", async () => {
    // Preset
    await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    const res = await request(app).post("/api/users/login").send({
      username: 'testUser',
      password: 'test123'
    });

    const user = await User.findOne({ username: 'testUser' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.userID).toBe(user._id.toString());

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
  });

  it("should return error if user not exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      username: 'testUser',
      password: 'test123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid username or password');
  });

  it("should return error if password not match", async () => {
    // Preset
    await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    const res = await request(app).post("/api/users/login").send({
      username: 'testUser',
      password: 'invalid'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid username or password');

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
  });
});
