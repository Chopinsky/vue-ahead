import React from 'react';
import PropTypes from 'prop-types';
import styles from "./shared.css";

const containerClass = "react-ahead__selection-container";
const contentClass = "react-ahead__selection-content";
const removalClass = "react-ahead__selection-removal";

export default class MultiSelection extends React.Component {
  static propTypes = {
    display: PropTypes.func,
    selection: PropTypes.arrayOf(PropTypes.any),
    onSelectionRemoval: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._containerStyle = styles[containerClass] || containerClass;
    this._contentStyle = styles[contentClass] || contentClass;
    this._removalStyle = styles[removalClass] || removalClass;
  }

  renderItem = (item, idx) => {
    const key = `sel_item_${idx}`;
    const source = typeof item === 'object' ? item['source'] : item.toString();
    
    let content = this.props.display ? this.props.display(item, 'display') : source;
    let title = content;

    if (typeof content === 'string' && content.length > 10) {
      content = content.substr(0, 8) + '...';
    }

    return (
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        key={key}
      >
        <div className={this._containerStyle}>
          <div title={title} className={this._contentStyle}>{content}</div>
          <div className={this._removalStyle}>X</div>
        </div>
      </div>
    );
  };

  render() {
    if (!Array.isArray(this.props.selection) || !this.props.selection.length) {
      return null;
    }

    return (
      <>
        {
          this.props.selection.map((item, idx) => {
            return this.renderItem(item, idx)
          })
        }
      </>
    );
  }
}