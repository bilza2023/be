// tests/stories/duplicateUser.test.js
require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');



describe('User registration duplicate check', () => {
  const user = {
    email: 'duptest@example.com',
    password: 'dup12345'
  };

  it('should reject duplicate registrations with same email', async () => {
    const first = await request(app).post('/users/register').send(user);
    expect(first.status).toBe(201);

    const second = await request(app).post('/users/register').send(user);
    expect(second.status).toBe(400);
  });
});
