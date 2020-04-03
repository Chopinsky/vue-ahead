import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './dropdownItem';
import { getItemLabel, getGroupKey } from './utils';
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
    onShieldClick: PropTypes.func,
    shield: PropTypes.bool,
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

    this._groups = null;
    this._currGroup = null;
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

    if (nextProps.options !== this.props.options) {
      this._groups = null;
      return true;
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
  };

  renderList = options => {
    // the caller has guaranteed that the options is a non-null array

    const {
      display,
      grouped
    } = this.props;

    const {
      activeIdx
    } = this.state;

    this._currGroup = null;
    
    if (grouped && !this._groups) {
      // get the labels ready for insertion
      this._groups = {};

      options.forEach(option => {
        const key = getGroupKey(option);
        this._groups[key] = this._groups.hasOwnProperty(key) ? this._groups[key] + 1 : 1;
      });
    }

    return (
      <Fragment>
        {
          options.map((item, idx) => {
            let count = 0;
            let key;

            if (grouped) {
              key = getGroupKey(item);

              if (idx === 0 || key !== this._currGroup) {
                this._currGroup = key;
                count = this._groups[key];
              }
            }

            return (
              <DropdownItem 
                activeIdx={activeIdx}
                currGroup={this._currGroup}
                count={count}
                display={display}
                idx={idx}
                item={item}
                groupKey={key}
                onHighlight={this.handleHighlight}
                onItemSelection={this.handleItemSelection}
              />
            )
          })
        }
      </Fragment>
    );
  };

  renderShield = () => {
    if (!this.props.shield) {
      return null;
    }

    return (
      <div
        style={{
          position: 'absolute',
          display:  'default',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
          zIndex: 100000,
          opacity: 0.5,
          userSelect: 'none',
        }}
        onClick={this.props.onShieldClick}
      >
        <h3
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            textAlign: 'center',
            margin: '-12px 0 0 0',
            padding: 0,
            width: '100%',
            height: '100%',
          }}
        >
          Loading ...
          </h3>
      </div>
    );
  }

  render() {
    if (!this.props.open) {
      return null;
    }

    let contents;
    let shieldOffset;

    if (this.props.options.length > 0) {
      contents = this.renderList(this.props.options);
      shieldOffset = -10;
    } else {
      contents = (
        <div className={this._classNames.noOption}>No options</div>
      );

      shieldOffset = -28;
    }

    return (
      <div
        onClick={this.props.onClick}
        className={this._classNames.wrapper + " " + this.props.className}
      >
        {this.renderShield()}
        <div className={this._classNames.content}>
          {contents}
        </div>
      </div>
    );
  }
}