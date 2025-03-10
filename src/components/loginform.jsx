import React, { useState } from "react";
import Swal from "sweetalert2";
import "./loginform.css";

function LoginForm ({ onLoginSuccess }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = (e) => {
      e.preventDefault();

      
      if (username === "lista" && password === "deseos") {
        
        onLoginSuccess();
        console.log("Username:", username);
        console.log("Password:", password);

        
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully! ✔️",
        });

        setIsVisible(false);
      } else {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials!!",
        });


      }

    };


  if (!isVisible) return null;

  return (
    <div
      style={{
        maxWidth: "240px",
        margin: "auto",
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #000000",
        borderRadius: "5px",
        background: "#FFFFFF",
        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <span className="Login_title">Login</span>

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "5px",
            }}
          ></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{
              fontFamily: "HachiMaruPop",
              fontSize: "12px",
              width: "70%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              display: "flex",
              alignContent: "flex-start",
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          ></label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              fontFamily: "HachiMaruPop",
              fontSize: "12px",
              width: "70%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          />
        </div>

        <div
          style={{
            marginBottom: "15px",
            display: "flex",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />{" "}
            <span
              style={{
                fontFamily: "HachiMaruPop",
                fontSize: "12px",
                marginLeft: "-5px",
              }}
            >
              Show Password
            </span>
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button
            type="submit"
            style={{
              width: "40%",
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
        </div>

        {/* Links */}
        <div style={{ textAlign: "center" }}>
          <a
            href="/forgot"
            style={{
              marginTop: "30px",
              textDecoration: "none",
              color: "#007BFF",
              fontFamily: "HachiMaruPop",
              fontSize: "12px",
              display: "block",
            }}
          >
            Forgot Username / Password?
          </a>
          <span
            style={{
              marginTop: "10px",
              textDecoration: "none",
              color: "black",
              fontFamily: "HachiMaruPop",
              fontSize: "12px",
              display: "block",
            }}
          >
            Don’t Have an account?
          </span>
          <a
            href="/signup"
            style={{
              textDecoration: "none",
              color: "#007BFF",
              fontFamily: "HachiMaruPop",
              fontSize: "12px",
              display: "block",
            }}
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};


export default LoginForm;