// tests/stories/adminFailsWithWrongSecret.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');

describe('🚫 Admin route rejects wrong secret', () => {
  it('should reject admin access with invalid x-admin-secret', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('x-admin-secret', 'wrong-secret');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized: invalid admin secret');
  });
});
