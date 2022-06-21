import express from 'express';
const router = express.Router();

// router.route('/').get()

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
  res.json({ msg: 'Register a user' });
});

export default router;
