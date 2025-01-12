import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import LogoutButton from "../src/components/Auth/LogoutButton.jsx";
import "./index.css";
import App from "./app.jsx";

const domain = "dev-hfdnvtxtw50pczuq.us.auth0.com";
const clientId = "yJWEAGzkkCItpx94VBxkg3nsBlysUAbT";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
  