const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (payload) => {
  jwt.sign(payload, config.jwt);
};
