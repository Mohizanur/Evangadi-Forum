import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
import axiosBase from "../axiosConfig";
import { validateLogin } from "../utils/validation";
import Spinner from "../components/Spinner";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const { setuser } = useContext(AppState); // Match the context setter name
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    console.log("Attempting login with:", { email: emailValue });

    const validationErrors = validateLogin(emailValue, passValue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosBase.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      console.log("Login response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Set token in axios defaults for subsequent requests
        axiosBase.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        const decoded = jwtDecode(response.data.token);
        setuser({
          username: decoded.username,
          userid: decoded.userid,
          email: decoded.email,
        });

        // Clear any existing errors
        setErrors({});
        navigate("/");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data);
      setErrors({
        submit:
          error.response?.data?.msg ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            ref={emailDom}
            type="email"
            placeholder="Enter your email"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            ref={passwordDom}
            type="password"
            placeholder="Enter your password"
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {errors.submit && <div className="error">{errors.submit}</div>}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <button onClick={() => navigate("/register")} className="auth-link">
        Need an account? Register
      </button>
    </div>
  );
}

export default Login;
