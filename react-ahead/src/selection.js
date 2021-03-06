import React from 'react';
import PropTypes from 'prop-types';
import ControlIcon from './icon';
import { getItemLabel } from './utils';
import styles from "./shared.css";

const containerClass = "react-ahead__selection-container";
const contentClass = "react-ahead__selection-content";
const removalClass = "react-ahead__selection-removal";

const classNames = {
  containerStyle: styles[containerClass] || containerClass,
  contentStyle: styles[contentClass] || contentClass,
  removalStyle: styles[removalClass] || removalClass,
};

export default class MultiSelection extends React.Component {
  static propTypes = {
    display: PropTypes.func,
    selection: PropTypes.arrayOf(PropTypes.any),
    onSelectionRemoval: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  handleRemovalKeydown = (evt, idx) => {
    if (!evt) {
      return;
    }

    const { keyCode } = evt;

    if (keyCode === 13 || keyCode === 32) {
      evt.preventDefault();
      this.props.onSelectionRemoval(evt, idx);
    }
  };

  renderItem = (item, idx) => {
    const key = `__sel_item_${idx}`;
    const title = getItemLabel(item);
    
    let content = 
      this.props.display ? this.props.display(item, 'display') : title;

    if (typeof content === 'string' && content.length > 10) {
      content = content.substr(0, 8) + ' ...';
    }

    return (
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        key={key}
      >
        <div className={classNames.containerStyle}>
          <div title={title} className={classNames.contentStyle}>
            {content}
          </div>
          <ControlIcon 
            className={classNames.removalStyle}
            path={"M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z"}
            size={"12"}
            onClick={evt => this.props.onSelectionRemoval(evt, idx)}
            onKeyDown={evt => this.handleRemovalKeydown(evt, idx)}
          />
        </div>
      </div>
    );
  };

  render() {
    const { selection } = this.props;

    if (!Array.isArray(selection) || !selection.length) {
      return null;
    }

    // console.log(selection);

    return (
      <>
        {
          selection.map((item, idx) => {
            return this.renderItem(item, idx)
          })
        }
      </>
    );
  }
}