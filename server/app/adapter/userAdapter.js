const db = require("../db");
const bcrypt = require("bcrypt");

const table = "users";

const authenticateUser = async (email, password) => {
  console.log("email", email, password);
  //next level complexity here is to hash the password and compare it with the hashed password in the database
  const [result] = await db.query(
    `SELECT * FROM ${table} WHERE email = ? AND password = ? LIMIT 1`,
    [email, password]
  );
  console.log("result - ", result);
  return result[0];
};

const registerUser = async (email, password) => {
  try {
    await db.query(`INSERT INTO ${table} (email, password) VALUES (?, ?)`, [
      email,
      password,
    ]);
  } catch (err) {
    console.log("Error in registerUser - ", err);
    return err;
  }
};

module.exports = {
  authenticateUser,
  registerUser,
};
