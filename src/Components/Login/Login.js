import React, { useState, useEffect } from "react";
import logo from '../../img/WhatsApp Image 2025-01-24 at 00.39.45.jpeg';  // Importando a imagem
import {useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    };

    // Add default users if they don't exist
    useEffect(() => {
      const defaultUsers = [
        { email: "flavio1508@gmail.com", password: "1234", name: "Flávio Augusto" },
        { email: "daniel.6583@gmail.com", password: "daniel@6583", name: "Daniel" }
      ];

      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      defaultUsers.forEach((defaultUser) => {
        const userExists = savedUsers.some((u) => u.email === defaultUser.email);
        if (!userExists) {
          savedUsers.push(defaultUser);
        }
      });

      localStorage.setItem("users", JSON.stringify(savedUsers));
    }, []);
  
    return (
      <div className="login-container">
        <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
          {error && <p className="login-error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Confirm
          </button>
        </div>
      </div>
    );
  }
  export default Login;