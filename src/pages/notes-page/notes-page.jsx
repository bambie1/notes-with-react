import React, { Fragment } from "react";
import "./notes-page.scss";
import MainContent from "../../components/main-content/main-content.component";
import Header from "../../components/header/header.component";

// import { getUserNotes } from "../../firebase/firebase.utils";

class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header classProps="notes-props" currentUser={this.props.user} />
        <div className="notes-page">
          <MainContent userID={this.props.user.id} />
        </div>
      </Fragment>
    );
  }
}

export default NotesPage;
