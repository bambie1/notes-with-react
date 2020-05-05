import React, { Fragment, Component } from "react";
import "./notes-list.styles.scss";
import NoteItem from "../note-item/note-item.component";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import List from "@material-ui/core/List";
import NotesEdit from "../notes-edit/notes-edit.component";
import { compareArrays } from "../../helperFunctions";

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNoteIndex: 0,
      notes: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  addNewNote = (e) => {
    e.preventDefault();
  };

  componentDidMount = () => {
    this.setState({
      notes: this.props.notes,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (!compareArrays(this.props.notes, prevProps.notes)) {
      this.setState({
        notes: this.props.notes,
      });
    }
  };

  handleClick = (index) => {
    this.setState({ selectedNoteIndex: index });
    console.log("selectedNoteIndex: ", index);
  };

  updateNote = (updateNote) => {
    this.setState((prevState) => {
      const newArray = [];
      console.log("update note: ", updateNote);
      prevState.notes.map((note, index) => {
        note?.id === updateNote?.id
          ? (newArray[index] = updateNote)
          : (newArray[index] = note);
        return newArray;
      });
      return { notes: newArray };
    });
  };
  // addNewNote = () => {};
  render() {
    // console.log("note list state: ", this.state.notes);
    // console.log("note list props: ", this.props.notes);
    return (
      <Fragment>
        <div className="notes-list">
          <div className="section-head">
            {/* <Button onClick={this.props.addNewNote}>Add note</Button> */}
            <TextField
              onChange={() => {
                console.log("search bar");
              }}
              className="notes-search-bar"
              label="Search notes"
              type="search"
              variant="outlined"
              size="small"
              fullWidth
            />
            <NoteAddOutlinedIcon
              className="add-note-icon"
              onClick={this.props.addNewNote}
              fontSize="large"
              style={{ color: "#cac6a8" }}
            />
          </div>
          <hr />
          <List>
            {this.state.notes.map(({ id, ...otherProps }, index) => (
              <NoteItem
                key={id}
                className={
                  index === this.state.selectedNoteIndex ? "selected-note" : ""
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
          editingNote={this.state.notes[this.state.selectedNoteIndex]}
          updateNote={this.updateNote}
        />
      </Fragment>
    );
  }
}

export default NotesList;
