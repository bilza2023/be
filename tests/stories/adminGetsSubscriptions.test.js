require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { Subscription } = require('../../mongo/models');

describe('📋 Admin Views Subscriptions', () => {
  const adminSecret = process.env.ADMIN_SECRET;

  beforeAll(async () => {
    await Subscription.create({
      userId: '507f1f77bcf86cd799439011', // dummy ObjectId
      tcodeId: '507f1f77bcf86cd799439012',
      status: 'active'
    });
  });

  afterAll(async () => {
    await Subscription.deleteMany({ userId: '507f1f77bcf86cd799439011' });
  });

  it('allows admin to fetch all subscriptions', async () => {
    const res = await request(app)
      .get('/admin/subscriptions')
      .set('x-admin-secret', adminSecret);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
