import request from 'supertest';
import assert from 'node:assert';
import app from '../../index.js';
import { issueToken } from '../../src/lib/jwt.js';

export async function run() {
  const fakeUserId = 'test-user';
  const fakeTcodeId = 'test-tcode';

  const token = issueToken(fakeUserId);
  const res = await request(app)
    .get(`/me/subscription?tcode=${fakeTcodeId}`)
    .set('Authorization', `Bearer ${token}`);

  assert.strictEqual(res.statusCode, 200);
  assert.ok(typeof res.body.access === 'boolean');
  console.log('✅ Subscription check passed');
}
