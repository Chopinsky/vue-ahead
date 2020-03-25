import React from 'react';
import styles from '../shared.css';

const iconClass = "react-ahead__dropdown-icon";

const DropIcon = _props => {
  const iconStyle = styles[iconClass] || iconClass;

  return (
    <svg
      x="0px" y="0px"
      width="16" height="16"
      focusable="false"
      viewBox="0 0 18 18"
      className={iconStyle}
      aria-hidden="true"
    >
      <path
        d="M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z"
      />
    </svg>
  );
};

export default DropIcon;
