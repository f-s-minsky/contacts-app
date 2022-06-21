import express from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();

import User from '../models/User.js';

// router.route('/').get()

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // [check('name', 'name is required').not().isEmpty()],
  [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    res.json('passed');
  }
);

export default router;
