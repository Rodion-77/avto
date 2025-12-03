import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const formData = {
    name: "",
    phone: "",
    message: ""
  };

  const [formState, setFormState] = useState(formData);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Автопереключение features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Данные формы:", formState);
    alert("Спасибо! Наш менеджер свяжется с вами в течение 5 минут.");
    setIsModalOpen(false);
    setFormState(formData);
  };

  const features = [
    {
      icon: "💎",
      title: "Эксклюзивный подбор",
      description: "Персональный менеджер подберет автомобиль по вашим критериям из 500+ проверенных вариантов",
      stats: "500+ авто в базе"
    },
    {
      icon: "🛡️",
      title: "Расширенная гарантия",
      description: "Гарантия 2 года или 100,000 км на все автомобили с полным сервисным сопровождением",
      stats: "2 года гарантии"
    },
    {
      icon: "⚡",
      title: "Премиум сервис",
      description: "Выездная демонстрация, тест-драйв в день обращения и оформление за 2 часа",
      stats: "24/7 сервис"
    },
    {
      icon: "🎯",
      title: "Инвестиционный подход",
      description: "Помогаем выбирать автомобили, которые сохраняют стоимость и являются выгодной инвестицией",
      stats: "95% сохранение стоимости"
    }
  ];

  const testimonials = [
    {
      name: "Максим Иванов",
      role: "Студент МГУ",
      text: "Нашел идеальный BMW 3 series за 1 день! Сервис на уровне премиальных дилеров.",
      rating: 5
    },
    {
      name: "Анна Смирнова",
      role: "Студентка ВШЭ",
      text: "Покупка моего Mercedes A-Class прошла невероятно гладко. Сопровождение 24/7!",
      rating: 5
    },
    {
      name: "Дмитрий Петров",
      role: "Студент МФТИ",
      text: "Audi A4 в идеальном состоянии по цене ниже рыночной. Настоящая находка для студентов!",
      rating: 5
    }
  ];

  return (
    <div className="luxury-home">
      {/* Анимированный фон */}
      <div className="luxury-background" style={{
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}></div>

      {/* Парящие частицы */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      {/* Герой-секция */}
      <section ref={heroRef} className="luxury-hero">
        <div className="hero-glow"></div>
        
        <div className="luxury-container">
          <div className="hero-content">
            {/* Основной текст */}
            <div className="hero-main">
              <div className="hero-badge">
                <span>Auto4Students</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line">Твой первый</span>
                <span className="title-accent">премиальный</span>
                <span className="title-line">автомобиль</span>
              </h1>

              <p className="hero-subtitle">
                Эксклюзивный подбор автомобилей для студентов 
                с полным сервисным сопровождением и гарантией лучшей цены
              </p>

              <div className="hero-stats-grid">
                <div className="stat-card">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Проверенных авто</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">98.7%</div>
                  <div className="stat-label">Довольных клиентов</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Сервис поддержка</div>
                </div>
              </div>

              <div className="hero-actions">
                <Link to="/catalog" className="luxury-btn primary">
                  <span className="btn-sparkle"></span>
                  Смотреть каталог
                  <span className="btn-arrow">→</span>
                </Link>
                <button 
                  className="luxury-btn primary secondary-style"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="btn-icon"></span>
                  Бесплатная консультация
                </button>
              </div>
            </div>

            {/* Визуальная часть */}
            <div className="hero-visual">
              <div className="car-showcase">
                <div className="car-image">
                  <img src="/hero/main.jpg" alt="Премиальный автомобиль" />
                  <div className="car-glow"></div>
                </div>
                
                {/* Плавающие карточки */}
                <div className="floating-cards">
                  <div className="floating-card price-card">
                    <div className="card-badge"></div>
                    <div className="card-content">
                      <div className="card-value">от 640 000 ₽</div>
                    </div>
                  </div>
                  
                  <div className="floating-card premium-card">
                    <div className="card-badge"></div>
                    <div className="card-content">
                      <div className="card-value">до 5 000 000 ₽</div>                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Скролл индикатор */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Листайте вниз</span>
        </div>
      </section>

      {/* Секция преимуществ */}
      <section className="luxury-features">
        <div className="luxury-container">
          <div className="section-header">
            <h2>Почему выбирают Auto4Students</h2>
            <p>Инновационный подход к покупке автомобилей для нового поколения</p>
          </div>

          <div className="features-showcase">
            <div className="feature-active">
              <div className="active-icon">{features[activeFeature].icon}</div>
              <h3>{features[activeFeature].title}</h3>
              <p>{features[activeFeature].description}</p>
              <div className="active-stats">{features[activeFeature].stats}</div>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-item ${index === activeFeature ? 'active' : ''}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <div className="feature-indicator"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Секция отзывов */}
      <section className="luxury-testimonials">
        <div className="luxury-container">
          <div className="section-header">
            <h2>Истории успеха</h2>
            <p>Что говорят наши клиенты о сотрудничестве</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="client-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="client-info">
                    <div className="client-name">{testimonial.name}</div>
                    <div className="client-role">{testimonial.role}</div>
                  </div>
                  <div className="rating">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="luxury-cta">
        <div className="cta-glow"></div>
        <div className="luxury-container">
          <div className="cta-content">
            <h2>Готовы к первому премиальному автомобилю?</h2>
            <p>Присоединяйтесь к 5000+ студентов, которые уже нашли свой идеальный автомобиль через наш сервис</p>
            
            <div className="cta-actions">
              <Link to="/catalog" className="luxury-btn primary large">
                <span className="btn-sparkle"></span>
                Начать подбор автомобиля
                <span className="btn-arrow">→</span>
              </Link>
              
              <button 
                className="luxury-btn primary large secondary-style"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="btn-icon"></span>
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="luxury-modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            
            <div className="modal-header">
              <div className="modal-badge"></div>
              <h3>Персональная консультация</h3>
              <p>Наш эксперт свяжется с вами в течение 15 минут для подбора идеального автомобиля</p>
            </div>

            <form className="consultation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (999) 999-99-99"
                  required
                />
              </div>

              <div className="form-group">
                <label>Предпочтения по авто</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Интересует Mercedes C-klasse, бюджет до 3 000 000 руб., предпочтительно с полным приводом..."
                  rows="4"
                />
              </div>

              <button type="submit" className="luxury-btn primary full-width">
                <span className="btn-sparkle">💎</span>
                Получить консультацию
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;