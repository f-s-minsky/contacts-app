import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const router = express.Router();

import User from '../models/User.js';

// router.route('/').get()

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // req validation
  [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    // res after validation ok
    const { name, email, password } = req.body;

    // test if user already exist
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(400)
          .json({ msg: 'User already exists' });
      }

      // Create new user but not save
      user = new User({
        name,
        email,
        password,
      });

      // Password hash generation
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Save new user in DB
      await user.save();

      // For testing
      res.json('User saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

export default router;
