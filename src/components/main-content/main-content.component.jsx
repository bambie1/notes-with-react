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
      .orderBy("timestamp", "desc")
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

  addNewNote = async () => {
    addNote(this.props?.userID).then((p) => {
      this.state.notes.map((note, index) => {
        if (note.id === p.id) {
          this.setState({
            selectedNoteIndex: index,
          });
        }
        return p.id;
      });
      // console.log("addnote return: ", p);
    });
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
    if (this.state.notes.length > 0) {
      var { notes } = this.state;
      this.setState((prevState) => {
        if (prevState.selectedNoteIndex > notes.length) {
          console.log("prev index:");
          return {
            selectedNoteIndex: notes.length - 1,
            isNoteClicked: true,
          };
        }
      });
    } else {
      this.setState({
        isNoteClicked: false,
      });
    }
  };

  render() {
    var filtNotes;
    const { notes, searchPhrase } = this.state;
    if (notes.length > 0) {
      // notes.sort(function (a, b) {
      //   return new Date(a.date) - new Date(b.date);
      // });
      // notes.reverse();
      filtNotes = notes.filter(
        (note) =>
          note.text.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          note.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          note.date.toLowerCase().includes(searchPhrase.toLowerCase())
      );
    } else {
      filtNotes = [];
    }

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
            <div id="emptyNotes" className="empty-divs">
              <h2 className="empty-header">UNCLTR</h2>
              <p className="empty-text">No notes to display </p>
              <p>
                Click the "add-note-icon" in the top-right corner to get started
              </p>
            </div>
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
          <div id="empty-editor" className="empty-divs">
            <h1>UNCLTR</h1>
            <p>Click on a note to start editing</p>
          </div>
        )}
      </div>
    );
  }
}

export default MainContent;
