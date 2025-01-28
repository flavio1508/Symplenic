import React, { useState, useEffect } from "react";
import logo from '../../img/WhatsApp Image 2025-01-24 at 00.39.45.jpeg';  // Importando a imagem
import {useNavigate } from "react-router-dom";
import "./Login.css";

const mockUser = {
    email: "flavio1508@gmail.com",
    password: "1234",
    name: "Flávio Augusto",
  };


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (email === mockUser.email && password === mockUser.password) {
        localStorage.setItem("user", JSON.stringify(mockUser));
        navigate("/dashboard");
      } else {
        setError("Email ou senha incorretos!");
      }
    };
  
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
            placeholder="Senha"
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