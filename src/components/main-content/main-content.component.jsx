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
import { firestore, updateNote, addNote } from "../../firebase/firebase.utils";

class MainContent extends Component {
  constructor() {
    super();

    this.state = {
      selectedNoteIndex: 0,
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
    this.getUserNotes = this.getUserNotes.bind(this);
  }

  componentDidMount = async () => {
    this.getUserNotes(this.props?.userID);
  };

  async componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps?.userID) {
      this.getUserNotes(this.props?.userID);
    }
  }

  getUserNotes = async (id) => {
    if (!id) return;

    await firestore
      .collection("users")
      .doc(id)
      .collection("notes")
      .onSnapshot((coll) => {
        if (!coll.empty) {
          var notesArray = coll.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({
            notes: notesArray,
          });
        } else {
          this.setState({
            notes: [],
          });
        }
      });
  };

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
  };

  handleSearch = (e) => {
    this.setState({
      searchPhrase: e.target.value,
      selectedNoteIndex: 0,
    });
  };

  deleteNote = async (noteID) => {
    if (window.confirm("Do you want to delete this note?")) {
      await firestore
        .collection("users")
        .doc(this.props?.userID)
        .collection("notes")
        .doc(noteID)
        .delete();
    }
  };

  render() {
    // console.log("note list state: ", this.state.notes);
    var filtNotes;
    const { notes, searchPhrase } = this.state;
    notes.length > 0
      ? (filtNotes = notes.filter(
          (note) =>
            note.text.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            note.date.toLowerCase().includes(searchPhrase.toLowerCase())
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
              // style={{ color: "#886c6c" }}
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
                        : "unselected-note"
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
        {/* {this.state.isNoteClicked ? ( */}
        {this.state.notes.length > 0 ? (
          <NotesEdit
            editingNote={filtNotes[this.state.selectedNoteIndex]}
            updateNote={this.updateNote}
            deleteNote={this.deleteNote}
            viewNotes={this.viewNotes}
            clicked={this.state.isNoteClicked}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MainContent;
