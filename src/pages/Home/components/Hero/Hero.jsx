import Button from "../../../../components/Button/Button";
import restaurantFood from "../../../../assets/restaurant-food.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Button text="Reserve a Table" href={"/reservations"} />
      </div>
      <div className="hero-image">
        <img src={restaurantFood} alt="hero chef" />
        <Button text="Online Menu" href={"/menu"} />
      </div>
    </div>
  );
}
