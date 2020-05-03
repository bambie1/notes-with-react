import React, { Fragment } from "react";
import "./note-item.styles.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
// import removeHTMLTags from "../../helperFunctions";

class NoteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNoteClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => {
    this.setState((prevState) => ({
      isNoteClicked: !prevState.isNoteClicked,
    }));
    this.props.onClick();
  };

  render() {
    const { title, body, date } = this.props;
    return (
      <Fragment>
        <ListItem
          className={
            this.state.isNoteClicked
              ? "note-container clicked-note"
              : "note-container"
          }
        >
          <div className="note-body" onClick={this.handleClick}>
            <span className="note-title">
              {title.length > 35 ? title.substring(0, 35) + " ..." : title}
            </span>

            <p className="note-brief">
              {body.length > 35 ? body.substring(0, 35) + " ..." : body}
            </p>
            <p className="note-date">{date}</p>
          </div>
          <DeleteIcon className="deleteIcon"></DeleteIcon>
        </ListItem>
        <hr />
      </Fragment>
    );
  }
}

export default NoteItem;
