const db = require("../db");

const table = "books";

const getAllBooks = async () => {
  const [result] = await db.query(`SELECT * FROM ${table}`);
  return result;
};

const getBookById = async (id) => {
  const [result] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return result[0];
};

module.exports = {
  getAllBooks,
  getBookById,
};
