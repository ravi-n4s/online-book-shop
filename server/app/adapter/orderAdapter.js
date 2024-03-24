const db = require("../db");

const table = "orders";

const createOrder = async (book_id, user_id) => {
  const [result] = await db.query(
    `INSERT INTO ${table} (book_id, user_id) VALUES (?, ?)`,
    [book_id, user_id]
  );
  return result;
};

// get all orders for a given user_id join with books table on book_id to get book details for each order
const getAllOrders = async (user_id) => {
  const [result] = await db.query(
    `SELECT o.*, b.title, b.price FROM ${table} o JOIN books b ON o.book_id = b.id WHERE o.user_id = ?`,
    [user_id]
  );
  result.forEach((order) => {
    order.created_at = new Date(order.created_at);
    order.created_at.setHours(order.created_at.getHours() + 5); // Add 5 hours for Indian Standard Time offset
    order.created_at.setMinutes(order.created_at.getMinutes() + 30); // Add 30 minutes for Indian Standard Time offset
    order.created_at = order.created_at.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  });
  return result;
};

module.exports = {
  createOrder,
  getAllOrders,
};
