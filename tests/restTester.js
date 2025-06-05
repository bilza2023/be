// tests/restTester.js
import request from 'supertest';
import app from '../index.js';

export async function runRestCrudTest({ route, sample, headers = {}, key = 'id' }) {
  const testId = sample[key] || `test-${Date.now()}`;
  const testData = { ...sample, [key]: testId };
  const updatedData = { ...testData, title: (testData.title || 'Updated') + ' (updated)' };

  console.log(`\n🧪 Testing CRUD for ${route}...`);

  // Create
  const postRes = await request(app)
    .post(route)
    .set(headers)
    .send(testData);
  if (postRes.statusCode !== 201) throw new Error(`POST failed: ${postRes.text}`);
  console.log('✅ POST passed');

  // Read
  const getRes = await request(app)
    .get(`${route}?${key}=${testId}`)
    .set(headers);
  if (getRes.statusCode !== 200 || !getRes.body.length) throw new Error(`GET failed: ${getRes.text}`);
  console.log('✅ GET passed');

  // Update
  const putRes = await request(app)
    .put(`${route}/${testId}`)
    .set(headers)
    .send(updatedData);
  if (putRes.statusCode !== 200) throw new Error(`PUT failed: ${putRes.text}`);
  console.log('✅ PUT passed');

  // Delete
  const deleteRes = await request(app)
    .delete(`${route}/${testId}`)
    .set(headers);
  if (deleteRes.statusCode !== 204) throw new Error(`DELETE failed: ${deleteRes.text}`);
  console.log('✅ DELETE passed');

  // Confirm Deletion
  const confirmRes = await request(app)
    .get(`${route}?${key}=${testId}`)
    .set(headers);
  if (confirmRes.statusCode !== 200 || confirmRes.body.length !== 0) throw new Error(`Confirm GET failed: ${confirmRes.text}`);
  console.log('✅ Confirm Deletion passed');
}

export async function runBulkInsertTest({ route, samples, headers = {} }) {
  console.log(`\n🧪 Testing bulk insert for ${route}...`);
  const postRes = await request(app)
    .post(route)
    .set(headers)
    .send(samples);

  if (postRes.statusCode !== 201 && postRes.statusCode !== 200) {
    throw new Error(`Bulk POST failed: ${postRes.text}`);
  }
  console.log('✅ Bulk POST passed');
}