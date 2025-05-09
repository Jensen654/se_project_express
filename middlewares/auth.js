const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { authorizationError } = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return authorizationError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return authorizationError(res);
  }

  req.user = payload;
  return next();
};

module.exports = {
  authMiddleware,
};
