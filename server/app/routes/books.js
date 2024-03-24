const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById } = require("../adapter/bookAdapter");
const { createOrder } = require("../adapter/orderAdapter");
const { authorizeToken } = require("../middleware/auth");

router.get("/books/", async (req, res) => {
  const books = await getAllBooks();
  console.log("Available books - ", books);
  res.status(200).json(books);
});

router.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const book = await getBookById(id);
  console.log("passed Id is - ", id, book);
  res.status(200).json(book);
});

router.post("/books/:id/buy", authorizeToken, async (req, res) => {
  const id = req.params.id;
  const user_id = req?.user_id;
  const order = await createOrder(id, user_id);

  console.log("order - ", id, order);
  res.status(200).json({ message: "Order created successfully" });
});

module.exports = router;
