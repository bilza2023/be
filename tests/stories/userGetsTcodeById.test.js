require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { Tcode } = require('../../mongo/models');

describe('📖 Public GET /tcodes/:id', () => {
  let tcodeId = null;

  beforeAll(async () => {
    const created = await Tcode.create({
      tcode: 'fbise9math',
      chapter: 1,
      exercise: '1.1',
      title: 'Demo Tcode Access',
      slug: 'fbise9math-ch1-ex1.1',
      sortOrder: 1
    });
    tcodeId = created._id;
  });

  afterAll(async () => {
    await Tcode.deleteMany({ tcode: 'fbise9math' });
  });

  it('returns 200 and tcode data if valid', async () => {
    const res = await request(app).get(`/tcodes/${tcodeId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tcode', 'fbise9math');
  });

  it('returns 404 if tcode ID is invalid', async () => {
    const res = await request(app).get('/tcodes/64e000000000000000000000');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Resource not found');
  });
});
