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
  }
  handleClick = () => {
    this.props.onClick();
    // this.setState((prevState) => ({
    //   isNoteClicked: false, //!prevState.isNoteClicked,
    // }));
    // console.log("clicked props: ", this.props);
  };

  render() {
    console.log("index and id: ", this.props.index, this.props.fbID);
    const { title, body, date } = this.props;
    return (
      <Fragment>
        <ListItem className={`note-container ${this.props.className}`}>
          <div className="note-body" onClick={this.handleClick}>
            <span className="note-title">
              {title.length > 35 ? title.substring(0, 35) + " ..." : title}
            </span>

            <p className="note-brief">
              {body.length > 35
                ? removeHTMLTags(body).substring(0, 35) + " ..."
                : body}
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
