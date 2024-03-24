const express = require("express");
const { generateToken } = require("../middleware/auth");
const { authenticateUser, registerUser } = require("../adapter/userAdapter");
const router = express.Router();

router.post("/login", async (req, res) => {
  const result = await authenticateUser(req.body.email, req.body.password);
  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log(result);
  res.status(200).json({ token: generateToken({ id: result.id }) });
});

router.post("/register", async (req, res) => {
  const result = await registerUser(req.body.email, req.body.password);
  console.log("result - ", result);
  if (result?.message?.includes("Duplicate entry")) {
    res.status(400).json({ message: "User already registered " });
  } else {
    res.status(200).json({ message: "User registered successfully" });
  }
});

module.exports = router;
