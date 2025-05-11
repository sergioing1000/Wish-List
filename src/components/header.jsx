import React, { useState } from "react";
import Profile from "../components/Auth/profile.jsx";
import "./header.css";

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

          <a
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
              padding: "10px",
            }}
            href="https://wish-list-apeh.vercel.app/"
          >
            <h1 className="header-title">Wish List</h1>
          </a>
          <img src={pencilSvg} alt="Pencil Icon" height={30} />
        </div>

        <div className="header_right">
          <Profile />

          <img src={worldsvg} alt="World Icon" height={30} />

          {/* Language Selector */}
          <select
            className="language-selector"
            style={{
              fontFamily: "HachiMaruPop",
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
              <a href="#home">Inicio</a>
            </li>
            <li>
              <a href="#about">Acerca</a>
            </li>
            <li>
              <a href="#contact">Contactenos</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
