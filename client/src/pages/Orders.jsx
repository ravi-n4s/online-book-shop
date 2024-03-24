import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/orders");
        setOrders(data);
      } catch (error) {
        toast.error(error.response.data.message || error.message);
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Menu>
      <div className="container">
        <h1>Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Book</th>
              <th>Amount</th>
              <th>Order Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort((a, b) => b.id - a.id)
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>{order.created_at}</td>
                  <td>{"Done"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Menu>
  );
};

export default Orders;
