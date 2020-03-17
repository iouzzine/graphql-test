const { verify } = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const { ApiMessage } = require('../helpers/errorsHelper');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.json(ApiMessage('No token, authorization denied'));

  try {
    const decoded = verify(token, jwtSecret);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    return res.json(ApiMessage('Token is not valid'));
  }
};
