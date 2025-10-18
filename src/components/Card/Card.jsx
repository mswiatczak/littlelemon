import "./Card.css";
import { MdOutlineDeliveryDining } from "react-icons/md";

export default function Card({ title, image, price, description }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          <p className="card-price">${price}</p>
        </div>
        <p className="card-description">{description}</p>
        <button className="card-button">
          Order a delivery
          <MdOutlineDeliveryDining className="button-icon" />
        </button>
      </div>
    </div>
  );
}
