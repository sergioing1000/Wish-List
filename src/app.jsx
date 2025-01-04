import Header from './components/header.jsx';
import LoginForm from "./components/loginform.jsx";
import CrudTable from "./components/crudtable.jsx";
import Footer from "./components/footer.jsx";

import "./app.css";

import { useState } from "react";

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Header />

      {!isLoggedIn && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && <CrudTable />}

      <Footer></Footer>
    </>
  );
}

export default App
