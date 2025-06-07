// tests/stories/adminCreatesTcode.test.js

require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { Tcode } = require('../../mongo/models');

describe('🛠 Admin Creates a Tcode', () => {
  const adminSecret = process.env.ADMIN_SECRET;
  const payload = {
    tcode: 'fbise9math',
    chapter: 1, // must be number
    exercise: '1.1',
    title: 'FBISE Grade 9 Math - Chapter 1',
    slug: 'fbise9math-ch1-ex1.1',
    sortOrder: 1
  };

  let createdId = null;

  beforeAll(async () => {
    const res = await request(app)
      .post('/admin/tcodes')
      .set('x-admin-secret', adminSecret)
      .send(payload);

    expect(res.status).toBe(201);
    createdId = res.body._id;
  });

  afterAll(async () => {
    await Tcode.deleteMany({ tcode: 'fbise9math' });
  });

  it('confirms the tcode exists via GET', async () => {
    const res = await request(app)
      .get('/admin/tcodes')
      .set('x-admin-secret', adminSecret);

    expect(res.status).toBe(200);
    const found = res.body.find(t => t._id === createdId);
    expect(found).toBeDefined();
    expect(found.chapter).toBe(1);
    expect(found.exercise).toBe('1.1');
  });
});
