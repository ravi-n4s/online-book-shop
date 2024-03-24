// getCart given user_id

const db = require("../db");

const table = "cart";
const ordersTable = "orders";

const getCart = async (user_id) => {
  const [result] = await db.query(
    `SELECT c.*, b.title, b.price FROM ${table} c JOIN books b ON c.book_id = b.id WHERE c.user_id = ?`,
    [user_id]
  );
  return result;
};

const addToCart = async (user_id, book_id) => {
  const [result] = await db.query(
    `INSERT INTO ${table} (user_id, book_id) VALUES (?, ?)`,
    [user_id, book_id]
  );
  return result;
};

//place bulk orders from cart and also empty the cart after placing the order
const buyFromCart = async (user_id) => {
  const [cartItems] = await db.query(
    `SELECT book_id FROM ${table} WHERE user_id = ?`,
    [user_id]
  );

  console.log("Cart items - ", cartItems);

  let result;

  try {
    await db.query("START TRANSACTION");

    const values = cartItems.map((item) => [user_id, item.book_id]);

    await db.query(`INSERT INTO ${ordersTable} (user_id, book_id) VALUES ?`, [
      values,
    ]);

    await db.query(`DELETE FROM ${table} WHERE user_id = ?`, [user_id]);

    await db.query("COMMIT");

    result = "Order placed successfully";

    // await db.query(`DELETE FROM ${table} WHERE user_id = ?`, [user_id]);

    await db.query("COMMIT");

    result = "Order placed successfully";
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }

  return result;
};

module.exports = {
  getCart,
  addToCart,
  buyFromCart,
};
