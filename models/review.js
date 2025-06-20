const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model('Review', reviewSchema);
