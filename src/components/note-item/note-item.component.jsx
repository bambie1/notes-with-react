import React from "react";
import "./note-item.styles.scss";

class NoteItem extends React.Component {
  // constructor(props){
  //     super(props)

  //     this.state={
  //         header: "Note 1",
  //         dispText: "this is the first note here",
  //     }
  // }

  render() {
    return (
      <div className="note-container">
        <span className="note-title">{this.props.title}</span>
        <p className="note-brief">{this.props.text}</p>
        <p className="note-date">{this.props.date}</p>
        <hr />
      </div>
    );
  }
}

export default NoteItem;
