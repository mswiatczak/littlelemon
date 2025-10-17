import React from "react";
import "./Button.css";

export default function Button({ text, href }) {
  if (href) {
    return (
      <a href={href} className="Button">
        {text}
      </a>
    );
  }

  return <button className="Button">{text}</button>;
}
