import React from "react";
import BookingForm from "./components/BookingForm";
import chefImage from "../../assets/restaurant-chef-B.jpg";
import "./Reservations.css";

export default function Reservations() {
  return (
    <div className="reservations-container">
      <div className="reservations-hero">
        <div className="hero-text">
          <h1>Reserve a Table</h1>
          <p>
            Book a table at Little Lemon and enjoy our authentic Mediterranean
            cuisine. Fill out the form to make your reservation.
          </p>
        </div>
      </div>

      <div className="reservations-content">
        <div className="reservations-info">
          <div className="info-image">
            <img src={chefImage} alt="Little Lemon Chef" />
          </div>

          <h2>Restaurant Hours</h2>
          <ul>
            <li>Monday - Friday: 11am - 9pm</li>
            <li>Saturday: 11am - 10pm</li>
            <li>Sunday: 11am - 9pm</li>
          </ul>

          <div className="info-image"></div>

          <h2>Reservation Policy</h2>
          <ul>
            <li>
              Reservations are held for 15 minutes past the scheduled time.
            </li>
            <li>Cancellations must be made at least 2 hours in advance.</li>
            <li>We accommodate dietary restrictions with advance notice.</li>
          </ul>

          <h2>Contact Information</h2>
          <ul>
            <li>123 Main Street</li>

            <li>Chicago, IL 60611</li>

            <li> (312) 555-1234</li>

            <li>contact@littlelemon.com</li>
          </ul>
        </div>

        <div className="reservations-form">
          <h2>Booking Form</h2>
          <p>Please provide your reservation details below</p>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
