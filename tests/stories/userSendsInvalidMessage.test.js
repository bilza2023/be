// tests/stories/userSendsInvalidMessage.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');

describe('📛 User sends invalid message payload', () => {
  const user = {
    email: 'badmsguser@example.com',
    password: 'pass1234'
  };

  let token = null;

  beforeAll(async () => {
    const res = await request(app).post('/users/register').send(user);
    token = res.body.token;
  });

  it('should reject message with missing required fields', async () => {
    const badPayload = {
      content: 'Missing senderType and tags'
      // senderType and tags are required by Zod
    };

    const res = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(badPayload);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation failed');
    expect(res.body.details).toMatch(/senderType/);
  });
});
