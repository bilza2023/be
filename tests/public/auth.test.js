// tests/public/auth.test.js

const request = require('supertest');
const { app } = require('../../index');
const connectToMongo = require('../../mongo');
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectToMongo();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Routes', () => {
  const testUser = {
    email: `auth${Date.now()}@example.com`,
    password: 'testpass123'
  };

  let token = null;

  it('should register a new user', async () => {
    const res = await request(app).post('/users/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should not register same email again', async () => {
    const res = await request(app).post('/users/register').send(testUser);
    expect(res.status).toBe(400); // handled explicitly
  });

  it('should login with correct credentials', async () => {
    const res = await request(app).post('/users/login').send(testUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // update token in case it's newer
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/users/login').send({
      email: testUser.email,
      password: 'wrongpass'
    });
    expect(res.status).toBe(401);
  });

  it('should get user profile with token', async () => {
    await new Promise((res) => setTimeout(res, 100)); // ensure write flush
    const res = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  it('should reject profile access without token', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(401);
  });
});
