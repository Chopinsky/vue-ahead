import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';
import ClearIcon from './icons/clear';
import DropIcon from './icons/drop';

const dropdownClass = "react-ahead__dropdown-wrapper";
const iconWrapperClass = "react-ahead__dropdown-icon-wrapper";
const separatorClass = "react-ahead__dropdown-separator";

const DropdownIcon = props => {
  const dropdownWrapperStyle = styles[dropdownClass] || dropdownClass;
  const iconWrapperStyle = styles[iconWrapperClass] || iconWrapperClass;
  const separatorStyle = styles[separatorClass] || separatorClass;

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
        props.onSpecialKey && props.onSpecialKey('move', keyCode === 38);
        break;

      case 9:
        if (action !== 'dropdown' || evt.shiftKey) {
          props.onSpecialKey && props.onSpecialKey('tab');
        }

        break;
    
      default:
        break;
    }
  }

  return (
    <div className={dropdownWrapperStyle}>
      <div 
        className={iconWrapperStyle} 
        aria-hidden="true"
        onClick={props.onClear}
        onKeyDown={evt => handleKeyDown(evt, 'clear')}
        tabIndex={0}
      >
        <ClearIcon />
      </div>
      <span className={separatorStyle}></span>
      <div 
        className={iconWrapperStyle} 
        aria-hidden="true"
        onClick={props.onDropdown}
        onKeyDown={evt => handleKeyDown(evt, 'dropdown')}
        tabIndex={0}
      >
        <DropIcon />
      </div>
    </div>
  );
};

DropdownIcon.propTypes = {
  onClear: PropTypes.func,
  onDropdown: PropTypes.func,
}

export default DropdownIcon;