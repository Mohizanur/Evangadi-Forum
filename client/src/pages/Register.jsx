import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../axiosConfig";
import { validateRegister } from "../utils/validation";
import Spinner from "../components/Spinner";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    const validationErrors = validateRegister(
      usernameValue,
      firstValue,
      lastValue,
      emailValue,
      passValue
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosBase.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });

      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Something went wrong!";
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

return (
  <div className="auth-container">
    <h2 className="auth-title">Create Account</h2>
    {isLoading && <Spinner />}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          ref={usernameDom}
          type="text"
          placeholder="Choose a username"
          className={errors.username ? "error-input" : ""}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div className="form-group">
        <label>First Name</label>
        <input
          ref={firstnameDom}
          type="text"
          placeholder="Enter your first name"
          className={errors.firstname ? "error-input" : ""}
        />
        {errors.firstname && <div className="error">{errors.firstname}</div>}
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          ref={lastnameDom}
          type="text"
          placeholder="Enter your last name"
          className={errors.lastname ? "error-input" : ""}
        />
        {errors.lastname && <div className="error">{errors.lastname}</div>}
      </div>
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
          placeholder="Create a password"
          className={errors.password ? "error-input" : ""}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      {errors.submit && <div className="error">{errors.submit}</div>}
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
    <button onClick={() => navigate("/login")} className="auth-link">
      Already have an account? Login
    </button>
  </div>
);
}

export default Register;
