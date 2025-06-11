const Review = require('../models/review');

// GET /recipes/:id/reviews
exports.getReviewsByRecipe = async (req, res, next) => {
  try {
    const reviews = await Review.find({ recipeId: req.params.id });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// POST /recipes/:id/reviews
exports.addReview = async (req, res, next) => {
  try {
    const { reviewer, rating, comment } = req.body;
    const review = new Review({
      recipeId: req.params.id,
      reviewer,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// PUT /reviews/:reviewId
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
    res.json(updatedReview);
  } catch (err) {
    next(err);
  }
};

// DELETE /reviews/:reviewId
exports.deleteReview = async (req, res, next) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.reviewId);
    if (!result) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};
