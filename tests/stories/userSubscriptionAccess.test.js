// tests/stories/userSubscriptionAccess.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { Subscription, Tcode, User } = require('../../mongo/models');

describe('🧪 Public API: Subscription Access Story', () => {
  const user = {
    email: 'subuser@example.com',
    password: 'pass1234'
  };

  let token = null;
  let tcodeId = null;

  beforeAll(async () => {
    // Register user
    const reg = await request(app).post('/users/register').send(user);
    expect(reg.status).toBe(201);
    token = reg.body.token;

    // Create tcode with valid schema
    const tcode = await Tcode.create({
      tcode: 'fbise9math',
      chapter: 1,
      exercise: '1.1',
      title: 'FBISE Grade 9 Math - Chapter 1',
      slug: 'fbise9math-ch1-ex1.1',
      sortOrder: 1
    });

    tcodeId = tcode._id;
  });

  afterAll(async () => {
    await User.deleteMany({ email: user.email });
    await Tcode.deleteMany({ tcode: 'fbise9math' });
    await Subscription.deleteMany({ tcodeId });
  });

  it('denies access if no token is provided', async () => {
    const res = await request(app).get(`/me/subscription?tcode=${tcodeId}`);
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Authentication failed');
  });

  it('returns access: false when user has no subscription', async () => {
    const res = await request(app)
      .get(`/me/subscription?tcode=${tcodeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.access).toBe(false);
  });

  it('returns access: true when subscription is active', async () => {
    const userDoc = await User.findOne({ email: user.email });

    await Subscription.create({
      userId: userDoc._id,
      tcodeId,
      status: 'active'
    });

    const res = await request(app)
      .get(`/me/subscription?tcode=${tcodeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.access).toBe(true);
  });
});
