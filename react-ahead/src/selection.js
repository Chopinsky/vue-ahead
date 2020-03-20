import React from 'react';
import PropTypes from 'prop-types';

export default class Selection extends React.Component {
  render() {
    if (!this.props.selection || !this.props.selection.length) {
      return null;
    }

    return (
      <div
        style={{
          color: "rgb(51, 51, 51)",
          marginLeft: "2px",
          marginRight: "2px",
          maxWidth: "calc(100% - 8px)",
          position: "absolute",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          top: "50%",
          transform: "translateY(-50%)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
      </div>
    );
  }
}