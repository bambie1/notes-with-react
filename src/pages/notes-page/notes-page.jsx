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
    // snapshot.docs.map((doc) => doc.data())
    // const notes = [];
    // (await getUserNotes(this.props?.userID)).then((res) => {
    //   res.docs.map((doc, index) => {
    //     notes[index] = { id: doc.id, ...doc.data() };
    //   });
    // });

    // this.setState({
    //   userNotes: notes ? notes : [],
    // });

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
