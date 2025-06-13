const { body, validationResult } = require('express-validator');

// Validación para crear categoría
const validateCategory = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación para actualizar categoría (puede ser opcional o como creación)
const validateCategoryUpdate = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Category name cannot be empty'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCategory, validateCategoryUpdate };
