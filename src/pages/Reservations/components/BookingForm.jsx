import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import "./BookingForm.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
    occasion: "none",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (selectedDate < today) {
      newErrors.date = "Please select today or a future date";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "At least 1 guest is required";
    } else if (formData.guests > 10) {
      newErrors.guests = "Maximum 10 guests allowed";
    }

    if (!formData.occasion || formData.occasion === "none") {
      newErrors.occasion = "Please select an occasion";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      console.log("Reservation submitted:", formData);

      // Generate a more readable confirmation ID with format: LL-XXXX-XXXX
      const randomPart1 = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const randomPart2 = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const id = `LL-${randomPart1}-${randomPart2}`;
      setConfirmationId(id);

      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleNewReservation = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      guests: 1,
      occasion: "none",
      additionalInfo: "",
    });
    setIsSubmitted(false);
    setConfirmationId("");
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Reservation Confirmed!</h2>
        <p>Your table has been successfully reserved.</p>
        <div className="confirmation-id">
          <p>
            <strong>Confirmation ID:</strong> {confirmationId}
          </p>
        </div>
        <div className="reservation-details">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Date:</strong> {formData.date}
          </p>
          <p>
            <strong>Time:</strong> {formData.time}
          </p>
          <p>
            <strong>Guests:</strong> {formData.guests}
          </p>
          <p>
            <strong>Occasion:</strong> {formData.occasion}
          </p>
          {formData.additionalInfo && (
            <p>
              <strong>Additional Info:</strong> {formData.additionalInfo}
            </p>
          )}
        </div>
        <Button
          text="Make Another Reservation"
          onClick={handleNewReservation}
        />
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
          placeholder="Your full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? "error" : ""}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={errors.time ? "error" : ""}
        />
        {errors.time && <span className="error-message">{errors.time}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          className={errors.guests ? "error" : ""}
        />
        {errors.guests && (
          <span className="error-message">{errors.guests}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          className={errors.occasion ? "error" : ""}
        >
          <option value="none">Select an occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="date">Date Night</option>
          <option value="business">Business Meeting</option>
          <option value="family">Family Gathering</option>
          <option value="celebration">Celebration</option>
        </select>
        {errors.occasion && (
          <span className="error-message">{errors.occasion}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="additionalInfo">
          Additional Information (optional)
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="3"
          placeholder="Any dietary restrictions, special requests, or other information we should know?"
        />
      </div>

      <Button text="Reserve Table" type="submit" />
    </form>
  );
}
