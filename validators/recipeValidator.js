const { body, validationResult } = require('express-validator');

// Validación al crear
const validateRecipe = [
  body('title').notEmpty().withMessage('Title is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be a non-empty array'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('authorId').notEmpty().isMongoId().withMessage('Author ID must be a valid Mongo ID'),
  body('prepTime').isNumeric().withMessage('Prep time must be a number'),
  body('cookTime').isNumeric().withMessage('Cook time must be a number'),
  body('servings').isNumeric().withMessage('Servings must be a number'),
  body('imageUrl').notEmpty().withMessage('Image URL is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación al actualizar (idéntica, pero puedes personalizar si deseas campos opcionales)
const validateRecipeUpdate = [...validateRecipe];

module.exports = {
  validateRecipe,
  validateRecipeUpdate
};
