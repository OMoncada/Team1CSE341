const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Review = require('../models/review');

describe('/reviews routes', () => {
  let createdReview;
  let recipeId;
  let userId;

  beforeAll(async () => {
    // Limpia la colección de reseñas
    await Review.deleteMany();

    // Genera ObjectId válidos para receta y usuario
    recipeId = new mongoose.Types.ObjectId();
    userId = new mongoose.Types.ObjectId();

    // Crea una reseña con campos válidos del esquema
    createdReview = await Review.create({
      recipeId,
      userId,
      rating: 5,
      comment: 'Reseña de prueba unitaria'
    });
  });

  afterAll(async () => {
    // Cierra la conexión de Mongoose después de todas las pruebas
    await mongoose.connection.close();
  });

  test('GET reviews by recipe ID', async () => {
    const res = await request(app).get(`/reviews/recipe/${recipeId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: createdReview._id.toString(),
          comment: 'Reseña de prueba unitaria'
        })
      ])
    );
  });
});
