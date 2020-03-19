import React from 'react';
import PropTypes from 'prop-types';

export default class Selection extends React.Component {
  render() {
    if (!this.props.selection || !this.props.selection.length) {
      return null;
    }

    return (
      <div>
      </div>
    );
  }
}