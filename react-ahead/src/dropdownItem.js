import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GroupLabel from './groupLabel';
import { getItemLabel } from './utils';
import styles from './shared.css';

const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";

const getClassNames = () => {
  const option = styles[optionClass] || optionClass;
  const active =
    (styles[activeClass] && `${styles[activeClass]} ${styles[optionClass]}`)
    || `${activeClass} ${optionClass}`;

  return {
    active,
    option,
  };
};

const classNames = getClassNames();

const DropdownItem = React.memo(props => {
  const {
    activeIdx,
    count,
    display,
    idx,
    item,
    groupKey,
    onHighlight,
    onItemSelection,
  } = props;

  const source = getItemLabel(item);
  const content = display ? display(item, 'option') : source;

  const optionItem = (
    <div
      className={
        activeIdx === idx
          ? classNames.active
          : classNames.option
      }
      key={`__option_item_${source + idx}`}
      tabIndex={-1}
      onMouseOverCapture={evt => onHighlight(evt, idx)}
      onClick={evt => onItemSelection(evt, source, item)}
    >
      {content}
    </div>
  );

  if (count > 0) {
    return (
      <Fragment key={`__option_label_${groupKey}`}>
        <GroupLabel
          label={groupKey}
          count={count}
        />
        {optionItem}
      </Fragment>
    );
  }

  return optionItem;
});

export default DropdownItem;
