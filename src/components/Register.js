import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

console.log("Auth0 Domain:", process.env.REACT_APP_AUTH0_DOMAIN);
console.log("Auth0 Client ID:", process.env.REACT_APP_AUTH0_CLIENT_ID);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 8 || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        alert("Password must be at least 8 characters long, contain at least one number, and one special character.");
        return;
      }

      const username = email.split("@")[0]; // Genera un username basado en el correo

      const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          email: email,
          password: password,
          username: username,
          connection: "Username-Password-Authentication",
        }),
      });

      const data = await response.json();
      console.log("Auth0 response:", data);

      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(`Error: ${data.message || "Failed to create user"}`);
        throw new Error(data.description || "Failed to create user");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Failed to connect to Auth0");
    }
  };

  return (
    <div className="register">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
};

export default Register;