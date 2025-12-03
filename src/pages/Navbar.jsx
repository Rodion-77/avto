import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Защищенный вызов useCart с обработкой ошибок
  let cartItems = [];
  let cartItemsCount = 0;
  
  try {
    const cart = useCart();
    cartItems = cart.cartItems || [];
    cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  } catch (error) {
    console.error('Cart context error:', error);
    // Продолжаем работу с пустой корзиной
  }

  return (
    <nav className="premium-navbar">
      <div className="nav-container">
        {/* Логотип */}
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-icon">🚗</span>
          <span className="logo-text">Auto4Students</span>
        </Link>

        {/* Навигационные ссылки */}
        <div className={`nav-links ${isMenuOpen ? "nav-links-active" : ""}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Главная
          </Link>
          <Link 
            to="/catalog" 
            className={`nav-link ${location.pathname === "/catalog" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Каталог
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Регистрация
          </Link>
          <Link 
            to="/info" 
            className={`nav-link ${location.pathname === "/info" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Советы
          </Link>
        </div>

        {/* Правая часть с корзиной и меню */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <span className="cart-badge">{cartItemsCount}</span>
            🛒
          </Link>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? "menu-toggle-active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;