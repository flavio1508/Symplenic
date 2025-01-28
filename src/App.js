import React from "react";
import Dashboard from "./Components/pages/Dashboard"; // Ajuste o caminho para o componente principal
import Login from "./Components/Login/Login"; // Ajuste o caminho para o componente de login
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
