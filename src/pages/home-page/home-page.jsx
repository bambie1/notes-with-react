import React from "react";
import "./home-page.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const HomePage = () => {
  return (
    <div className="home-page">
      <h3 className="welcome-heading">
        WELCOME TO <span>UNCLTR</span>
      </h3>
      <span>Keep your mind uncluttered, write it down</span>
      <Link className="logo-container" to="/signin">
        <Button className="login-btn">Get started!</Button>
      </Link>
    </div>
  );
};

export default HomePage;
