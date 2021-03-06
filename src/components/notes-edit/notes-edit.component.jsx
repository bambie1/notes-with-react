import React from "react";
import ReactQuill from "react-quill";
import Input from "@material-ui/core/Input";
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import debounce from "../../helperFunctions";
import "react-quill/dist/quill.snow.css"; // ES6
import "./notes-edit.styles.scss";

class NotesEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      text: "",
      id: "",
      title: "",
      date: "",
      orderNum: "",
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleType = this.handleType.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.editingNote?.text,
      title: this.props.editingNote?.title,
      id: this.props.editingNote?.id,
      date: this.props.editingNote?.date,
      orderNum: this.props.editingNote?.orderNum,
    });
  };
  componentDidUpdate = (prevProps) => {
    // console.log("edit did update");
    if (this.props.editingNote) {
      if (
        this.props.editingNote.id !== prevProps.editingNote?.id ||
        prevProps.editingNote === undefined
      ) {
        this.setState({
          text: this.props.editingNote.text,
          title: this.props.editingNote.title,
          id: this.props.editingNote.id,
          date: this.props.editingNote.date,
          orderNum: this.props.editingNote.orderNum,
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
      <div
        className={`notes-edit ${
          this.props.clicked ? "show-editor" : "hide-editor"
        }`}
      >
        <div className="notes-edit-header">
          <Input
            className="notes-edit-title"
            name="title"
            type="text"
            placeholder="Note title"
            value={this.state.title}
            onChange={this.updateTitle}
            onKeyDown={this.handleType}
          />

          <div className="notes-edit-controls">
            <Button
              className="view-notes-button"
              onClick={() => {
                this.props.viewNotes();
              }}
              size="small"
            >
              <ArrowBackIosIcon fontSize="small" />
              Notes
            </Button>
          </div>
        </div>
        {/* <hr /> */}
        <ReactQuill
          name="text"
          value={`${this.state.text}`}
          onChange={this.updateText}
          onKeyDown={this.handleType}
        ></ReactQuill>
      </div>
    );
  }
  updateText = async (value) => {
    await this.setState({ text: value });
    // console.log("update text called from edit: ");
    this.update();
    // console.log("after update function: notes-edit");
  };

  updateTitle = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    this.update();
  };
  handleType = async (e) => {
    // console.log("event prop", e.target.name);
    if (
      !(
        (e.keyCode >= 13 && e.keyCode <= 27) ||
        (e.keyCode >= 33 && e.keyCode <= 45) ||
        (e.keyCode >= 91 && e.keyCode <= 93) ||
        (e.keyCode >= 112 && e.keyCode <= 145)
      )
    ) {
      this.update();
    }
  };

  update = () => {
    // console.log("Database update");
    this.state.id
      ? this.props.updateNote({
          id: this.state.id,
          text: this.state.text,
          title: this.state.title,
          date: this.state.date,
          orderNum: this.state.orderNum,
        })
      : console.log("undefined");
  };
}

export default NotesEdit;
