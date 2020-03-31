import React from 'react';
import styles from './shared.css';

const iconClass = "react-ahead__action-icon";

const ControlIcon = props => {
  const iconStyle = styles[iconClass] || iconClass;

  let { size, viewBox } = props;
  
  if (!size) {
    size = "16";
  }

  if (!viewBox) {
    viewBox = "0 0 18 18";
  }

  return (
    <div
      aria-hidden="true"
      className={props.className}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      tabIndex={0}
    >
      <svg
        x="0px" 
        y="0px"
        width={size} 
        height={size}
        viewBox={viewBox}
        focusable="false"
        aria-hidden="true"
        className={iconStyle}
      >
        <path d={props.path} />
      </svg>
    </div>
  );
};

export default ControlIcon;
