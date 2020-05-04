import React, { Fragment, Component } from "react";
import "./notes-list.styles.scss";
import NoteItem from "../note-item/note-item.component";
import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import NotesEdit from "../notes-edit/notes-edit.component";

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNoteIndex: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  addNewNote = (e) => {
    e.preventDefault();
  };

  handleClick = (index) => {
    this.setState({ selectedNoteIndex: index });
    console.log("selectedNoteIndex: ", index);
  };

  updateNote = (update) => {};
  // addNewNote = () => {};
  render() {
    // console.log("note list state: ", this.state.notes);
    // console.log("note list props: ", this.props.notes);
    return (
      <Fragment>
        <div className="notes-list">
          <div className="section-head">
            {/* <Button onClick={this.props.addNewNote}>Add note</Button> */}
            <input
              onChange={() => {
                console.log("serach bar");
              }}
              className="notes-search-bar"
              placeholder="Search for note"
            />
            <Button>
              <AddIcon onClick={this.props.addNewNote} />
            </Button>
          </div>
          <hr />
          <List>
            {this.props.notes.map(({ id, ...otherProps }, index) => (
              <NoteItem
                key={id}
                className={
                  index === this.state.selectedNoteIndex
                    ? "selected-note"
                    : "unselected-note"
                }
                index={index}
                fbID={id}
                onClick={() => this.handleClick(index)}
                {...otherProps}
              />
            ))}
          </List>
        </div>
        <NotesEdit
          editingNote={this.props.notes[this.state.selectedNoteIndex]}
          // updateNote={()=>this.updateNote()}
        />
      </Fragment>
    );
  }
}

export default NotesList;
