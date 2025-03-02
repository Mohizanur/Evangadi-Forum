import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import "./Header.css";

function Header() {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setuser({});
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          Evangadi Forum
        </Link>
      </div>
      <nav className="header-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user?.username ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>LogOut</button>
          </>
        ) : (
          <Link to="/login">LogIn</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
