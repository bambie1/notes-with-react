import React from "react";
import ReactQuill from "react-quill";
import debounce from "../../helperFunctions";
import "react-quill/dist/quill.snow.css"; // ES6
import "./notes-edit.styles.scss";

class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      body: "",
      id: "",
      title: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (value) => {
    await this.setState({ text: value });
    this.update();
  };

  update = debounce(() => {
    console.log("Database update");
  }, 1500);

  render() {
    console.log("editing notes: ", this.props.editingNote);
    return (
      <div className="notes-edit">
        <div className="notes-edit-header">
          <span className="notes-edit-title">
            {this.props.editingNote?.title}
          </span>
          <div className="notes-edit-controls">
            <span>Delete</span>
          </div>
        </div>
        <hr />
        <ReactQuill value={this.props.editingNote?.body} onChange={this.handleChange} />
        {/* <p>Your note goes here...</p> */}
      </div>
    );
  }
}

export default NotesEdit;
