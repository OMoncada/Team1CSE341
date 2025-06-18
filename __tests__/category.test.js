const request = require('supertest');
const app = require('../server');

describe('/categories routes', () => {
  test('GET all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET category by ID', async () => {
    const res = await request(app).get('/categories/684ce1062c68beae0242dd13');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', '684ce1062c68beae0242dd13');
  });
});
