const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { validateReview } = require('../validators/reviewValidator');

// Obtener reseñas de una receta
router.get('/recipe/:recipeId', reviewController.getReviewsByRecipe);

// Crear una reseña para una receta
router.post('/recipe/:recipeId', validateReview, reviewController.addReview);

// Editar una reseña
router.put('/:reviewId', validateReview, reviewController.updateReview);

// Eliminar una reseña
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
