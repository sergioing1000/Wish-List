import React, { useState } from "react";
import "./Header.css";

import pencilSvg from "../assets/icons/pencil.svg";
import worldsvg from "../assets/icons/world.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header_left">
          <button
            className="burger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <h1 className="header-title">Wish List</h1>

          <img src={pencilSvg} alt="Pencil Icon" height={30} />
        </div>

        <div className="header_right">
          <img src={worldsvg} alt="Pencil Icon" height={30} />
          {/* Language Selector */}
          <select
            className="language-selector"
            style={{
              fontFamily: "HachiMaruPop"
            }}
          >
            <option value="en">En</option>
            <option value="es">Es</option>
            <option value="fr">Fr</option>
          </select>
        </div>
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
