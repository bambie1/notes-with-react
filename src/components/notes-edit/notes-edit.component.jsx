import React from "react";
import ReactQuill from "react-quill";
import Input from "@material-ui/core/Input";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import debounce from "../../helperFunctions";
import "react-quill/dist/quill.snow.css"; // ES6
import "./notes-edit.styles.scss";

class NotesEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      body: "",
      id: "",
      title: "",
      date: "",
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      body: this.props.editingNote?.body,
      title: this.props.editingNote?.title,
      id: this.props.editingNote?.id,
      date: this.props.editingNote?.date,
    });
  };
  componentDidUpdate = (prevProps) => {
    console.log("edit did update");
    if (this.props.editingNote) {
      if (
        this.props.editingNote.id !== prevProps.editingNote?.id ||
        prevProps.editingNote === undefined
      ) {
        this.setState({
          body: this.props.editingNote.body,
          title: this.props.editingNote.title,
          id: this.props.editingNote.id,
          date: this.props.editingNote.date,
        });
      }
    }
  };

  handleDelete = () => {
    console.log("state id: ", this.state.id);
    this.props.deleteNote(this.state.id);
  };

  render() {
    return (
      <div className="notes-edit">
        <div className="notes-edit-header">
          <Input
            className="notes-edit-title"
            name="title"
            type="text"
            placeholder="Note title"
            // defaultValue={this.state.title}
            value={this.state.title}
            onChange={this.updateTitle}
          ></Input>

          <div className="notes-edit-controls">
            <Button
              className="view-notes-button"
              onClick={() => {
                this.props.viewNotes();
              }}
            >
              Notes
            </Button>
            {this.state.id ? (
              <Button className="delete-btn" onClick={this.handleDelete}>
                Delete
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <hr /> */}
        <ReactQuill
          name="body"
          // theme="snow"
          value={`${this.state.body}`}
          onChange={this.updateBody}
        ></ReactQuill>
        {/* <p>Your note goes here...</p> */}
      </div>
    );
  }
  updateBody = async (value) => {
    await this.setState({ body: value });
    console.log("update body called from edit");
    this.update();
    console.log("after update function: notes-edit");
  };

  updateTitle = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    this.update();
  };

  update = debounce(() => {
    console.log("Database update");
    this.state.id
      ? this.props.updateNote({
          id: this.state.id,
          body: this.state.body,
          title: this.state.title,
          date: this.state.date,
        })
      : console.log("undefined");
  }, 1500);
}

export default NotesEdit;
