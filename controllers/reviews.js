const Review = require('../models/review');

// ✅ GET /reviews - Obtener todas las reseñas
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('recipeId', 'title')   // Puedes ajustar qué campos incluir
      .populate('userId', 'name email');
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

// ✅ GET /reviews/recipe/:recipeId - Obtener reseñas de una receta específica
exports.getReviewsByRecipe = async (req, res, next) => {
  try {
    const reviews = await Review.find({ recipeId: req.params.recipeId })
      .populate('userId', 'name email');
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

// ✅ POST /reviews/recipe/:recipeId - Agregar una reseña a una receta
exports.addReview = async (req, res, next) => {
  try {
    const { userId, rating, comment } = req.body;
    const review = new Review({
      recipeId: req.params.recipeId,
      userId,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT /reviews/:reviewId - Actualizar una reseña
exports.updateReview = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE /reviews/:reviewId - Eliminar una reseña
exports.deleteReview = async (req, res, next) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.reviewId);
    if (!result) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    next(err);
  }
};
