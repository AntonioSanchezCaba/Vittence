import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { loginWithPopup, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

  const handlePopupLogin = async (connection) => {
    try {
      await loginWithPopup({
        authorizationParams: {
          connection,
          scope: "openid profile email",
        },
      });
      
      const userInfo = await getAccessTokenSilently();
      if (userInfo) {
        console.log("User info:", userInfo);
        navigate("/inicio");
      } else {
        throw new Error("Failed to retrieve user info");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          grant_type: "http://auth0.com/oauth/grant-type/password-realm",
          realm: "Username-Password-Authentication",
          username: email,
          password: password,
          scope: "openid profile email",
        }),
      });

      const data = await response.json();
      console.log("Auth0 response:", data);

      if (data.access_token) {
        alert("Login successful");
        navigate("/inicio");
      } else {
        alert(data.error_description || "Incorrect password or email. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/images/Vittence2.png" alt="Logo" />
      </div>
      <div className="login-right">
        <h2>{isAuthenticated ? `Welcome, ${user?.name}` : "Sign In"}</h2>
        {!isAuthenticated ? (
          <>
            <div className="social-buttons">
              <button onClick={() => handlePopupLogin("google-oauth2")} className="google-btn">
                <FaGoogle className="social-icon" /> Sign in with Google
              </button>
              <button onClick={() => handlePopupLogin("facebook")} className="facebook-btn">
                <FaFacebook className="social-icon" /> Sign in with Facebook
              </button>
              <button onClick={() => handlePopupLogin("apple")} className="apple-btn">
                <FaApple className="social-icon" /> Sign in with Apple
              </button>
            </div>
            <div className="separator">
              <span className="separator-text">- OR -</span>
            </div>
            <form onSubmit={handleEmailPasswordLogin}>
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
          </>
        ) : (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="logout-btn">
            Log Out
          </button>
        )}
        {!isAuthenticated && (
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
