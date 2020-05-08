import React, { Fragment } from "react";
import "./note-item.styles.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import { removeHTMLTags } from "../../helperFunctions";

class NoteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNoteClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleClick = () => {
    this.props.onClick();
  };

  handleDelete = () => {
    console.log("note item id: ", this.props.fbID);
    this.props.deleteNote(this.props.fbID);
  };

  render() {
    // console.log("index and id: ", this.props.index, this.props.fbID);
    const { title, body, date } = this.props;
    return (
      <Fragment>
        <ListItem className={`note-container ${this.props.className}`}>
          <div className="note-body" onClick={this.handleClick}>
            <span className="note-title">
              {title.length > 29 ? title.substring(0, 29) + " ..." : title}
            </span>

            <p className="note-brief">
              {body.length > 33
                ? removeHTMLTags(body).substring(0, 33) + " ..."
                : removeHTMLTags(body)}
            </p>
            <p className="note-date">{date}</p>
          </div>
          <DeleteIcon
            onClick={this.handleDelete}
            className="deleteIcon"
          ></DeleteIcon>
        </ListItem>
        <hr />
      </Fragment>
    );
  }
}

export default NoteItem;
