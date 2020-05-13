import React from "react";
import "./sign-in.styles.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      showPassword: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  async handleGoogleSubmit() {
    var sign = await signInWithGoogle();
    console.log("sign: ", sign);
    if (sign) {
      this.setState({
        redirect: true,
      });
    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === "" || password === "") {
      alert("Please fill out the required fields");
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
        redirect: true,
      });
    } catch (e) {
      if (e.code === "auth/wrong-password")
        alert("Email and password don't match");
      if (e.code === "auth/user-not-found")
        alert("Email not found. Please create an account");
      if (e.code === "auth/invalid-email")
        alert("Invalid e-mail address: Please use the format (abc@mail.com)");
      console.log("error: ", e.code);
    }
  }
  render() {
    // console.log("redir state: ", this.state.redirect);
    // const { email, password } = this.state;
    // console.log("state: ", email, password);
    return this.state.redirect ? (
      <Redirect to="/notes" />
    ) : (
      <div className="sign-in-form">
        <h4 className="hr-text">
          <span>Sign in with:</span>
        </h4>
        <div id="customBtn" className="google-login">
          <Button className="google-btn" onClick={this.handleGoogleSubmit}>
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
            name="email"
            value={this.state.email}
            helperText="e.g. abc@gmail.com"
            margin="normal"
            className="email-input"
            onChange={this.handleChange}
            required
          />
          <FormControl className="password-input">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              name="password"
              value={this.state.password}
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.handleChange}
              required
            />
          </FormControl>
          <div className="btns-group">
            <Button
              onClick={this.handleSubmit}
              className="sign-in-btn"
              type="submit"
            >
              Sign in
            </Button>
          </div>
          <p className="register-text">
            Not a member?{" "}
            <span className="register-link" onClick={this.props.clicked}>
              Signup now{" "}
            </span>
            <br /> (Don't worry, we won't <em>clutter</em> your inbox)
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
