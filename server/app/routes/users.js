const express = require("express");
const router = express.Router();
const books = [
  { id: 1, title: "C" },
  { id: 2, title: "Java" },
  { id: 3, title: "Python" },
];

router.get("/users/login", (req, res) => {
  res.status(200).json(books);
});

router.get("/users/register", (req, res) => {
  res.status(200).json(books);
});

module.exports = router;
