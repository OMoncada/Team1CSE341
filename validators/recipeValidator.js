const { body, validationResult } = require('express-validator');

// Validación al crear
const validateRecipe = [
  body('name').notEmpty().withMessage('Name is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be a non-empty array'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('prepTime').isNumeric().withMessage('Prep time must be a number'),
  body('cookTime').isNumeric().withMessage('Cook time must be a number'),
  body('imageUrl').notEmpty().withMessage('Image URL is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación al actualizar
const validateRecipeUpdate = [...validateRecipe]; // puedes personalizar si deseas reglas diferentes

module.exports = {
  validateRecipe,
  validateRecipeUpdate
};
