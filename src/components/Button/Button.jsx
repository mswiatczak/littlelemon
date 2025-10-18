import React from "react";
import "./Button.css";

export default function Button({ text, href, type, onClick }) {
  if (href) {
    return (
      <a href={href} className="Button">
        {text}
      </a>
    );
  }

  return (
    <button type={type || "button"} className="Button" onClick={onClick}>
      {text}
    </button>
  );
}
