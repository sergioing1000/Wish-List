import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./logoutbutton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="LogoutButton" onClick={() => logout({ returnTo: window.location.origin })}>
      Salir
    </button>
  );
};

export default LogoutButton;
