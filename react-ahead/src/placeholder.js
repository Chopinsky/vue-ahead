import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';

const placeholderClass = "react-ahead__placeholder";
const valueModeClass = "react-ahead__placeholder-value-mode";

const classNames = {
  wrapperStyle: styles[placeholderClass] || placeholderClass,
  valueModeStyle: styles[valueModeClass] || valueModeClass,
};

const Placeholder = props => {
  if (!props.text) {
    return null;
  }

  let wrapperStyle = classNames.wrapperStyle;
  if (props.valueDisplayMode) {
    wrapperStyle += " " + classNames.valueModeStyle;
  }

  return (
    <div className={wrapperStyle}>
      {props.text}
    </div>
  );
};

Placeholder.propTypes = {
  text: PropTypes.string.isRequired,
  valueDisplayMode: PropTypes.bool,
}

export default Placeholder;
