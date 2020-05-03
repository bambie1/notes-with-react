import React, { Fragment, Component } from "react";
import "./notes-list.styles.scss";
import NoteItem from "../note-item/note-item.component";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import NotesEdit from "../notes-edit/notes-edit.component";

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        noteId: 0
    };
  }

  addNewNote = (e) => {
    e.preventDefault();
  };

  handleClick = (index) => {
    this.setState({ noteId: index });
  };

  render() {
    // console.log("note list state: ", this.state.notes);
    // console.log("note list props: ", this.props.notes);
    return (
      <Fragment>
        <div className="notes-list">
          <div className="section-head">
            <Button onClick={this.addNewNote}>Add note</Button>
            <Button>Menu</Button>
          </div>
          <hr />
          <List>
            {this.props.notes.map(({ id, ...otherProps }, index) => (
              <NoteItem
                key={id}
                onClick={()=>this.handleClick(index)}
                {...otherProps}
              />
            ))}
          </List>
        </div>
        <NotesEdit editingNote={this.props.notes[this.state.noteId]}/>
      </Fragment>
    );
  }
}

export default NotesList;
