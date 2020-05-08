import React from "react";
import NotesPage from "./pages/notes-page/notes-page";
import HomePage from "./pages/home-page/home-page";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/signin" component={SignInPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
