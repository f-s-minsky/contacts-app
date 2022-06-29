import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';

const router = express.Router();

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
      return res.status(400).json({ errors: errors.array() });
    }
    // pull out data from req body
    const { name, email, password } = req.body;

    // test if user already exist
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
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

      // Payload for jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // JWT Token creation
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          // Response with the Token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

export default router;
