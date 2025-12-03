import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarCard from './pages/CarCard';
import Cart from './pages/Cart';
import Info from './pages/Info';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/cars/:id" element={<CarCard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;