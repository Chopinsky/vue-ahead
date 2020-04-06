import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';
import ControlIcon from './icon';

const containerClass = "react-ahead__action-icons-container";
const separatorClass = "react-ahead__action-icons-separator";
const iconWrapperClass = "react-ahead__action-icons";

const classNames = {
  containerStyle: styles[containerClass] || containerClass,
  separatorStyle: styles[separatorClass] || separatorClass,
  iconWrapperStyle: styles[iconWrapperClass] || iconWrapperClass,
};

const ActionIcons = props => {
  const handleKeyDown = (evt, action) => {
    const { keyCode } = evt || {};

    if (!keyCode) {
      return;
    }

    switch (keyCode) {
      case 13:
      case 32:
        if (action === 'clear') {
          props.onClear && props.onClear();
        } else if (action === 'dropdown') {
          props.onDropdown && props.onDropdown(true);
        }

        break;

      case 38:
      case 40:
        props.onSpecialKey && props.onSpecialKey('move', keyCode === 38 ? 'up' : 'down');
        break;

      case 9:
        if (action !== 'dropdown' || evt.shiftKey) {
          props.onSpecialKey && props.onSpecialKey('tab');
        }

        break;
    
      default:
        break;
    }
  };

  return (
    <div className={classNames.containerStyle}>
      <ControlIcon 
        className={classNames.iconWrapperStyle}
        path={"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z"}
        onClick={_evt => props.onClear()}
        onKeyDown={evt => handleKeyDown(evt, 'clear')}
      />
      <span className={classNames.separatorStyle}></span>
      <ControlIcon
        className={classNames.iconWrapperStyle}
        path={"M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z"}
        onClick={_evt => props.onDropdown()}
        onKeyDown={evt => handleKeyDown(evt, 'dropdown')}
      />
    </div>
  );
};

ActionIcons.propTypes = {
  onClear: PropTypes.func,
  onDropdown: PropTypes.func,
}

export default ActionIcons;