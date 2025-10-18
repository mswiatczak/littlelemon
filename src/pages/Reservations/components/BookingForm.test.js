import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import BookingForm from "./BookingForm";

describe("BookingForm Component", () => {
  // Test initial render
  test("renders booking form with all required fields", () => {
    render(<BookingForm />);

    // Check for all form fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/additional information/i)
    ).toBeInTheDocument();

    // Check for submit button
    expect(
      screen.getByRole("button", { name: /reserve table/i })
    ).toBeInTheDocument();
  });

  // Test form validation
  test("validates required fields and shows error messages", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    // Submit form without filling any fields
    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    await user.click(submitButton);

    // Check for error messages
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
  });

  // Test guest validation
  test("validates number of guests", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitButton = screen.getByRole("button", { name: /reserve table/i });

    // Test with 0 guests
    await user.clear(guestsInput);
    await user.type(guestsInput, "0");
    await user.click(submitButton);

    expect(
      screen.getByText(/at least 1 guest is required/i)
    ).toBeInTheDocument();

    // Test with more than 10 guests
    await user.clear(guestsInput);
    await user.type(guestsInput, "11");
    await user.click(submitButton);

    expect(screen.getByText(/maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  // Test date validation
  test("validates date is not in the past", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    const dateInput = screen.getByLabelText(/date/i);
    const submitButton = screen.getByRole("button", { name: /reserve table/i });

    // Set a past date
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const formattedPastDate = pastDate.toISOString().split("T")[0];

    await user.type(dateInput, formattedPastDate);
    await user.click(submitButton);

    expect(
      screen.getByText(/please select today or a future date/i)
    ).toBeInTheDocument();
  });

  // Test clearing errors when user starts typing
  test("clears error message when user starts typing in a field", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    const nameInput = screen.getByLabelText(/name/i);

    // Submit form to trigger errors
    await user.click(submitButton);
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();

    // Start typing in name field
    await user.type(nameInput, "John");

    // Error should be cleared
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });

  // Test successful form submission
  test("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    // Fill in form with valid data
    await user.type(screen.getByLabelText(/name/i), "John Doe");

    // Set a future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const formattedFutureDate = futureDate.toISOString().split("T")[0];
    await user.type(screen.getByLabelText(/date/i), formattedFutureDate);

    await user.type(screen.getByLabelText(/time/i), "18:00");

    // Clear the guests field first, then type the value
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");

    // Select an occasion
    const occasionSelect = screen.getByLabelText(/occasion/i);
    await user.selectOptions(occasionSelect, "birthday");

    // Submit form
    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    await user.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    });

    // Should show confirmation ID
    expect(screen.getByText(/confirmation id:/i)).toBeInTheDocument();

    // Should show reservation details
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(formattedFutureDate)).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("birthday")).toBeInTheDocument();
  });

  // Test making another reservation
  test("resets form when making another reservation", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), "John Doe");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const formattedFutureDate = futureDate.toISOString().split("T")[0];
    await user.type(screen.getByLabelText(/date/i), formattedFutureDate);

    await user.type(screen.getByLabelText(/time/i), "18:00");

    // Clear the guests field first, then type the value
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    await user.selectOptions(occasionSelect, "birthday");

    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    await user.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    });

    // Click "Make Another Reservation" button
    const anotherReservationButton = screen.getByRole("button", {
      name: /make another reservation/i,
    });
    await user.click(anotherReservationButton);

    // Should show the form again
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reserve table/i })
    ).toBeInTheDocument();

    // Form should be reset
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/date/i)).toHaveValue("");
    expect(screen.getByLabelText(/time/i)).toHaveValue("");
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(1);
    expect(screen.getByLabelText(/occasion/i)).toHaveValue("none");
  });

  // Test additional info field
  test("includes additional information in confirmation when provided", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    // Fill form with additional info
    await user.type(screen.getByLabelText(/name/i), "John Doe");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const formattedFutureDate = futureDate.toISOString().split("T")[0];
    await user.type(screen.getByLabelText(/date/i), formattedFutureDate);

    await user.type(screen.getByLabelText(/time/i), "18:00");

    // Clear the guests field first, then type the value
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");

    const occasionSelect = screen.getByLabelText(/occasion/i);
    await user.selectOptions(occasionSelect, "birthday");

    await user.type(
      screen.getByLabelText(/additional information/i),
      "Vegetarian options needed"
    );

    // Submit form
    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    await user.click(submitButton);

    // Should show additional info in confirmation
    await waitFor(() => {
      expect(
        screen.getByText(/vegetarian options needed/i)
      ).toBeInTheDocument();
    });
  });
});
