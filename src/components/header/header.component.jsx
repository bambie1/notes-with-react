import React from "react";
import "./header.styles.scss"

const Header = () => {
  return (
    <div className="header">
      <ul className="nav">
        <li>Home</li>
        <li>Notes</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Header;
