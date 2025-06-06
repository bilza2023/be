import request from 'supertest';
import assert from 'node:assert';
import app from '../../index.js';

export async function run() {
  const res = await request(app)
    .post('/admin/messages')
    .set('x-admin-secret', process.env.ADMIN_SECRET || 'your-secret')
    .send({
      senderType: 'system',
      content: '📡 Workshop admin message',
      tags: 'test,admin',
      props: { origin: 'admin_test' }
    });

  assert.strictEqual(res.statusCode, 201);
  assert.ok(res.body.id);
  console.log('✅ Admin message POST passed');

  const getRes = await request(app)
    .get('/admin/messages')
    .set('x-admin-secret', process.env.ADMIN_SECRET || 'your-secret');

  assert.strictEqual(getRes.statusCode, 200);
  assert.ok(Array.isArray(getRes.body));
  console.log('✅ Admin message GET passed');
}
