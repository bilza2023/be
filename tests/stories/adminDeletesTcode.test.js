require('../utils/testSetup');
const request = require('supertest');
const { app } = require('../../index');
const { Tcode } = require('../../mongo/models');

describe('🗑 Admin Deletes a Tcode', () => {
  const adminSecret = process.env.ADMIN_SECRET;
  let tcodeId = null;

  beforeAll(async () => {
    const created = await Tcode.create({
      tcode: 'delete-test',
      chapter: 1,
      exercise: '1.1',
      title: 'Delete Me',
      slug: 'delete-me',
      sortOrder: 99
    });
    tcodeId = created._id;
  });

  it('allows admin to delete a tcode by ID', async () => {
    const res = await request(app)
      .delete(`/admin/tcodes/${tcodeId}`)
      .set('x-admin-secret', adminSecret);

    expect(res.status).toBe(204);

    const check = await Tcode.findById(tcodeId);
    expect(check).toBeNull();
  });
});
