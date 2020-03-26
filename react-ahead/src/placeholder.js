import React from 'react';
import styles from './shared.css';

const placeholderClass = "react-ahead__placeholder";
const valueModeClass = "react-ahead__placeholder-value-mode";

const Placeholder = props => {
  if (!props.show || !props.text) {
    return null;
  }

  let wrapperStyle = styles[placeholderClass] || placeholderClass;
  if (props.valueDisplayMode) {
    wrapperStyle += " " + (styles[valueModeClass] || valueModeClass);
  }

  return (
    <div className={wrapperStyle}>
      {props.text}
    </div>
  );
};

export default Placeholder;
