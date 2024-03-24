const express = require("express");
const router = express.Router();
const { getBookById } = require("../adapter/bookAdapter");
const { getCart, addToCart, buyFromCart } = require("../adapter/cartAdapter");
const { authorizeToken } = require("../middleware/auth");

router.get("/", authorizeToken, async (req, res) => {
  const books = await getCart(req?.user_id);
  res.status(200).json(books);
});

router.put("/books/:id", authorizeToken, async (req, res) => {
  const id = req.params.id;
  const book = await getBookById(Number(id));
  console.log("Book - ", book);
  if (book) {
    await addToCart(req?.user_id, book.id);
    res.status(200).json({ message: "Book added to cart " });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.put("/buy", authorizeToken, async (req, res) => {
  const user_id = req?.user_id;
  const cart = await getCart(user_id);
  if (cart.length > 0) {
    await buyFromCart(user_id);
    res.status(200).json({ message: "Order created successfully" });
  } else {
    res.status(404).json({ message: "Cart is empty" });
  }
});

module.exports = router;
