import React, { useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction.js";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);

  const dispatch = useDispatch();

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
      dispatch(
        logIn({
          email: data.email,
          password: data.password,
        })
      );
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

        {/* 🔹 Left Section */}
        <div className="auth-left">
          {/* ✅ FIXED: using public folder image */}
          <img src="/logo.png" alt="logo" />
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
