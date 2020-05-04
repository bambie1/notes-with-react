import React from "react";
import "./header.styles.scss";
import profilePic from "../../assets/profile.png";

const Header = () => {
  return (
    <div className="header">
      <span className="user-account-name">User10005</span>
      <img className="user-account-pic" src={profilePic} href="" alt="" />
    </div>
  );
};

export default Header;
