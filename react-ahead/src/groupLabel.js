import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';

const groupLabelClass = 'react-ahead__group-label';
const groupLabelIconClass = 'react-ahead__group-label-icon';

const GroupLabel = props => {
  const groupStyles = styles[groupLabelClass] || groupLabelClass;
  const groupIconStyles = styles[groupLabelIconClass] || groupLabelIconClass;

  return (
    <div className={groupStyles}>
      <span>
        {props.label || 'Default'}
      </span>
      <span className={groupIconStyles}>
        {props.count || 0}
      </span>
    </div>
  );
};

export default GroupLabel;