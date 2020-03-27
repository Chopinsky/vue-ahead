import React from 'react';
import PropTypes from 'prop-types';
import style from "./shared.css";
import SelectionItem from './selectionItem';

const containerClass = "react-ahead__selection-container";

export default class MultiSelection extends React.Component {
  static propTypes = {
    onSelectionRemoval: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._containerStyle = style[containerClass] || containerClass;
  }

  render() {
    if (Array.isArray(this.props.selection) || !this.props.selection.length) {
      return null;
    }

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
                <div className={this._containerStyle}>
                </div>
              </div>
            );
          })
        }
      </>
    );
  }
}