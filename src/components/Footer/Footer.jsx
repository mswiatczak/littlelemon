import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <p>123 Main Street</p>
          <p>Chicago, IL 60611</p>
          <p>(312) 555-1234</p>
          <p>contact@littlelemon.com</p>
        </div>

        <div className="footer-section">
          <h3>Navigation</h3>
          <ul className="footer-nav">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/menu">Menu</a>
            </li>
            <li>
              <a href="/reservations">Reservations</a>
            </li>
            <li>
              <a href="/order-online">Order Online</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Friday: 11am - 9pm</p>
          <p>Saturday: 11am - 10pm</p>
          <p>Sunday: 11am - 9pm</p>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <p>Follow us on social media</p>
          <ul className="footer-nav">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
