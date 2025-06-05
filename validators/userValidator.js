const { body, validationResult } = require('express-validator');

// Validación estricta al crear usuario
const validateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('favorites').isArray().withMessage('Favorites must be an array'),
  body('role').notEmpty().withMessage('Role is required'),
  body('bio').notEmpty().withMessage('Bio is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

// Validación estricta al actualizar usuario
const validateUserUpdate = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('favorites').isArray().withMessage('Favorites must be an array'),
  body('role').notEmpty().withMessage('Role is required'),
  body('bio').notEmpty().withMessage('Bio is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUser,
  validateUserUpdate
};
