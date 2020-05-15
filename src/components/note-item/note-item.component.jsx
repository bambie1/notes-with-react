import React, { Fragment } from "react";
import "./note-item.styles.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { removeHTMLTags } from "../../helperFunctions";
import { Draggable } from "react-beautiful-dnd";

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
    const { title, text, date, fbID, index } = this.props;
    return (
      <Draggable draggableId={fbID} index={index}>
        {(provided, snapshot) => (
          <Fragment>
            <ListItem
              {...provided.draggableProps}
              innerRef={provided.innerRef}
              className={`note-container ${this.props.className}`}
            >
              <div className="drag-handle" {...provided.dragHandleProps}>
                <DragIndicatorIcon fontSize="small" />
              </div>

              <div className="note-body" onClick={this.handleClick}>
                <span className="note-title">
                  {title.length > 29 ? title.substring(0, 29) + " ..." : title}
                </span>

                <p className="note-brief">
                  {text.length > 33
                    ? removeHTMLTags(text).substring(0, 33) + " ..."
                    : removeHTMLTags(text)}
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
        )}
      </Draggable>
    );
  }
}

export default NoteItem;
