// tests/stories/userMe.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { connectToTestMongo, disconnectTestMongo } = require('../utils/testMongo');
// beforeAll(async () => {
//   await connectToTestMongo();
//   await User.deleteMany({});
// });

describe('User profile story - GET /users/me', () => {
  const user = {
    email: 'profilecheck@example.com',
    password: 'pass1234'
  };

  let token;

  it('returns the logged-in user profile', async () => {
    // Register the user
    const regRes = await request(app).post('/users/register').send(user);
    expect(regRes.status).toBe(201);
    token = regRes.body.token;

    // Fetch profile using token
    const meRes = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body).toHaveProperty('email', user.email);
    expect(meRes.body).not.toHaveProperty('passwordHash'); // Ensure password is excluded
  });

  it('rejects request without token', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(401);
  });
});
