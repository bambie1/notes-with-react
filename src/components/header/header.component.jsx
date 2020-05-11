import React from "react";
import "./header.styles.scss";
// import profilePic from "../../assets/profile.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <AppBar className="app-header" position="static">
        <Toolbar className="tool-header">
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6">Notes</Typography>
          {currentUser ? (
            <div className="user-account-name">
              <Button
                className="sign-in-out-btn"
                onClick={() => auth.signOut()}
              >
                Log Out
              </Button>
              <span>{currentUser.displayName}</span>
            </div>
          ) : (
            <Link to="/signin">
              <Button className="sign-in-out-btn" color="inherit">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
