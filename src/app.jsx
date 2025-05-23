import Header from './components/header.jsx';
import WelcomePict from "./components/welcomepict.jsx";
import LoginButton from "../src/components/Auth/LoginButton.jsx";
import CrudTable from "./components/crudtable.jsx";
import Footer from "./components/footer.jsx";
import { useAuth0 } from "@auth0/auth0-react";


import "./app.css";

import { useState } from "react";

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const {isAuthenticated } = useAuth0();

  return (
    <>
      <Header />
      <WelcomePict />
      <LoginButton />

      {isAuthenticated && <CrudTable />}

      <Footer></Footer>
    </>
  );
}

export default App
