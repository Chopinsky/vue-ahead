import React from 'react';
import PropTypes from 'prop-types';
import styles from './shared.css';

const groupLabelClass = 'react-ahead__group-label';
const groupLabelIconClass = 'react-ahead__group-label-icon';

const classNames = {
  groupStyles: styles[groupLabelClass] || groupLabelClass,
  groupIconStyles: styles[groupLabelIconClass] || groupLabelIconClass,
};

const GroupLabel = props => {

  return (
    <div className={classNames.groupStyles}>
      <span>
        {props.label || 'Default'}
      </span>
      <span className={classNames.groupIconStyles}>
        {props.count || 0}
      </span>
    </div>
  );
};

GroupLabel.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
}

export default GroupLabel;