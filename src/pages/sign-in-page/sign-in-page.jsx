import React from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import Header from "../../components/header/header.component";
import "./sign-in-page.scss";

class SignInPage extends React.Component {
  constructor() {
    super();

    this.state = {
      showSignUp: false,
    };
  }
  render() {
    return (
      <div className="sign-in-page">
        <Header currentUser={this.props.user} />
        {this.state.showSignUp ? (
          <SignUp
            currentUser={this.props.user}
            clicked={() => this.setState({ showSignUp: false })}
          />
        ) : (
          <SignIn
            currentUser={this.props.user}
            clicked={() => this.setState({ showSignUp: true })}
          />
        )}
      </div>
    );
  }
}

export default SignInPage;
