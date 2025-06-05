// tests/_raw/tcodes.test.js
import request from 'supertest';
import assert from 'node:assert';
import app from '../index.js';

const run = async () => {
  const postRes = await request(app)
    .post('/admin/tcodes')
    .send({
      tcode: 'fbise9math',
      chapter: 1,
      exercise: '1.1',
      slides: { type: 'text', content: 'hello raw test' }
    });

  assert.strictEqual(postRes.statusCode, 201);
  console.log('✅ POST passed');

  const getRes = await request(app).get('/admin/tcodes');
  assert.strictEqual(getRes.statusCode, 200);
  assert.ok(Array.isArray(getRes.body));
  console.log('✅ GET passed');
};

run();
