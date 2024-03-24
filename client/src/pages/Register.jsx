import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    try {
      await axios.post("/users/register", {
        email,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Menu>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="register-form">
          <h2 className="text-center my-4">Register</h2>
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
              <input
                type="password"
                className="form-control my-2"
                placeholder="Confirm Password"
                required="required"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-block my-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Menu>
  );
};

export default Register;
