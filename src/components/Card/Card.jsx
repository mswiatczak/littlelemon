import "./Card.css";
import { MdOutlineDeliveryDining } from "react-icons/md";

export default function Card({ title, image, price, description }) {
  // Check if the image is an SVG
  const isSvg = typeof image === "string" && image.includes(".svg");

  return (
    <div className="card">
      {isSvg ? (
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image svg-image" />
        </div>
      ) : (
        <img src={image} alt={title} className="card-image" />
      )}
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
