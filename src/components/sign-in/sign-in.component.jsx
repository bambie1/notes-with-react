import React from "react";
import "./sign-in.styles.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import PasswordField from "../password/password.component";
import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      password: "",
      showPassword: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  async handleSubmit() {
    var sign = await signInWithGoogle();
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
        <h4 className="hr-text">
          <span>Sign in with:</span>
        </h4>
        <div id="customBtn" className="google-login">
          <Button className="google-btn" onClick={this.handleSubmit}>
            <img
              src="https://img.icons8.com/plasticine/30/000000/google-logo.png"
              alt="google"
            />
            <span className="buttonText">Google</span>
          </Button>
        </div>
        <h4 className="hr-text">
          <span>or</span>
        </h4>
        <div className="other-login">
          <TextField
            label="E-mail"
            id="email"
            defaultValue=""
            helperText="e.g. abc@gmail.com"
            margin="normal"
            className="email-input"
            required
          />
          {/* <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel> */}
          <PasswordField
            className="password-input"
            handleChange={this.handleChange}
          />
          <div className="btns-group">
            <Button className="sign-in-btn" type="submit">
              Sign in
            </Button>
          </div>
          <p className="register-text">
            Not a member?{" "}
            <a href="#j" className="page-link">
              Signup now{" "}
            </a>
            <br /> (Don't worry, we won't <em>clutter</em> your inbox)
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
