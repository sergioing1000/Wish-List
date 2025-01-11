import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <button
            onClick={() => loginWithRedirect()}
            type="submit"
            style={{
              width: "30%",
              padding: "10px",
              backgroundColor: "#4BF218",
              color: "white",
              bordercolor: "black",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            Sign In
          </button>
      )}
    </> 
);
};

export default LoginButton;
