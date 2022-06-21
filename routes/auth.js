import express from 'express';
const router = express.Router();

// router.route('/').get()

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.json({ msg: 'Get logged in user' });
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) => {
  res.json({ msg: 'Log in user' });
});

export default router;
