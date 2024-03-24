import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Menu from "../components/Menu";

//creating a functional component
const Login = () => {
  //using useState to set the state of the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //creating a function to handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //using axios to post the email and password to the server
    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });
      //setting the token in the local storage
      localStorage.setItem("token", data.token);
      //redirecting to the home page
      window.location.href = "/";
    } catch (error) {
      //displaying an error message if the login fails
      toast.error(error.response.data.message || error.message);
    }
  };
  //returning the jsx
  return (
    <Menu>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="">
          <h2 className="text-center my-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control my-2"
                placeholder="Email"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control my-2"
                placeholder="Password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary btn-block my-2"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Menu>
  );
};

//exporting the component
export default Login;
