import React from "react";
import Header from "./components/header/header.component";
import Main from "./components/main/main.component";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      junknotes: null,
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
