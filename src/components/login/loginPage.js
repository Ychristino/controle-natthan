// Login.js
import React, { useState } from "react";
import LoginStyle from "../../content/style/loginStyle";
import LoginData from "../../content/pageData/loginPageData";
import { useAuth } from "../../content/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pageData, setPageData] = useState(LoginData["pt-br"]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (email === "" || password === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setEmail("");
    setPassword("");
    setError("");

    login();
    navigate('/in');
  };

  return (
    <div style={LoginStyle.container}>
        <div style={LoginStyle.imagePanel}>
            <img src={pageData.imagePath}></img>
        </div>

        <form onSubmit={handleSubmit} style={LoginStyle.form}>
            <h2 style={LoginStyle.title}>{pageData.titleMessage}</h2>
            {error && <p style={LoginStyle.error}>{error}</p>}

            <label htmlFor="email" style={LoginStyle.label}>{pageData.inputLogin}</label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={LoginStyle.input}
            />

            <label htmlFor="password" style={LoginStyle.label}>{pageData.inputPassword}</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={LoginStyle.input}
            />

            <button type="submit" style={LoginStyle.button}>{pageData.btmLogin}</button>
        </form>
    </div>
  );
};

export default Login;
