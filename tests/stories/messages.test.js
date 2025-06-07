// tests/stories/messages.test.js
require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { connectToTestMongo, disconnectTestMongo } = require('../utils/testMongo');


describe('User Message Story', () => {
  const user = {
    email: 'msguser@example.com',
    password: 'msgpass123'
  };

  let token = null;

  it('allows user to send a message and admin to read it', async () => {
    // Step 1: Register user
    const regRes = await request(app).post('/users/register').send(user);
    expect(regRes.status).toBe(201);
    token = regRes.body.token;

    // Step 2: Send a message
    const messageData = {
      senderType: 'user',
      content: 'Hello, this is a test message!',
     tags: ['test', 'external'],
      props: { origin: 'test_case' }
    };

    const postRes = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(messageData);

    expect(postRes.status).toBe(201);
    expect(postRes.body).toHaveProperty('content', messageData.content);

    // Step 3: Admin fetches messages
    const adminRes = await request(app)
      .get('/admin/messages')
      .set('x-admin-secret', process.env.ADMIN_SECRET);

    expect(adminRes.status).toBe(200);
    const found = adminRes.body.find(m => m.content === messageData.content);
    expect(found).toBeDefined();
    expect(found.senderType).toBe('user');
  });
});
