import React from "react";
import "./section-header.styles.scss";

class SectionHeader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className="section-head">
          <li>Menu</li>
          {/* <li></li> */}
          <li>Add note</li>
        </ul>
      </div>
    );
  }
}

export default SectionHeader;
