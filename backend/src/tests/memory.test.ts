import request from "supertest";
import app from '../server';
import mongoose from "mongoose";
import Save from '../models/save';
import User from '../models/user';

afterAll(async () => {
  app.close();
  await mongoose.connection.close();
})

describe("POST /api/memory/save", () => {
  it("Should save game", async () => {
    // Register user
    await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    // Login user
    const loginRes = await request(app).post("/api/users/login").send({
      username: 'testUser',
      password: 'test123'
    });

    const res = await request(app)
      .post("/api/memory/save")
      .set('authorization', 'Bearer ' + loginRes.body.token)
      .send({
        gameDate: new Date(),
        failed: 0,
        difficulty: 'Easy',
        completed: 1,
        timeTaken: 5,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Game data saved successfully');

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
    // Delete save
    await Save.deleteMany({ userID: loginRes.body.userID });
  });

  it("Should get history", async () => {
    // Register user
    await request(app).post("/api/users/register").send({
      username: 'testUser',
      password: 'test123'
    });

    // Login user
    const loginRes = await request(app).post("/api/users/login").send({
      username: 'testUser',
      password: 'test123'
    });

    await request(app)
      .post("/api/memory/save")
      .set('authorization', 'Bearer ' + loginRes.body.token)
      .send({
        gameDate: new Date(),
        failed: 0,
        difficulty: 'Easy',
        completed: 1,
        timeTaken: 5,
      });

    const res = await request(app)
      .get("/api/memory/history")
      .set('authorization', 'Bearer ' + loginRes.body.token);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);

    // Cleanup
    await User.deleteOne({ username: 'testUser' });
    // Delete save
    await Save.deleteMany({ userID: loginRes.body.userID });
  });
})
