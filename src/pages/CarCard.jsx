import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import cars from "../data/cars";
import "../styles/car.css";

function CarCard() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const car = cars.find((c) => c.id === Number(id));
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [callForm, setCallForm] = useState({ name: "", phone: "", message: "" });
  const [creditForm, setCreditForm] = useState({ initialPayment: 20, period: 36 });

  if (!car) {
    return (
      <div className="luxury-car-not-found">
        <div className="not-found-content">
          <div className="not-found-icon">🚗</div>
          <h2>Автомобиль не найден</h2>
          <p>Извините, запрашиваемый автомобиль не существует.</p>
          <Link to="/catalog" className="luxury-btn primary">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const handleCallSubmit = (e) => {
    e.preventDefault();
    console.log("Call form:", callForm);
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setIsCallModalOpen(false);
    setCallForm({ name: "", phone: "", message: "" });
  };

  const handleCreditSubmit = (e) => {
    e.preventDefault();
    console.log("Credit form:", creditForm);
    alert("Заявка на кредит отправлена! Наш менеджер свяжется с вами.");
    setIsCreditModalOpen(false);
  };

  const monthlyPayment = Math.round((car.price * (100 - creditForm.initialPayment) / 100) / creditForm.period);

  // Создаем массив изображений (основное + дополнительные)
  const carImages = [car.image, car.image, car.image];

  return (
    <div className="luxury-car-detail">
      {/* Фон с частицами */}
      <div className="luxury-background"></div>
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className="car-detail-container">
        {/* Хлебные крошки */}
        <div className="breadcrumbs">
          <Link to="/catalog" className="breadcrumb-link">
            Каталог
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{car.name}</span>
        </div>

        {/* Основная информация */}
        <div className="car-detail-card">
          <div className="car-gallery-section">
            <div className="main-image">
              <img src={carImages[activeImage]} alt={car.name} />
              <div className="image-badge">Фото {activeImage + 1}/{carImages.length}</div>
            </div>
            <div className="image-thumbnails">
              {carImages.map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${car.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="car-info-section">
            <div className="car-header">
              <h1 className="car-title">{car.name}</h1>
              <div className="car-price">{car.price.toLocaleString()} ₽</div>
              <div className="car-year">{car.year} год</div>
            </div>

            {/* Основные характеристики */}
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-icon">🎯</span>
                <div className="spec-content">
                  <span className="spec-label">Пробег</span>
                  <span className="spec-value">{car.mileage ? car.mileage.toLocaleString() + ' км' : 'Новый'}</span>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⚙️</span>
                <div className="spec-content">
                  <span className="spec-label">Двигатель</span>
                  <span className="spec-value">{car.engine}</span>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🐎</span>
                <div className="spec-content">
                  <span className="spec-label">Мощность</span>
                  <span className="spec-value">{car.horsepower || '120'} л.с.</span>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🔧</span>
                <div className="spec-content">
                  <span className="spec-label">КПП</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🚀</span>
                <div className="spec-content">
                  <span className="spec-label">Привод</span>
                  <span className="spec-value">{car.drive || 'Передний'}</span>
                </div>
              </div>
              <div className="spec-item">
                <span className="spec-icon">🎨</span>
                <div className="spec-content">
                  <span className="spec-label">Цвет</span>
                  <span className="spec-value">{car.color || 'Белый'}</span>
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="description-section">
              <h3>Описание автомобиля</h3>
              <p>{car.description || car.desc}</p>
            </div>

            {/* Кнопки действий */}
            <div className="action-buttons">
              <button 
                className="luxury-btn primary large"
                onClick={() => {
                  addToCart(car);
                  alert(`Автомобиль ${car.name} добавлен в корзину!`);
                }}
              >
                <span className="btn-icon">🛒</span>
                Добавить в корзину
              </button>
              <button 
                className="luxury-btn secondary large"
                onClick={() => setIsCallModalOpen(true)}
              >
                <span className="btn-icon">📞</span>
                Заказать звонок
              </button>
              <button 
                className="luxury-btn outline large"
                onClick={() => setIsCreditModalOpen(true)}
              >
                <span className="btn-icon">💰</span>
                Рассчитать кредит
              </button>
            </div>
          </div>
        </div>

        {/* Детальные характеристики */}
        <div className="detailed-specs">
          <h2>Технические характеристики</h2>
          <div className="specs-detail-grid">
            <div className="spec-detail">
              <span>Тип кузова</span>
              <span>{car.bodyType}</span>
            </div>
            <div className="spec-detail">
              <span>Объем двигателя</span>
              <span>{car.engine}</span>
            </div>
            <div className="spec-detail">
              <span>Расход топлива</span>
              <span>{car.fuelConsumption}</span>
            </div>
            <div className="spec-detail">
              <span>Тип топлива</span>
              <span>{car.fuelType || 'Бензин'}</span>
            </div>
            <div className="spec-detail">
              <span>Разгон 0-100 км/ч</span>
              <span>{car.acceleration || '10.5'} сек</span>
            </div>
            <div className="spec-detail">
              <span>VIN код</span>
              <span>{car.vin || 'Не указан'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно заказа звонка */}
      {isCallModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCallModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsCallModalOpen(false)}>×</button>
            <div className="modal-header">
              <h3>Заказать звонок</h3>
              <p>Мы перезвоним вам в течение 15 минут</p>
            </div>
            <form onSubmit={handleCallSubmit} className="consultation-form">
              <div className="form-group">
                <label>Ваше имя *</label>
                <input
                  type="text"
                  value={callForm.name}
                  onChange={(e) => setCallForm({...callForm, name: e.target.value})}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон *</label>
                <input
                  type="tel"
                  value={callForm.phone}
                  onChange={(e) => setCallForm({...callForm, phone: e.target.value})}
                  placeholder="+7 (999) 999-99-99"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ваш вопрос</label>
                <textarea
                  value={callForm.message}
                  onChange={(e) => setCallForm({...callForm, message: e.target.value})}
                  placeholder="Расскажите о ваших пожеланиях..."
                  rows="3"
                />
              </div>
              <button type="submit" className="luxury-btn primary large full-width">
                📞 Заказать звонок
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно расчета кредита */}
      {isCreditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsCreditModalOpen(false)}>×</button>
            <div className="modal-header">
              <h3>Рассчитать кредит</h3>
              <p>Подберем оптимальные условия кредитования</p>
            </div>
            <div className="credit-calculator">
              <div className="car-info">
                <h4>{car.name}</h4>
                <div className="car-price">{car.price.toLocaleString()} ₽</div>
              </div>
              
              <form onSubmit={handleCreditSubmit} className="credit-form">
                <div className="form-group">
                  <label>Первоначальный взнос: {creditForm.initialPayment}%</label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={creditForm.initialPayment}
                    onChange={(e) => setCreditForm({...creditForm, initialPayment: e.target.value})}
                  />
                  <div className="range-value">
                    {Math.round(car.price * creditForm.initialPayment / 100).toLocaleString()} ₽
                  </div>
                </div>

                <div className="form-group">
                  <label>Срок кредита: {creditForm.period} месяцев</label>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="6"
                    value={creditForm.period}
                    onChange={(e) => setCreditForm({...creditForm, period: e.target.value})}
                  />
                </div>

                <div className="credit-result">
                  <div className="monthly-payment">
                    <span>Ежемесячный платеж:</span>
                    <span className="payment-amount">{monthlyPayment.toLocaleString()} ₽</span>
                  </div>
                  <div className="credit-details">
                    <div className="detail">
                      <span>Сумма кредита:</span>
                      <span>{Math.round(car.price * (100 - creditForm.initialPayment) / 100).toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="luxury-btn primary large full-width">
                  💰 Подать заявку на кредит
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarCard;