import React, { Fragment, Component } from "react";
import "./notes-list.styles.scss";
import NoteItem from "../note-item/note-item.component";
// import Button from "@material-ui/core/Button";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import List from "@material-ui/core/List";
import NotesEdit from "../notes-edit/notes-edit.component";
// import { compareArrays } from "../../helperFunctions";
import * as firebase from "firebase";

const today = new Date();
class NotesList extends Component {
  constructor() {
    super();

    this.state = {
      selectedNoteIndex: 0,
      notes: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
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

  handleClick = (index) => {
    this.setState({ selectedNoteIndex: index });
    // console.log("selectedNoteIndex: ", index);
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

  deleteNote = async (noteID) => {
    console.log("Note to delete: ", noteID);
    await firebase.firestore().collection("notes").doc(noteID).delete();
    // if (this.state.notes.length < 1) {
    //   this.addNewNote();
    // }
  };

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
              onClick={this.addNewNote}
              fontSize="large"
              style={{ color: "#cac6a8" }}
            />
          </div>
          <hr />
          {this.state.notes.length < 1 ? (
            <div>No notes to display</div>
          ) : (
            <List>
              {this.state.notes.map(({ id, ...otherProps }, index) => (
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
                  onClick={() => this.handleClick(index)}
                  {...otherProps}
                />
              ))}
            </List>
          )}
        </div>
        {this.state.notes.length > 0 ? (
          <NotesEdit
            editingNote={this.state.notes[this.state.selectedNoteIndex]}
            updateNote={this.updateNote}
            deleteNote={this.deleteNote}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default NotesList;
