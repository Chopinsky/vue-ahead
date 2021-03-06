import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './dropdownItem';
import { getItemLabel, getGroupKey } from './utils';
import styles from './shared.css';

const wrapperClass = "react-ahead__menu-wrapper";
const contentClass = "react-ahead__menu-content";
const noOptionClass = "react-ahead__menu-no-option";

const classNames = {
  wrapper: styles[wrapperClass] || wrapperClass,
  content: styles[contentClass] || contentClass,
  noOption: styles[noOptionClass] || noOptionClass,
};

export default class Dropdown extends React.Component {
  static propTypes = {
    defaultSelection: PropTypes.number,
    display: PropTypes.func,
    grouped: PropTypes.bool,
    open: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    onShieldClick: PropTypes.func,
    shield: PropTypes.bool,
    showRemoteMessage: PropTypes.bool,
  };

  static defaultProps = {
    defaultSelection: 0,
    options: [],
  }

  state = {
    activeIdx: 0,
  };

  constructor(props) {
    super(props);

    this._groups = null;
    this._currGroup = null;
    this._manualMove = '';
    this._resetCursor = false;

    this._contentWrapper = React.createRef();

    //todo: default selection is implemented in the wrong place, for the 
    // wrong UX/UI it should be selected by default, instead of pointed 
    // to by default.
    
    if (
      typeof props.defaultSelection === 'number' 
      && props.defaultSelection < props.options.length
    ) {
      this.state.activeIdx = props.defaultSelection;
      
      if (this.state.activeIdx > 0) {
        // let the menu scroll to the activated item
        this._manualMove = 'up';
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let idx = -1;

    if (this._resetCursor) {
      // default to reset to 0
      idx = 0;

      if (
        typeof this.props.defaultSelection === 'number'
        && this.props.defaultSelection < this.props.options.length
      ) {
        // if a default index is given, move to this item
        idx = this.props.defaultSelection;
      }

      // let the window scroll if manually set
      this._manualMove = 'up';
      this._resetCursor = false;
    } else {
      let { length } = this.props.options;

      if (prevProps.options.length !== length && prevProps.options.length > 0) {
        const item = prevProps.options[prevState.activeIdx];
        const lastSource = getItemLabel(item);
        
        for (let i = 0; i < length; i++) {
          const source = getItemLabel(this.props.options[i])

          if (source === lastSource) {
            idx = i;
            break;
          }
        }
      }

      // if the cursor element is selected (and thus removed from the dropdown menu),
      // we check if the active index is still in the range; if it's still present, we 
      // also check if the index is still in the range.
      if ((idx < 0 && prevState.activeIdx >= length) || idx >= length) {
        idx = length - 1;
      }
    }

    if (idx >= 0) {
      this.setState({
        activeIdx: idx,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.shield !== nextProps.shield) {
      return true;  
    }

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

  resetCursor = () => {
    this._resetCursor = true;
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
      this._manualMove = type;

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

  handleActiveItemRendered = offsetTop => {
    if (this.props.options.length < 4 || !this._manualMove) {
      return;
    }

    let wrapper = this._contentWrapper.current;
    if (!wrapper) {
      this._manualMove = '';
      return;
    }

    let { height } = wrapper.getBoundingClientRect();

    if (offsetTop > height - 40 && this._manualMove === 'down') {
      wrapper.scrollTo(0, offsetTop + 40 - height);
    } else if (offsetTop < wrapper.scrollTop && this._manualMove === 'up') {
      wrapper.scrollTo(0, wrapper.scrollTop - 30);
    }

    this._manualMove = '';
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
                key={`__option_item_${idx}`}
                currGroup={this._currGroup}
                count={count}
                display={display}
                idx={idx}
                isActive={activeIdx === idx}
                item={item}
                groupKey={key}
                onHighlight={this.handleHighlight}
                onItemSelection={this.handleItemSelection}
                onActiveItemRendered={this.handleActiveItemRendered}
              />
            );
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

    if (this.props.options.length > 0) {
      contents = this.renderList(this.props.options);
    } else {
      const message = this.props.showRemoteMessage ? "Type to search" : "No options";

      contents = (
        <div className={classNames.noOption}>{message}</div>
      );
    }

    return (
      <div
        onClick={this.props.onClick}
        className={classNames.wrapper + " " + this.props.className}
      >
        {this.renderShield()}
        <div 
          className={classNames.content}
          ref={this._contentWrapper}
        >
          {contents}
        </div>
      </div>
    );
  }
}