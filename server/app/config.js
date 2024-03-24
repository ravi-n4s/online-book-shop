const config = {
  jwt: {
    secret: "some secret string",
    expiresIn: 60 * 60, //seconds
  },
  mysql: {
    host: "localhost",
    user: "root",
    password: "test",
    database: "book_shop",
    port: 3306,
  },
};

module.exports = config;
//
