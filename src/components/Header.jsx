import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <h1 style={{ margin: 0 }}>🚗 Auto4Students</h1>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/catalog" style={{ marginLeft: 16 }}>Каталог</Link>
          <Link to="/register" style={{ marginLeft: 16 }}>Регистрация</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
