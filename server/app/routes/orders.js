const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../adapter/orderAdapter");
const { authorizeToken } = require("../middleware/auth");

router.get("/", authorizeToken, async (req, res) => {
  const user_id = req?.user_id;
  const orders = await getAllOrders(user_id);
  res.status(200).json(orders);
});

module.exports = router;
