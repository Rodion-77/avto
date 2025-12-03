import React, { useState, useMemo } from "react";
import cars from "../data/cars";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/catalog.css";

function Catalog() {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    search: '',
    category: 'all',
    transmission: 'all'
  });

  const [sortBy, setSortBy] = useState('name');
  const [selectedCar, setSelectedCar] = useState(null);

  const filteredCars = useMemo(() => {
    let result = cars.filter(car => {
      const matchesPrice = (!filters.minPrice || car.price >= Number(filters.minPrice)) &&
                         (!filters.maxPrice || car.price <= Number(filters.maxPrice));
      const matchesYear = (!filters.minYear || car.year >= Number(filters.minYear)) &&
                        (!filters.maxYear || car.year <= Number(filters.maxYear));
      const matchesSearch = !filters.search || 
                          car.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || 
                            (filters.category === 'economy' && car.price < 800000) ||
                            (filters.category === 'premium' && car.price >= 800000);

      return matchesPrice && matchesYear && matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year-new': return b.year - a.year;
        case 'year-old': return a.year - b.year;
        default: return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [filters, sortBy]);

  const quickAddToCart = (car, e) => {
    e.stopPropagation();
    addToCart(car);
    
    // Анимация добавления
    const button = e.target;
    const originalContent = button.innerHTML;
    button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
    button.innerHTML = '✓ Добавлено';
    
    setTimeout(() => {
      button.style.background = '';
      button.innerHTML = originalContent;
    }, 2000);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      search: '',
      category: 'all',
      transmission: 'all'
    });
  };

  // Функция для получения иконки в зависимости от типа кузова
  const getBodyTypeIcon = (bodyType) => {
    switch(bodyType?.toLowerCase()) {
      case 'седан': return '🚗';
      case 'внедорожник': return '🚙';
      case 'купе': return '🏎️';
      case 'универсал': return '🚐';
      case 'хэтчбек': return '🚘';
      case 'микроавтобус': return '🚐';
      case 'кабриолет': return '🌅';
      default: return '🚗';
    }
  };

  return (
    <div className="luxury-catalog">
      {/* Шапка каталога */}
      <div className="catalog-hero">
        <div className="hero-content">
          <h1>Каталог автомобилей</h1>
          <p className="hero-subtitle">
            Подберите идеальный автомобиль из нашего премиального автопарка
          </p>
        </div>
      </div>

      <div className="catalog-container">
        {/* Боковая панель фильтров */}
        <aside className="luxury-filters">
          <div className="filters-header">
            <h3>ФИЛЬТРЫ ПОИСКА</h3>
            <button onClick={clearFilters} className="clear-btn">Сбросить всё</button>
          </div>

          <div className="filter-group">
            <label>ПОИСК АВТОМОБИЛЯ</label>
            <input
              type="text"
              placeholder="Введите марку или модель..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>КАТЕГОРИЯ АВТОМОБИЛЯ</label>
            <div className="category-buttons">
              <button 
                className={filters.category === 'all' ? 'active' : ''}
                onClick={() => setFilters({...filters, category: 'all'})}
              >
                🚗 Все автомобили
              </button>
              <button 
                className={filters.category === 'economy' ? 'active' : ''}
                onClick={() => setFilters({...filters, category: 'economy'})}
              >
                💰 Эконом класс
              </button>
              <button 
                className={filters.category === 'premium' ? 'active' : ''}
                onClick={() => setFilters({...filters, category: 'premium'})}
              >
                🏆 Премиум класс
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>ДИАПАЗОН ЦЕН, ₽</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="От 500 000"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="До 10 000 000"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>ГОД ВЫПУСКА</label>
            <div className="year-inputs">
              <input
                type="number"
                placeholder="От 2015"
                value={filters.minYear}
                onChange={(e) => setFilters({...filters, minYear: e.target.value})}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="До 2024"
                value={filters.maxYear}
                onChange={(e) => setFilters({...filters, maxYear: e.target.value})}
              />
            </div>
          </div>
        </aside>

        {/* Основной контент */}
        <main className="catalog-main">
          {/* Панель управления */}
          <div className="control-panel">
            <div className="results-count">
              Найдено <strong>{filteredCars.length}</strong> автомобилей
            </div>
            <div className="sort-control">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">По названию</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="year-new">Сначала новые</option>
                <option value="year-old">Сначала старые</option>
              </select>
            </div>
          </div>

          {/* Сетка автомобилей */}
          <div className="luxury-grid">
            {filteredCars.map((car, index) => (
              <div 
                key={car.id} 
                className="luxury-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCar(car)}
              >
                <div className="card-badge">{car.year} год</div>
                {car.price < 800000 && <div className="economy-badge">💰 ЭКОНОМ</div>}
                {car.price >= 800000 && <div className="premium-badge">🏆 ПРЕМИУМ</div>}

                <div className="car-image">
                  <img 
                    src={`/cars/${car.image}`} 
                    alt={car.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyOTNkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QkNCy0YLQvtGA0L7QuSDQsiDQutC+0L3RgdGC0LDQvdGC0LA8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="image-overlay">
                    <button className="quick-view">👀 Быстрый просмотр</button>
                  </div>
                </div>

                <div className="card-content">
                  <h3>{car.name}</h3>
                  <p className="car-desc">{car.desc}</p>
                  
                  <div className="car-specs">
                    <span>{getBodyTypeIcon(car.bodyType)} {car.bodyType || 'Седан'}</span>
                    <span>⚡ {car.engine || '1.6 л'}</span>
                    <span>⛽ {car.fuelConsumption || '6.5 л/100км'}</span>
                  </div>

                  <div className="price-section">
                    <div className="price">{car.price.toLocaleString()} ₽</div>
                    <div className="monthly">~{Math.round(car.price / 60).toLocaleString()} ₽/мес</div>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="cart-btn"
                      onClick={(e) => quickAddToCart(car, e)}
                    >
                      🛒 В корзину
                    </button>
                    <Link 
                      to={`/cars/${car.id}`} 
                      className="details-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📋 Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="no-results">
              <div className="no-results-content">
                <h3>🚗 Автомобили не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации или сбросить фильтры</p>
                <button onClick={clearFilters} className="primary-btn large">
                  🔄 Сбросить все фильтры
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Модальное окно быстрого просмотра */}
      {selectedCar && (
        <div className="luxury-modal" onClick={() => setSelectedCar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCar(null)}>×</button>
            <div className="modal-car">
              <img src={`/cars/${selectedCar.image}`} alt={selectedCar.name} />
              <div className="modal-info">
                <h2>{selectedCar.name}</h2>
                <p>{selectedCar.desc}</p>
                <div className="modal-specs">
                  <div className="spec">
                    <span>Год выпуска:</span>
                    <span>{selectedCar.year}</span>
                  </div>
                  <div className="spec">
                    <span>Тип кузова:</span>
                    <span>{selectedCar.bodyType || 'Седан'}</span>
                  </div>
                  <div className="spec">
                    <span>Двигатель:</span>
                    <span>{selectedCar.engine || '1.6 л'}</span>
                  </div>
                  <div className="spec">
                    <span>Расход топлива:</span>
                    <span>{selectedCar.fuelConsumption || '6.5 л/100км'}</span>
                  </div>
                  <div className="spec">
                    <span>Категория:</span>
                    <span>{selectedCar.price < 800000 ? '💰 Эконом' : '🏆 Премиум'}</span>
                  </div>
                </div>
                <div className="modal-price">{selectedCar.price.toLocaleString()} ₽</div>
                <button 
                  className="primary-btn large"
                  onClick={() => {
                    addToCart(selectedCar);
                    setSelectedCar(null);
                  }}
                  style={{width: '100%', textAlign: 'center'}}
                >
                  🛒 Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog;