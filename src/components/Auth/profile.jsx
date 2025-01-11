
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/Auth/LogoutButton.jsx";
import profileIcon from "../../assets/icons/profile.svg";

import "./profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();


  return (
    isAuthenticated && (
      <div className="profileContainer">
        <img src={profileIcon} alt="profile icon" width={45} />
        <span>{user.name}</span>
        <LogoutButton/>
      </div>
    )
  );
};

export default Profile;