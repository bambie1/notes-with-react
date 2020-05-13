import React from "react";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import IconButton from "@material-ui/core/IconButton";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

class PasswordField extends React.Component {
  constructor() {
    super();

    this.state = {
      password: "",
      showPassword: false,
    };

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }
  handleClickShowPassword() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }
  handleChange() {}
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <FormControl className="password-input">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={this.state.showPassword ? "text" : "password"}
          //   value={this.state.password}
          onChange={this.props.handleChange("password")}
          required
        />
      </FormControl>
      //   endAdornment={
      //     <InputAdornment position="end">
      //        <IconButton
      //         aria-label="toggle password visibility"
      //         onClick={this.handleClickShowPassword}
      //         onMouseDown={this.handleMouseDownPassword}
      //       >
      //         {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
      //       </IconButton>
      //     </InputAdornment>
      //   }
    );
  }
}

export default PasswordField;
