const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const isAuthenticated = require('../middleware/isAuthenticated');

// ✅ GET todas las reviews
router.get('/', reviewController.getAllReviews);

// ✅ GET reviews por receta
router.get('/recipe/:recipeId', reviewController.getReviewsByRecipe);

// ✅ POST review por receta (protegido)
router.post('/recipe/:recipeId', isAuthenticated, reviewController.addReview);

// ✅ PUT actualizar review (protegido)
router.put('/:reviewId', isAuthenticated, reviewController.updateReview);

// ✅ DELETE eliminar review (protegido)
router.delete('/:reviewId', isAuthenticated, reviewController.deleteReview);

module.exports = router;
