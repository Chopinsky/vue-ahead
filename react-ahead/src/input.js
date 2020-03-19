import React from "react";
import PropTypes from "prop-types";

export default class Input extends React.Component {
  static propTypes = {};

  state = {
    value: 'test',
  }

  render() {
    return (
      <div
        class={"react-ahead__input-wrapper"}
        style={{
          // display: "inline-block"
        }}
      >
        <input
          type="text"
          style={{
            // width: "fit-content",
            // outline: "none"
          }}
          value={this.state.value}
        />
      </div>
    );
  }
}
