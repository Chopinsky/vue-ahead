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

  return (
    <div className={dropdownWrapperStyle}>
      <div 
        className={iconWrapperStyle} 
        aria-hidden="true"
        onClick={props.onClear}
      >
        <ClearIcon />
      </div>
      <span className={separatorStyle}></span>
      <div 
        className={iconWrapperStyle} 
        aria-hidden="true"
        onClick={props.onDropdown}
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