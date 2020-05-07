import React from "react";
import Header from "./components/header/header.component";
import MainContent from "./components/main-content/main-content.component";

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
        <MainContent />
      </div>
    );
  }
}

export default App;
