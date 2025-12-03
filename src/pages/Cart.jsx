import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="premium-cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Корзина пуста</h2>
            <p>Добавьте автомобили из каталога</p>
            <Link to="/catalog" className="btn btn-gold">Перейти в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-cart-page">
      <div className="container">
        <h1>Корзина</h1>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`/cars/${item.image}`} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.year} год</p>
                <div className="price">{item.price.toLocaleString()} ₽</div>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="total">Итого: {getCartTotal().toLocaleString()} ₽</div>
          <div className="cart-actions">
            <button className="btn btn-outline" onClick={clearCart}>Очистить корзину</button>
            <button className="btn btn-gold">Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;