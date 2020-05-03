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

  render() {
    // console.log("notes-main: ", this.state.notes);
    return (
      <div className="main">
        <NotesList notes={this.state.notes} />
        
      </div>
    );
  }
}

export default Main;
