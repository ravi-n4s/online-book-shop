const express = require("express");
const router = express.Router();
const books = [
  { id: 1, title: "C" },
  { id: 2, title: "Java" },
  { id: 3, title: "Python" },
];

router.get("/books/", (req, res) => {

    
  res.status(200).json(books);
});

module.exports = router;
