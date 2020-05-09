import React from "react";
import "./notes-page.scss";
import MainContent from "../../components/main-content/main-content.component";
// import { getUserNotes } from "../../firebase/firebase.utils";

class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="notes-page">
        <MainContent userID={this.props.userID} />
      </div>
    );
  }
}

export default NotesPage;
