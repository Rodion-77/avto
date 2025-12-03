import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// УДАЛИТЬ эту строку: import "../styles/auth.css";
// Добавить этот CSS напрямую или создать отдельный файл

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.trim()) {
      alert("Пожалуйста, введите email");
      setIsLoading(false);
      return;
    }

    // Имитация отправки
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Простые inline стили для быстрого тестирования
  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      background: 'rgba(30, 30, 30, 0.9)',
      padding: '40px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '500px',
      width: '100%'
    },
    title: {
      color: '#f59e0b',
      textAlign: 'center',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #333',
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      marginBottom: '20px'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#f59e0b',
      color: 'black',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  };

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Письмо отправлено!</h2>
          <p style={{textAlign: 'center', marginBottom: '20px'}}>
            Инструкции по восстановлению отправлены на: <strong>{email}</strong>
          </p>
          <button 
            onClick={() => navigate("/login")}
            style={styles.button}
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Восстановление пароля</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Отправка..." : "Отправить инструкции"}
          </button>
        </form>
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          <Link to="/login" style={{color: '#f59e0b'}}>Вернуться к входу</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;