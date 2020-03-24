import React from 'react';
import PropTypes from 'prop-types';
import style from "./shared.css";

const containerClass = "react-ahead__selection-container";

export default class Selection extends React.Component {
  static propTypes = {
    onSelectionRemoval: PropTypes.func.isRequired,
  };

  render() {
    if (!this.props.selection || !this.props.selection.length) {
      return null;
    }

    const containerStyle = style[containerClass] || containerClass;

    return (
      <>
        {
          this.props.selection.map(item => {
            return (
              <div 
                style={{
                  overflow: hidden, 
                  whiteSpace: "nowrap",
                }}
              >
                <div className={containerStyle}>
                </div>
              </div>
            );
          })
        }
      </>
    );
  }
}