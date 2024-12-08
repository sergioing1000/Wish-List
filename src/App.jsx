import './App.css'
import Header from './Components/header';
import LoginForm from "./Components/loginform.jsx";
import CrudTable from "./Components/crudtable.jsx";
import { useState } from "react";

function App() {

  // State to manage visibility of CrudTable
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Header />

      {!isLoggedIn && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && <CrudTable />}
      
    </>
  );
}

export default App
