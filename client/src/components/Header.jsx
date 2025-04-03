import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import "./Header.css";
import logo from "../Images/evangadi-logo-header.png";

function Header() {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setuser({});
    navigate("/login");
  };

  return (
    <nav className="navbar expand-lg fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Evangadi Logo" className="navbar-logo" />
        </Link>

        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span>
            <i
              className="fas fa-bars"
              style={{ color: "black", fontSize: "1.5em" }}
            ></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link black link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/howitworks" className="nav-link black link">
                How it works
              </Link>
            </li>
          </ul>

          <div className="m-0 m-md-3">
            {user?.username ? (
              <>
                <Link to="/profile" className="nav-link black link me-3">
                  Profile
                </Link>
                <button className="btn btn-success" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
