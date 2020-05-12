import React from "react";
import "./home-page.scss";
import Header from "../../components/header/header.component";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const HomePage = ({ user }) => {
  return (
    <div className="home-page">
      <Header className="home-header" currentUser={user} />
      <div className="page-content">
        <h1 className="welcome-heading">
          WELCOME TO <span className="unclutter-span">UNCLTR</span>
        </h1>
        <span className="subtitle-header">
          Keep your mind uncluttered, write it down
        </span>
        <br />
        <Link className="logo-container" to="/signin">
          <Button className="login-btn">Get started!</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
