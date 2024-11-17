import React, { useState } from "react";
import "./Header.css"; 

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        {/* Burger Menu */}
        <button
          className="burger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Logo */}
        <img
          src="/path-to-your-logo/logo.svg"
          alt="Logo"
          className="header-logo"
        />

        {/* Title */}
        <h1 className="header-title">My Application</h1>

        {/* Language Selector */}
        <select className="language-selector">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {/* Optional: Render the menu if open */}
      {isMenuOpen && (
        <nav className="menu">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
