const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const isAuthenticated = require('../middleware/isAuthenticated');

// Obtener todas las reseñas
router.get('/', reviewController.getAllReviews);

// Obtener reseñas por receta
router.get('/recipe/:recipeId', reviewController.getReviewsByRecipe);

// Crear una reseña para una receta (protegida)
router.post('/recipe/:recipeId', isAuthenticated, reviewController.addReview);

// Actualizar reseña (protegida)
router.put('/:reviewId', isAuthenticated, reviewController.updateReview);

// Eliminar reseña (protegida)
router.delete('/:reviewId', isAuthenticated, reviewController.deleteReview);

module.exports = router;
