// tests/stories/userOnboarding.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
// const connectToMongo = require('../../mongo');
// const mongoose = require('mongoose');



describe('User Onboarding Story', () => {
  it('allows user to register and login successfully', async () => {
    const user = {
      email: 'storyuser@example.com',
      password: 'strongpass456'
    };

    // Step 1: Register
    const registerRes = await request(app).post('/users/register').send(user);
    expect(registerRes.status).toBe(201);
    expect(registerRes.body).toHaveProperty('token');
    const regToken = registerRes.body.token;

    // Step 2: Login
    const loginRes = await request(app).post('/users/login').send(user);
    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
    const loginToken = loginRes.body.token;

    // Optional: check that both tokens are strings
    expect(typeof regToken).toBe('string');
    expect(typeof loginToken).toBe('string');
  });
});
