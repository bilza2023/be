// tests/stories/loginFailures.test.js
require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { User } = require('../../mongo/models');
const bcrypt = require('bcrypt');



describe('Login failure and unauthorized access', () => {
  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'failcheck@example.com',
      password: 'wrongpass'
    });
    expect(res.status).toBe(401);
  });

  it('should reject profile access without token', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(401);
  });
});
