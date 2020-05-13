import React from "react";
import "./sign-up.styles.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  async handleSubmit(e) {
    e.preventDefault();
    console.log("values: ");
    const { email, password, confirmPassword, displayName } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (email === "" || password === "" || displayName === "") {
      alert("Please fill out the required fields");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      //   console.log("user, ", user);
      await createUserProfileDocument({
        uid: user.uid,
        email: user.email,
        displayName: displayName,
      });
      this.setState({
        password: "",
        displayName: "",
        email: "",
        confirmPassword: "",
        redirect: true,
      });
    } catch (e) {
      console.log("error: ", e);
      if (e.code === "auth/weak-password")
        alert("Weak password: Password must contain at least 6 characters");
      if (e.code === "auth/invalid-email")
        alert("Invalid e-mail address: Please use the format (abc@mail.com)");
      if (e.code === "auth/email-already-in-use")
        alert(
          "Account already exists, please sign-in or use a different email address"
        );

      //,
    }
    // if (sign) {
    //   this.setState({
    //     redirect: true,
    //   });
    // }
  }
  render() {
    // console.log("redir state: ", this.state.redirect);
    // const { email, password, confirmPassword, displayName } = this.state;
    // console.log("state: ", email, password, confirmPassword, displayName);
    return this.state.redirect ? (
      <Redirect to="/notes" />
    ) : (
      <div className="sign-up-form">
        <h4 className="sign-up-header">Create your Uncltr account</h4>
        <TextField
          label="Display Name"
          id="displayName"
          helperText="e.g. Joe Buddy"
          margin="normal"
          className="display-name"
          name="displayName"
          value={this.state.displayName}
          onChange={this.handleChange}
          required
        />
        <TextField
          label="E-mail"
          id="email"
          helperText="e.g. abc@gmail.com"
          margin="normal"
          className="email-input"
          onChange={this.handleChange}
          value={this.state.email}
          name="email"
          required
        />
        <FormControl className="password-input">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            name="password"
            type={this.state.showPassword ? "text" : "password"}
            onChange={this.handleChange}
            value={this.state.password}
            required
          />
        </FormControl>
        <FormControl className="password-input">
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            name="confirmPassword"
            type={this.state.showPassword ? "text" : "password"}
            onChange={this.handleChange}
            value={this.state.confirmPassword}
            required
          />
        </FormControl>
        <div className="btns-group">
          <Button
            onClick={this.handleSubmit}
            className="sign-up-btn"
            type="submit"
          >
            Sign Up!
          </Button>
        </div>
        <span onClick={this.props.clicked} className="previous-link">
          Back to SignIn
        </span>
      </div>
    );
  }
}

export default SignUp;
