import request from 'supertest';
import assert from 'node:assert';
import app from '../../index.js';

export async function run() {
  const res = await request(app).post('/messages').send({
    senderType: 'user',
    content: 'Test message from user',
    tags: 'test,public',
    props: { mood: 'testing' }
  });

  assert.strictEqual(res.statusCode, 201);
  assert.ok(res.body.id);
  console.log('✅ Public message logging passed');
}
