import React from "react";
import "./notes-page.scss";
import MainContent from "../../components/main-content/main-content.component";
import { getUserNotes } from "../../firebase/firebase.utils";

class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userNotes: [],
    };
  }

  componentDidMount = async () => {
    getUserNotes(this.props?.userID).then((res) => {
      console.log("user docs: ", res);
      this.setState({
        userNotes: res ? res : [],
      });
    });
  };

  async componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps?.userID) {
      getUserNotes(this.props?.userID).then((res) => {
        console.log("user docs: ", res);
        this.setState({
          userNotes: res ? res : [],
        });
      });
    }
  }

  render() {
    return (
      <div className="notes-page">
        <MainContent notes={this.state.userNotes} />
      </div>
    );
  }
}

export default NotesPage;
