import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import imgbackground from "../assets/picts/welcomepict.webp";
import imgbackground2 from "../assets/picts/welcomepict2.webp";

import "./welcomepict.css";

const welcomepict = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [imgbackground, imgbackground2];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  const { isAuthenticated } = useAuth0();

  return (
    <>

    {!isAuthenticated && (

      <div className="welcomecontainer">
        {selectedImage && (
          <img
            className="wpict"
            src={selectedImage}
            alt="Random"
            style={{ marginTop: "20px", width: "320px" }}
          />
        )}
      </div>)}
    </>
  );
}

export default welcomepict;

