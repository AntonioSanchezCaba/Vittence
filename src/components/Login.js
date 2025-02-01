import React, { useState } from "react";
import { auth, googleProvider, facebookProvider, appleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login with Google successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      alert("Login with Facebook successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      alert("Login with Apple successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <img src="/images/Vittence1.png" alt="Logo" />
      </div>

      {/* Right Section */}
      <div className="login-right">
        <h2>Sign In</h2>

        {/* Social Media Buttons */}
        <div className="social-buttons">
          <button onClick={handleGoogleLogin} className="google-btn">
            <FaGoogle className="social-icon" /> Sign up with Google
          </button>
          <button onClick={handleFacebookLogin} className="facebook-btn">
            <FaFacebook className="social-icon" /> Sign up with Facebook
          </button>
          <button onClick={handleAppleLogin} className="apple-btn">
            <FaApple className="social-icon" /> Sign up with Apple
          </button>
        </div>

        <div className="separator">
          <span className="separator-text">- OR -</span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-btn">Sign In</button>
        </form>

        {/* Register Link */}
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
