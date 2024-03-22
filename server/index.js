require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bookRoutes = require('./app/routes/books')

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//initialize routes
app.use(bookRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: `Server is running` });
});

app.listen(port, () => {
  console.log(`Server is running on port - ${port}`);
});
