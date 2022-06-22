import express from 'express';
import auth from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// router.route('/').get()

// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});
// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [
    auth,
    [body('name', 'Name is required').not().isEmpty()],
  ],
  async (req, res) => {
    // check validation error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    // pull out data from req body
    const { name, email, phone, type } = req.body;

    try {
      // New contact creation with Contact model
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ msg: 'Update contact' });
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete contact' });
});

export default router;
