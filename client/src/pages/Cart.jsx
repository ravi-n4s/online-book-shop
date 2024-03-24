import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/cart");
        setCart(data);
        setTotal(
          Number(data.reduce((acc, item) => acc + Number(item.price), 0))
        );
      } catch (error) {
        toast.error(error.response.data.message || error.message);
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  const proceed = async () => {
    if (window.confirm("Proceed to checkout")) {
      await axios.put("/cart/buy");
      alert("Order(s) placed successfully");
      window.location.href = "/orders";
    }
  };

  return (
    <Menu>
      <div className="container">
        <h1>Cart</h1>
        <ul>
          {cart.length ? (
            <div className="mt-4">
              {cart.map((item) => (
                <li key={item.id} className="my-1">
                  {item.title} - ₹{item.price}
                </li>
              ))}
              <h5 className="my-4">Total: ₹{total}</h5>
              <button className="btn btn-success" onClick={proceed}>
                Proceed to checkout
              </button>
            </div>
          ) : (
            <h5 className="my-5">Your cart is empty</h5>
          )}
        </ul>
      </div>
    </Menu>
  );
};

export default Cart;
