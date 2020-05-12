import React from "react";
import "./sign-up.styles.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import PasswordField from "../password/password.component";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      password: "",
      displayName: "",
      email: "",
      confirmPassword: "",
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      displayName: e.target.value,
    });
    // prop
    //   ? this.setState({ [prop]: e.target.value }) :
    // this.setState({ [e.target.name]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();
    console.log("values: ");
    var sign; //= await signInWithGoogle();
    console.log("sign: ", sign);
    if (sign) {
      this.setState({
        redirect: true,
      });
    }
  }
  render() {
    // console.log("redir state: ", this.state.redirect);
    return this.state.redirect ? (
      <Redirect to="/notes" />
    ) : (
      <div className="sign-in-form">
        <h4 className="sign-up-header">Create your Uncltr account</h4>
        <TextField
          label="Display Name"
          id="displayName"
          helperText="e.g. Joe Buddy"
          margin="normal"
          className="display-name"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <TextField
          label="E-mail"
          id="email"
          helperText="e.g. abc@gmail.com"
          margin="normal"
          className="email-input"
          //   onChange={this.handleChange}
          required
        />
        <PasswordField
          className="password-input"
          //   handleChange={this.handleChange}
          label="Password"
        />
        <PasswordField
          className="confirm-password-input"
          //   handleChange={this.handleChange}
          label="Confirm password"
        />
        <div className="btns-group">
          <Button
            onClick={this.handleSubmit}
            className="sign-up-btn"
            type="submit"
          >
            Sign Up!
          </Button>
        </div>
      </div>
    );
  }
}

export default SignUp;
