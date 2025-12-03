import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Эффект для отслеживания движения мыши для параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Проверяем обязательные поля
    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Пожалуйста, заполните все поля");
      setIsLoading(false);
      return;
    }

    // Имитация процесса входа
    setTimeout(() => {
      setIsLoading(false);
      
      // Сохраняем информацию о пользователе
      const userData = {
        email: formData.email,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('studentUser', JSON.stringify(userData));
      
      // Показываем успешный вход и перенаправляем
      alert("Вход выполнен успешно!");
      navigate("/catalog");
    }, 1500);
  };

  // Проверяем, есть ли уже сохраненный пользователь
  useEffect(() => {
    const savedUser = localStorage.getItem('studentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email) {
        setFormData(prev => ({
          ...prev,
          email: user.email
        }));
      }
    }
  }, []);

  return (
    <div className="luxury-login">
      {/* Анимированный фон */}
      <div className="luxury-background" style={{
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}></div>

      {/* Парящие частицы */}
      <div className="floating-particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className="login-container">
        <div className="login-card">
          {/* Левая часть - информация */}
          <div className="login-info">
            <div className="info-content">
              <div className="logo-section">
                <div className="logo-icon">🚗</div>
                <h1>Auto4Students</h1>
              </div>
              
              <h2>С возвращением!</h2>
              <p className="info-subtitle">
                Войдите в свой аккаунт, чтобы продолжить покупку автомобиля со специальными студенческими условиями
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <div className="feature-text">
                    <strong>Персональные предложения</strong>
                    <span>Автомобили по вашим предпочтениям</span>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div className="feature-text">
                    <strong>Быстрый доступ</strong>
                    <span>К вашим сохраненным вариантам</span>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div className="feature-text">
                    <strong>Приоритетная поддержка</strong>
                    <span>Персональный менеджер 24/7</span>
                  </div>
                </div>
              </div>

              <div className="stats-section">
                <div className="stat">
                  <div className="stat-number">5,000+</div>
                  <div className="stat-label">Студентов с нами</div>
                </div>
                <div className="stat">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - форма */}
          <div className="login-form-section">
            <div className="form-header">
              <h3>Вход в аккаунт</h3>
              <p>Введите ваши данные для входа в систему</p>
            </div>

            <form onSubmit={handleSubmit} className="luxury-form">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@university.edu"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Введите ваш пароль"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Запомнить меня
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Забыли пароль?
                </Link>
              </div>

              <div className="form-footer">
                <button 
                  type="submit" 
                  className={`luxury-btn primary large full-width ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Вход...
                    </>
                  ) : (
                    <>
                      <span className="btn-sparkle">🔑</span>
                      Войти в аккаунт
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>

                <div className="register-link">
                  Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;