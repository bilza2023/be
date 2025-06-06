// tests/health.test.js

const request = require('supertest');
const { app } = require('../index');

describe('Health Check', () => {
  it('should return 200 and status message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Workshop backend is running');
  });
});
