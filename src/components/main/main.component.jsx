import React from "react";
import "./main.styles.scss";
import * as firebase from "firebase";
import NotesList from "../notes-list/notes-list.component";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      selectedNote: null,
      selectedNoteID: null,
    };

    this.addNewNote = this.addNewNote.bind(this);
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

  addNewNote = async () => {
    // const today = new Date();
    // var newItem = {
    //   title: "New note",
    //   body: "Text goes here",
    //   date: today.toString(),
    // };
    // const newFromDB = await firebase.firestore().collection("notes").add({
    //   title: newItem.title,
    //   body: newItem.body,
    //   date: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    // newItem.id = newFromDB.id;
    // this.setState((prevState) => ({
    //   notes: [...prevState.notes, newItem],
    // }));
  };

  render() {
    // console.log("notes-main: ", this.state.notes);
    return (
      <div className="main">
        <NotesList notes={this.state.notes} addNewNote={this.addNewNote} />
      </div>
    );
  }
}

export default Main;
