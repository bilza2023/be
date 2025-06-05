// tests/test_messages.js
import request from 'supertest';
import assert from 'node:assert';
import app from '../index.js';

export async function run() {
  const postRes = await request(app)
    .post('/admin/messages')
    .send({
      senderType: 'system',
      content: '📡 Workshop test message',
      tags: 'test,workshop',
      props: { origin: 'admin_test' }
    });

  assert.strictEqual(postRes.statusCode, 201);
  assert.ok(postRes.body.id);

  const getRes = await request(app).get('/admin/messages');
  assert.strictEqual(getRes.statusCode, 200);
  assert.ok(Array.isArray(getRes.body));
} 
