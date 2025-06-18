const request = require('supertest');
const app = require('../server');

describe('/recipes routes', () => {
  test('GET all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET recipe by ID', async () => {
    const res = await request(app).get('/recipes/6847bcad174de04e52cb3867');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', '6847bcad174de04e52cb3867');
  });
});
