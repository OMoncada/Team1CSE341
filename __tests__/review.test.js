const request = require('supertest');
const app = require('../server');

describe('/reviews routes', () => {
  test('GET all reviews', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET review by ID', async () => {
    const res = await request(app).get('/reviews/684ceb225c2cd957e8f8dda2');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', '684ceb225c2cd957e8f8dda2');
  });
});
