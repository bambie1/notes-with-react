import React from "react";
import "./main.styles.scss";
import NotesList from "../notes-list/notes-list.component";
import NotesEdit from "../notes-edit/notes-edit.component"

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <div className="main">
        <NotesList />
        <NotesEdit />
      </div>
    );
  }
}

export default Main;
