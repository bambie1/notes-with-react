import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./notes-edit.styles.scss";

class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  //   _onBoldClick() {
  //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  //   }

  render() {
    return (
      <div className="notes-edit">
        <div className="notes-edit-header">
          <span className="notes-edit-title">Note title</span>
          <div className="notes-edit-controls">
            {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
            <span>Delete</span>
          </div>
        </div>
        <hr />
        {/* <p>Your note goes here...</p> */}
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="Your text goes here..."
          //   spellCheck="true"
          onChange={this.onChange}
        />{" "}
      </div>
    );
  }
}

export default NotesEdit;
