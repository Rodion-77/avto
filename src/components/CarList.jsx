import React from "react";
import cars from "../data/cars.json";
import CarItem from "./CarItem.jsx";

export default function CarList() {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}
