import React from 'react';
import PropTypes from 'prop-types';

export default class Dropdown extends React.Component {
  propTypes = {

  };

  render() {    
    if (this.props.open) {
      return (
        <div>
        </div>
      );
    }

    return null;
  }
}