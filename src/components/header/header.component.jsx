import React, { Component, Fragment } from "react";
import "./header.styles.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      profileClicked: false,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu = (event) => {
    console.log("this.state.anchorEl: ", this.state.anchorEl);
    this.setState({
      anchorEl: event.target,
      profileClicked: true,
    });
  };

  handleClose = () => {
    console.log("this.state.anchorEl: ", this.state.anchorEl);
    this.setState({
      anchorEl: null,
      profileClicked: false,
    });
  };

  render() {
    return (
      <div className="header">
        <AppBar
          className={
            this.props.classProps ? this.props.classProps : "app-header"
          }
          position="static"
        >
          <Toolbar className="tool-header">
            <Link className="header-link" to="/">
              <Typography className="header-logo" variant="h5">
                UNCLTR
              </Typography>
            </Link>

            {this.props.currentUser ? (
              <Fragment>
                <IconButton
                  onClick={this.handleMenu}
                  color="inherit"
                  className="user-account"
                >
                  <AccountCircle />
                  <span className="user-name">
                    {this.props.currentUser.displayName}
                  </span>
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={this.state.profileClicked}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                    }}
                  >
                    <Link className="header-link" to="/notes">
                      Go to notes
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      if (window.confirm("Confirm log out?")) {
                        auth.signOut();
                      }
                      this.handleClose();
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </Fragment>
            ) : (
              <Link className="sign-in-link" to="/signin">
                <Button variant="outlined" className="sign-in-out-btn">
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
