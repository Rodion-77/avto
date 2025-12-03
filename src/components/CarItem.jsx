import React from "react";                 // Импорт React для использования JSX
import "../styles/car.css";               // Подключаем стили для карточки автомобиля

function CarItem({ car }) {               // Компонент CarItem принимает объект "car" через пропсы
  return (
    <div className="car-item">            {/* Контейнер карточки авто */}
      <img src={`/cars/${car.image}`}     // Отображаем фото автомобиля (путь из папки /public/cars)
           alt={car.name} />              // Альтернативный текст — название авто
      <h3>{car.name}</h3>                 {/* Название автомобиля */}
      <p>{car.year} • {car.price} ₽</p>  {/* Год выпуска и цена */}
      <a href={`/car/${car.id}`}          // Ссылка на страницу с подробной информацией
         className="btn">Подробнее</a>    {/* Кнопка перехода */}
    </div>
  );
}

export default CarItem;                   // Экспорт компонента для использования в других файлах
