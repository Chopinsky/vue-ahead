import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GroupLabel from './groupLabel';
import { getItemLabel } from './utils';
import styles from './shared.css';

const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";

const classNames = {
  active: (styles[activeClass] && `${styles[activeClass]} ${styles[optionClass]}`) || `${activeClass} ${optionClass}`,
  option: styles[optionClass] || optionClass,
};

export default class DropdownItem extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    display: PropTypes.func,
    groupKey: PropTypes.string,
    idx: PropTypes.number,
    isActive: PropTypes.bool,
    item: PropTypes.object,
    onHighlight: PropTypes.func,
    onItemSelection: PropTypes.func,
    onActiveItemRendered: PropTypes.func,
  };

  constructor(props) {
    super(props);
    
    this._elem = React.createRef();
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.isActive && this.props.onActiveItemRendered) {
      this.props.onActiveItemRendered(this._elem && this._elem.current.offsetTop); //getBoundingClientRect());
    }
  }

  renderItem = () => {
    const {
      display,
      idx,
      isActive,
      item,
      onHighlight,
      onItemSelection,
    } = this.props;

    const source = getItemLabel(item);
    const content = display ? display(source, item, 'option') : source;

    return (
      <div
        ref={this._elem}
        className={isActive ? classNames.active : classNames.option}
        tabIndex={-1}
        onMouseOverCapture={evt => onHighlight(evt, idx)}
        onClick={evt => onItemSelection(evt, source, item)}
      >
        {content}
      </div>
    );
  };

  render() {
    const {
      count,
      groupKey,
    } = this.props;

    if (count > 0) {
      return (
        <Fragment key={`__option_label_${groupKey}`}>
          <GroupLabel
            label={groupKey}
            count={count}
          />
          {this.renderItem()}
        </Fragment>
      );
    }

    return this.renderItem();
  }
}
