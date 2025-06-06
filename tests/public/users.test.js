import request from 'supertest';
import assert from 'node:assert';
import app from '../../index.js';

export async function run() {
  const email = `testuser_${Date.now()}@test.com`;
  const password = 'testpass';

  // Register
  const regRes = await request(app).post('/users/register').send({ email, passwordHash: password });
  assert.strictEqual(regRes.statusCode, 201);
  assert.ok(regRes.body.token);
  console.log('✅ Register passed');

  // Login
  const loginRes = await request(app).post('/users/login').send({ email, password });
  assert.strictEqual(loginRes.statusCode, 200);
  assert.ok(loginRes.body.token);
  const token = loginRes.body.token;
  console.log('✅ Login passed');

  // Get /me
  const meRes = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);
  assert.strictEqual(meRes.statusCode, 200);
  assert.strictEqual(meRes.body.email, email);
  console.log('✅ /me passed');
}
