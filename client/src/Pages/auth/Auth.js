import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../Img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction.js";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);

  const dispatch = useDispatch();

  // ✅ Safe loading access
  const loading = useSelector(
    (state) => state?.authReducer?.loading
  );

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setConfirmPass(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Basic validation
    if (!data.email || !data.password) {
      alert("Please fill all required fields");
      return;
    }

    if (isSignUp) {
      if (data.password !== data.confirmpass) {
        setConfirmPass(false);
        return;
      }

      const { confirmpass, ...cleanData } = data;
      dispatch(signUp(cleanData));
    } else {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      dispatch(logIn(loginData));
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      <div className="auth-container">

        {/* 🔹 Top Section */}
        <div className="auth-left">
          <img src={Logo} alt="logo" />
          <h2>Welcome!</h2>
          <p>Explore ideas throughout the world.</p>
        </div>

        {/* 🔹 Form */}
        <form className="infoForm" onSubmit={handleSubmit}>
          <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

          {/* Name Fields */}
          {isSignUp && (
            <div className="inputRow">
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="inputRow">
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />

            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className={`infoInput ${!confirmPass ? "error" : ""}`}
                name="confirmpass"
                value={data.confirmpass}
                onChange={handleChange}
                required
              />
            )}
          </div>

          {/* Error */}
          {!confirmPass && (
            <span className="error-text">
              Passwords do not match
            </span>
          )}

          {/* Toggle */}
          <span
            className="auth-toggle"
            onClick={() => {
              setIsSignUp((prev) => !prev);
              resetForm();
              setConfirmPass(true);
            }}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </span>

          {/* Button */}
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Sign Up"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
