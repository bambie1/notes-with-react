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
    const { title, body, date, onClick } = this.props;
    return (
      <div className="note-container" onClick={onClick}>
        <span className="note-title">
          {title.length > 40 ? title.substring(0, 40) + " ..." : title}
        </span>
        <p className="note-brief">
          {body.length > 40 ? body.substring(0, 40) + " ..."  : body}
        </p>
        <p className="note-date">{date}</p>
        <hr />
      </div>
    );
  }
}

export default NoteItem;
