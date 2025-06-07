// tests/stories/userSystemMessageFlow.test.js

const request = require('supertest');
const { app } = require('../../index');
require('../utils/testSetup');
const { Message, User } = require('../../mongo/models');

describe('User and system message lifecycle with admin actions', () => {
  const user = {
    email: 'flow@example.com',
    password: 'pass1234'
  };

  let token = null;
  let userMessageId = null;
  let systemMessageId = null;

  it('runs full story: user sends message, system logs, admin moderates', async () => {
    // 1. Register user and get token
    const regRes = await request(app).post('/users/register').send(user);
    expect(regRes.status).toBe(201);
    token = regRes.body.token;

    // 2. User sends message
    const userMsg = {
      senderType: 'user',
      content: 'User message - normal',
      tags: ['user', 'test'],
      props: { origin: 'flow' }
    };

    const userMsgRes = await request(app)
      .post('/messages')
      .set('Authorization', `Bearer ${token}`)
      .send(userMsg);

    expect(userMsgRes.status).toBe(201);
    userMessageId = userMsgRes.body._id;

    // 3. System sends message (admin/system client)
    const systemMsg = {
      senderType: 'system',
      content: 'System message - auto alert',
      tags: ['system', 'alert'],
      props: { level: 'info' }
    };

    const systemMsgRes = await request(app)
      .post('/admin/messages')
      .set('x-admin-secret', process.env.ADMIN_SECRET)
      .send(systemMsg);

    expect(systemMsgRes.status).toBe(201);
    systemMessageId = systemMsgRes.body._id;

    // 4. Admin fetches all messages
    const allMessages = await request(app)
      .get('/admin/messages')
      .set('x-admin-secret', process.env.ADMIN_SECRET);

    expect(allMessages.status).toBe(200);
    expect(allMessages.body.length).toBeGreaterThanOrEqual(2);

    // 5. Admin deletes system messages
    const deleteRes = await request(app)
      .delete(`/admin/messages/${systemMessageId}`)
      .set('x-admin-secret', process.env.ADMIN_SECRET);

    expect(deleteRes.status).toBe(204);

    // 6. Admin updates user message with extra tags
    const updatedUserMsg = {
      senderType: 'user',
      content: 'User message - reviewed and retained',
      tags: ['user', 'moderated'],
      props: { origin: 'flow', reviewed: true }
    };

    const updateRes = await request(app)
      .put(`/admin/messages/${userMessageId}`)
      .set('x-admin-secret', process.env.ADMIN_SECRET)
      .send(updatedUserMsg);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.tags).toContain('moderated');
    expect(updateRes.body.props.reviewed).toBe(true);
  });
});
