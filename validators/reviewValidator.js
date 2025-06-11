const { body, validationResult } = require('express-validator');

const validateReview = [
  body('userId')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid user ID'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer from 1 to 5'),

  body('comment')
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 3 }).withMessage('Comment must be at least 3 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateReview
};
