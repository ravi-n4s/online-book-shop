import { Link } from "react-router-dom";
import { clearToken, isLoggedIn as func } from "../utils";

const Menu = (props) => {
  const isLoggedIn = func();

  const handleLogout = () => {
    clearToken();
    window.location.href = "/";
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light mb-5"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <Link to="/" className="ms-5 navbar-brand fw-bold">
            Online-Book-Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <Link className="nav-link scrollto" to="/">
                  Books
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link className="nav-link scrollto" to="/cart">
                    Cart
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link className="nav-link scrollto" to="/orders">
                    My Orders
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link className="nav-link scrollto" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {isLoggedIn ? (
                <li>
                  <Link className="nav-link scrollto" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="nav-link scrollto">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {props.children}
    </div>
  );
};

export default Menu;
