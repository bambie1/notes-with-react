import React from "react";
import "./main.styles.scss";
import * as firebase from "firebase";
import NotesList from "../notes-list/notes-list.component";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      notes: [],
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

  addNewNote = () => {
    const today = new Date();
    var newItem = {
      id: "",
      title: "New note",
      body: "Text goes here",
      date: today.toString(),
    };
    this.setState((prevState) => ({
      notes: [...prevState.notes, newItem],
    }));
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
