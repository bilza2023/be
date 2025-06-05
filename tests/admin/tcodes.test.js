import request from 'supertest';
import app from '../../index.js';

describe('Admin API - /admin/tcodes', () => {
  test('POST /admin/tcodes should accept a valid tcode', async () => {
    const res = await request(app)
      .post('/admin/tcodes')
      .send({
        tcode: 'fbise9math',
        chapter: 1,
        exercise: '1.1',
        slides: {
          type: 'text',
          content: 'Test question'
        }
      });

    expect(res.statusCode).toBe(201); // created
    expect(res.body).toBeDefined();
  });

  test('GET /admin/tcodes should return array of tcodes', async () => {
    const res = await request(app).get('/admin/tcodes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
