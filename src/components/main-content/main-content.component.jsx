import React, { Fragment, Component } from "react";
import "./main-content.styles.scss";
import NoteItem from "../note-item/note-item.component";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import List from "@material-ui/core/List";
import NotesEdit from "../notes-edit/notes-edit.component";
// import { compareArrays } from "../../helperFunctions";
import {
  firestore,
  getUserNotes,
  updateNote,
  addNote,
} from "../../firebase/firebase.utils";

class MainContent extends Component {
  constructor() {
    super();

    this.state = {
      selectedNoteIndex: null,
      notes: [],
      searchPhrase: "",
      isNoteClicked: false,
    };

    this.selectNote = this.selectNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.viewNotes = this.viewNotes.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount = async () => {
    getUserNotes(this.props?.userID).then((res) => {
      console.log("user docs: ", res);
      this.setState({
        notes: res ? res : [],
      });
    });
  };

  async componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps?.userID) {
      getUserNotes(this.props?.userID).then((res) => {
        console.log("user docs: ", res);
        this.setState({
          notes: res ? res : [],
        });
      });
    }
  }

  selectNote = (index) => {
    this.setState({ selectedNoteIndex: index, isNoteClicked: true });
    console.log("selectedNoteIndex: ", index);
  };

  viewNotes = () => {
    this.setState({
      isNoteClicked: false,
    });
  };

  updateNote = (noteObj) => {
    console.log("update note called");
    updateNote(noteObj, this.props?.userID);
  };

  addNewNote = () => {
    addNote(this.props?.userID);
    // .then(res=>this.setState({
    // }))
  };

  handleSearch = (e) => {
    this.setState({
      searchPhrase: e.target.value,
      selectedNoteIndex: 0,
    });
    // console.log("search bar:", e.target.value);
  };

  deleteNote = async (noteID) => {
    console.log("Note to delete: ", noteID);
    var result = window.confirm("Do you want to delete this note?");
    if (result) {
      await firestore.collection("notes").doc(noteID).delete();
    }
  };

  render() {
    console.log("note list state: ", this.state.notes);
    var filtNotes;
    const { notes, searchPhrase } = this.state;
    notes.length > 0
      ? (filtNotes = notes.filter((note) =>
          note.text.toLowerCase().includes(searchPhrase.toLowerCase())
        ))
      : (filtNotes = []);

    return (
      <div className="content">
        <div
          className={
            this.state.isNoteClicked
              ? "list-component-hide notes-list"
              : "list-component-show notes-list"
          }
        >
          <div className="section-head">
            {/* <Button onClick={this.props.addNewNote}>Add note</Button> */}
            <TextField
              onChange={this.handleSearch}
              className="notes-search-bar"
              label="Search notes"
              type="search"
              variant="outlined"
              size="small"
              fullWidth
            />
            <NoteAddOutlinedIcon
              className="add-note-icon"
              onClick={this.addNewNote}
              fontSize="large"
              style={{ color: "#886c6c" }}
              title="Add note"
            />
          </div>
          <hr />
          {filtNotes.length < 1 ? (
            <div>No notes to display</div>
          ) : (
            <Fragment>
              <List>
                {filtNotes.map(({ id, ...otherProps }, index) => (
                  <NoteItem
                    key={id}
                    className={
                      index === this.state.selectedNoteIndex
                        ? "selected-note"
                        : ""
                    }
                    index={index}
                    fbID={id}
                    deleteNote={this.deleteNote}
                    onClick={() => this.selectNote(index)}
                    {...otherProps}
                  />
                ))}
              </List>
              {/* <hr /> */}
            </Fragment>
          )}
        </div>
        {/* {this.state.notes.length > 0 ? ( */}
        {this.state.isNoteClicked ? (
          <NotesEdit
            editingNote={filtNotes[this.state.selectedNoteIndex]}
            updateNote={this.updateNote}
            deleteNote={this.deleteNote}
            viewNotes={this.viewNotes}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MainContent;
