import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import Book from "./pages/Book";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<BookList />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/books/:id" element={<Book />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
