const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { validateReview } = require('../validators/reviewValidator');
const isAuthenticated = require('../middleware/isAuthenticated');

// ✅ Obtener todas las reseñas (no requiere parámetros)
router.get('/', reviewController.getAllReviews);

// ✅ Obtener reseñas por receta específica
router.get('/recipe/:recipeId/reviews', reviewController.getReviewsByRecipe);

// ✅ Crear una nueva reseña para una receta (requiere autenticación)
router.post('/recipe/:recipeId/reviews', isAuthenticated, validateReview, reviewController.addReview);

// ✅ Editar una reseña específica
router.put('/:reviewId', isAuthenticated, validateReview, reviewController.updateReview);

// ✅ Eliminar una reseña específica
router.delete('/:reviewId', isAuthenticated, reviewController.deleteReview);

module.exports = router;
