const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  return jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};

const authorizeToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user_id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  generateToken,
  authorizeToken,
};
