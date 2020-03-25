import React from 'react';
import styles from './shared.css';

const placeholderClass = "react-ahead__placeholder";

const Placeholder = props => {
  if (!props.show || !props.text) {
    return null;
  }

  return (
    <div className={styles[placeholderClass] || placeholderClass}>
      {props.text}
    </div>
  );
};

export default Placeholder;
