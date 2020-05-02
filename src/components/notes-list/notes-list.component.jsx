import React from "react";
import "./notes-list.styles.scss";
import NotesData from "./notes-data";
import NoteItem from "../note-item/note-item.component";
import SectionHeader from "../section-header/section-header.component";

class NotesList extends React.Component {
  constructor() {
    super();

    this.state = {
      notes: NotesData,
    };
  }

  render() {
    return (
      <div className="notes-list">
        <SectionHeader />
        <hr />
        {this.state.notes.map(({ id, ...otherProps }) => (
          <NoteItem key={id} {...otherProps} />
        ))}
      </div>
    );
  }
}

export default NotesList;
