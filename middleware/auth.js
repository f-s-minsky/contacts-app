import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // ckeck if token exist
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token, authorization denied' });
  }

  try {
    // Pull out the payload object
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    // console.log(decoded);

    // Set the user id in req user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
