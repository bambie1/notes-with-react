import React from "react";
import "./main.styles.scss";
import NotesList from "../notes-list/notes-list.component";

class Main extends React.Component {
  render() {
    // console.log("notes-main: ", this.state.notes);
    return (
      <div className="main">
        <NotesList />
      </div>
    );
  }
}

export default Main;
