import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { getItemLabel } from './utils';
import styles from './shared.css';

const wrapperClass = "react-ahead__menu-wrapper";
const contentClass = "react-ahead__menu-content";
const noOptionClass = "react-ahead__menu-no-option";
const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";

export default class Dropdown extends React.Component {
  static propTypes = {
    display: PropTypes.func,
    grouped: PropTypes.bool,
    isCreateable: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    onLoadMore: PropTypes.func,
  };

  static defaultProps = {
    options: [],
  }

  state = {
    activeIdx: 0,
  };

  constructor(props) {
    super(props);

    this._classNames = {
      wrapper: styles[wrapperClass] || wrapperClass,
      content: styles[contentClass] || contentClass,
      noOption: styles[noOptionClass] || noOptionClass,
      option: styles[optionClass] || optionClass,
      active: (styles[activeClass] && `${styles[activeClass]} ${styles[optionClass]}`) || `${activeClass} ${optionClass}`,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let { length } = this.props.options;
    let idx = -1;

    if (prevProps.options.length !== length) {
      const item = prevProps.options[prevState.activeIdx];

      if (item) {
        const lastSource = getItemLabel(item);

        for (let i = 0; i < length; i++) {
          const source = getItemLabel(this.props.options[i])

          if (source === lastSource) {
            idx = i;
            break;
          }
        }
      }
    }

    if (prevState.activeIdx >= length) {
      idx = length - 1;
    }

    if (idx >= 0) {
      this.setState({
        activeIdx: idx,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState || this.state.activeIdx !== nextState.activeIdx) {
      return true;
    }

    if (
      !nextProps 
      || this.props.options.length !== nextProps.options.length 
      || this.props.open !== nextProps.open
    ) {
      return true;
    }

    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i] !== nextProps.options[i]) {
        return true;
      }  
    }

    return false;
  }

  select = evt => {
    const { options } = this.props;
    const { activeIdx } = this.state;

    if (activeIdx >= options.length) {
      return;
    }

    let item = options[activeIdx];
    const source = getItemLabel(item);
    
    this.handleItemSelection(evt, source, item);
  };

  handleCursorMove = (type) => {
    let { activeIdx } = this.state;

    if (type === 'up') {
      activeIdx--;
    } else {
      activeIdx++;
    }

    if (activeIdx < 0) {
      activeIdx = 0;
    } else if (activeIdx >= this.props.options.length) {
      activeIdx = this.props.options.length - 1;

      if (this.props.onLoadMore) {
        this.props.onLoadMore();
      }
    }

    if (activeIdx !== this.state.activeIdx) {
      this.setState({
        activeIdx,
      });
    }
  };

  handleHighlight = (evt, idx) => {
    if (evt) {
      evt.preventDefault();
    }

    this.setState({
      activeIdx: idx,
    });
  };

  handleItemSelection = (evt, source, item) => {
    if (!this.props.onSelection || typeof source !== 'string') {
      return;
    }

    // removing book-keeping data for the created item
    if (item['__itemType'] === 'created') {
      item['source'] = item['__createdValue'] || source.substring(7);
      delete item['__createdValue'];
    }

    this.props.onSelection(evt, source, item);
  }

  renderList = options => {
    // the caller has guaranteed that the options is a non-null array

    const {
      display,
      grouped
    } = this.props;

    const {
      activeIdx
    } = this.state;

    if (grouped) {
      // get the labels ready for insertion
    }

    console.log('render options', options);

    return (
      <Fragment>
        {
          options.map((item, idx) => {
            const key = `__option_item_${idx}`;
            const source = getItemLabel(item);
            const content = display ? display(item, 'option') : source;

            return (
              <div
                className={
                  activeIdx === idx
                    ? this._classNames.active
                    : this._classNames.option
                }
                key={key}
                tabIndex={-1}
                onMouseEnter={evt => this.handleHighlight(evt, idx)}
                onClick={evt => this.handleItemSelection(evt, source, item)}
              >
                {content}
              </div>
            );
          })
        }
      </Fragment>
    );
  };

  render() {
    if (!this.props.open) {
      return null;
    }

    let contents;

    if (this.props.options.length > 0) {
      contents = this.renderList(this.props.options);
    } else {
      contents = (
        <div className={this._classNames.noOption}>No options</div>
      );
    }

    return (
      <div
        onClick={this.props.onClick}
        className={this._classNames.wrapper + " " + this.props.className}
      >
        <div className={this._classNames.content}>
          {contents}
        </div>
      </div>
    );
  }
}