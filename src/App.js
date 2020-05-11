import React from "react";
import NotesPage from "./pages/notes-page/notes-page";
import HomePage from "./pages/home-page/home-page";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // loggedIn: false,
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot((snapShot) => {
          // console.log("snapshot data: ", snapShot.data());
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({
          currentUser: null,
        });
      }
      // console.log(userAuth);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    console.log("current user: ", this.state.currentUser);
    return (
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/notes"
            render={() =>
              this.state.currentUser ? (
                <NotesPage userID={this.state.currentUser.id} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/signin",
                  }}
                />
              )
            }
          />
          <Route
            path="/signin"
            render={() =>
              this.state.currentUser ? (
                <Redirect
                  to={{
                    pathname: "/notes",
                  }}
                />
              ) : (
                <SignInPage />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
