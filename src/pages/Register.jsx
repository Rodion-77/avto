import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    phone: "",
    university: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Эффект для отслеживания движения мыши для параллакса
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Проверяем обязательные поля
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.studentId.trim()) {
      alert("Пожалуйста, заполните все обязательные поля");
      setIsLoading(false);
      return;
    }

    // Имитация отправки данных
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      
      // Сохраняем данные пользователя
      localStorage.setItem('studentUser', JSON.stringify(formData));
    }, 1500);
  };

  // Эффект успешной регистрации
  if (submitted) {
    return (
      <div className="luxury-register">
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

        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">🎉</div>
            <h1>Добро пожаловать в Auto4Students!</h1>
            <p className="success-subtitle">
              Ваша регистрация прошла успешно. Теперь вы можете получить специальные условия для студентов.
            </p>

            <div className="user-info">
              <div className="info-item">
                <span className="info-label">Студент:</span>
                <span className="info-value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Студенческий билет:</span>
                <span className="info-value">{formData.studentId}</span>
              </div>
              {formData.university && (
                <div className="info-item">
                  <span className="info-label">Университет:</span>
                  <span className="info-value">{formData.university}</span>
                </div>
              )}
            </div>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Специальные цены</h3>
                <p>Эксклюзивные скидки для студентов</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Быстрое оформление</h3>
                <p>Упрощенная процедура покупки</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🛡️</div>
                <h3>Гарантия качества</h3>
                <p>Расширенная гарантия на авто</p>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/catalog" className="luxury-btn primary large">
                <span className="btn-sparkle">🚗</span>
                Смотреть каталог
                <span className="btn-arrow">→</span>
              </Link>
              <button 
                onClick={() => setSubmitted(false)}
                className="luxury-btn secondary-style large"
              >
                ✏️ Изменить данные
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-register">
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

      <div className="register-container">
        <div className="register-card">
          {/* Левая часть - информация */}
          <div className="register-info">
            <div className="info-content">
              <div className="logo-section">
                <div className="logo-icon">🚗</div>
                <h1>Auto4Students</h1>
              </div>
              
              <h2>Станьте частью нашего сообщества</h2>
              <p className="info-subtitle">
                Зарегистрируйтесь как студент и получите эксклюзивные условия на покупку автомобиля
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🎓</span>
                  <div className="feature-text">
                    <strong>Специальные студенческие скидки</strong>
                    <span>До 15% на все автомобили</span>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div className="feature-text">
                    <strong>Упрощенное оформление</strong>
                    <span>Минимальный пакет документов</span>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div className="feature-text">
                    <strong>Расширенная гарантия</strong>
                    <span>+6 месяцев к стандартной гарантии</span>
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
          <div className="register-form-section">
            <div className="form-header">
              <h3>Регистрация студента</h3>
              <p>Заполните данные для получения специальных условий</p>
            </div>

            <form onSubmit={handleSubmit} className="luxury-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Имя *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Введите ваше имя"
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Фамилия *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Введите вашу фамилию"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="studentId">Номер студенческого билета *</label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Например: 12345678"
                  inputMode="numeric"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="university">Университет</label>
                <select
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                >
                  <option value="">Выберите университет</option>
                  <option value="МГУ">МГУ им. М.В. Ломоносова</option>
                  <option value="ВШЭ">НИУ ВШЭ</option>
                  <option value="МФТИ">МФТИ</option>
                  <option value="МГТУ">МГТУ им. Н.Э. Баумана</option>
                  <option value="РУДН">РУДН</option>
                  <option value="МГИМО">МГИМО</option>
                  <option value="другой">Другой университет</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@university.edu"
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 999-99-99"
                    autoComplete="tel"
                  />
                </div>
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
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <span className="btn-sparkle">🎓</span>
                      Зарегистрироваться как студент
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>

                <p className="form-note">
                  Нажимая кнопку, вы соглашаетесь с нашей 
                  <a href="/privacy"> политикой конфиденциальности</a> и 
                  <a href="/terms"> условиями использования</a>
                </p>

                <div className="login-link">
                  Уже зарегистрированы? <Link to="/login">Войти в аккаунт</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;