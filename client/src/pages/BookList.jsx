import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "../components/Menu";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("/books");
        setBooks(data);
      } catch (error) {
        toast.error("Error fetching books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <Menu>
      <div className="container">
        <h1>List of books available</h1>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="my-1">
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Menu>
  );
};

export default BookList;
