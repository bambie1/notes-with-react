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
      {/* <span className="user-account-name">User10005</span>
      <img className="user-account-pic" src={profilePic} href="" alt="" /> */}
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6">Notes</Typography>
          {currentUser ? (
            <Button className="sign-in-out-btn" onClick={() => auth.signOut()}>
              Log Out
            </Button>
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
