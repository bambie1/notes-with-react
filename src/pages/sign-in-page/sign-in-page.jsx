import React from "react";
import SignIn from "../../components/sign-in/sign-in.component";
// import SignUp from "../../components/sign-up/sign-up.component";
import Header from "../../components/header/header.component";
import "./sign-in-page.scss";

const SignInPage = () => {
  return (
    <div className="sign-in-page">
      <Header />
      <SignIn />
    </div>
  );
};

export default SignInPage;
