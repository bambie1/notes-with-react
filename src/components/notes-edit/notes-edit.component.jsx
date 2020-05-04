import React from "react";
import ReactQuill from "react-quill";
import Input from "@material-ui/core/Input";
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
    this.handleQuillChange = this.handleQuillChange.bind(this);
  }

  handleQuillChange = async (value) => {
    await this.setState({ body: value });
    this.update();
  };

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
  };

  update = debounce(() => {
    console.log("Database update");
  }, 1500);

  componentDidMount = () => {
    this.setState({
      body: this.props.body,
    });
  };

  render() {
    // console.log("editing notes: ", this.props.editingNote);
    // console.log("state: ", this.state);

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
            onChange={this.handleChange}
          ></Input>

          <div className="notes-edit-controls">
            <span>Delete</span>
          </div>
        </div>
        <hr />
        <ReactQuill
          name="body"
          theme="snow"
          // value={this.props.editingNote?.body}
          defaultValue={this.state.body}
          onChange={this.handleQuillChange}
        ></ReactQuill>
        {/* <p>Your note goes here...</p> */}
      </div>
    );
  }
}

export default NotesEdit;
