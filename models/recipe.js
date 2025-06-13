const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  category: { type: String },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
  prepTime: { type: Number },
  cookTime: { type: Number },
  servings: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

recipeSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
