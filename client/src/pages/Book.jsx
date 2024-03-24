import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "../components/Menu";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/books/${id}`);

        setBook(data);
      } catch (error) {
        toast.error("Error fetching book");
      }
    };
    fetchBook();
  }, [id]);

  const onBuy = async () => {
    if (window.confirm("Confirm payment")) {
      axios
        .post(`/books/${id}/buy`)
        .then(() => {
          navigate("/orders");
        })
        .catch((error) => {
          toast.error(error.response.data.message || error.message);
        });
    }
  };

  const addToCart = async () => {
    await axios
      .put(`/cart/books/${id}`)
      .then(() => {
        alert("Added to cart");
      })
      .catch((error) => {
        toast.error(error.response.data.message || error.message);
      });
  };

  return (
    <Menu>
      <div className="container">
        {book ? (
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://via.placeholder.com/150"
                alt="book"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              {Object.keys(book).map((k, index) => (
                <p key={index}>
                  <strong>{k}:</strong> {book[k]}
                </p>
              ))}
              <button className="btn btn-success" onClick={onBuy}>
                Buy
              </button>
              <button className="btn btn-warning mx-4" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Menu>
  );
};

export default Book;
