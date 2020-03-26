import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';

const menuWrapperClass = "react-ahead__menu-wrapper";
const menuContentClass = "react-ahead__menu-content";

export default class Dropdown extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);

    this._wrapperClass = styles[menuWrapperClass] || menuWrapperClass;
    this._contentClass = styles[menuContentClass] || menuContentClass;
  }

  render() {

    if (this.props.open) {
      return (
        <div 
          className={this._wrapperClass + " " + this.props.className}
          style={{ height: "100px" }}
        >
          <div className={this._contentClass}>
          </div>
        </div>
      );
    }

    return null;
  }
}