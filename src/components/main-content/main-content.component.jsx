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
import firebase from "firebase/app";
import "firebase/firestore";

const today = new Date();
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

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const fbNotes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(fbNotes);
        this.setState({
          notes: fbNotes,
        });
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

  addNewNote = async () => {
    console.log("add new note called");
    var newItem = {
      title: "New note",
      body: "<p>Text goes here</p>",
      date: today.toString(),
    };
    const newFromDB = await firebase.firestore().collection("notes").add({
      title: newItem.title,
      body: newItem.body,
      date: newItem.date, //firebase.firestore.FieldValue.serverTimestamp(),
    });
    newItem.id = newFromDB.id;
  };

  updateNote = (noteObj) => {
    console.log("update note called");
    firebase.firestore().collection("notes").doc(noteObj.id).update({
      title: noteObj.title,
      body: noteObj.body,
      date: today.toString(),
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
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
      await firebase.firestore().collection("notes").doc(noteID).delete();
    }
  };

  render() {
    // console.log("note list state: ", this.state.notes);
    // console.log("note list props: ", this.props.notes);
    var filtNotes;
    const { notes, searchPhrase } = this.state;
    notes.length > 0
      ? (filtNotes = notes.filter((note) =>
          note.body.toLowerCase().includes(searchPhrase.toLowerCase())
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