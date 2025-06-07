// tests/stories/adminEditsMessage.test.js

const request = require('supertest');
const { app } = require('../../index');
const { connectToTestMongo, disconnectTestMongo } = require('../utils/testMongo');

beforeAll(connectToTestMongo);
afterAll(disconnectTestMongo);

describe('Admin edits a message sent by user', () => {
  const user = {
    email: 'edit-test@example.com',
    password: 'pass1234'
  };

  let token;
  let messageId;

  it('allows admin to edit a user message', async () => {
    // Register and login user
    const regRes = await request(app).post('/users/register').send(user);
    token = regRes.body.token;

    // User sends a message
    const msg = {
      senderType: 'user',
      content: 'Original message for admin edit test',
      tags: 'admin,edit',
      props: { origin: 'admin_test' }
    };

    const postRes = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(msg);

    expect(postRes.status).toBe(201);
    messageId = postRes.body._id;

    // Admin edits the message
    const updated = {
      senderType: 'user',
      content: 'Message successfully edited by admin',
      tags: 'admin,edited',
      props: { origin: 'admin_test' }
    };

    const putRes = await request(app)
      .put(`/admin/messages/${messageId}`)
      .set('x-admin-secret', process.env.ADMIN_SECRET)
      .send(updated);

    expect(putRes.status).toBe(200);
    expect(putRes.body.content).toBe(updated.content);
    expect(putRes.body.tags).toContain('admin,edited');
  });
});
