const request = require('supertest');
const app = require('../server');

describe('/users routes', () => {
  test('GET all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET user by ID', async () => {
    const res = await request(app).get('/users/6841157d6919c8aa4ada910e');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', '6841157d6919c8aa4ada910e');
  });
});
