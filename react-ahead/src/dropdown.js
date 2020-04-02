import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import GroupLabel from './groupLabel';
import { getItemLabel } from './utils';
import styles from './shared.css';

const wrapperClass = "react-ahead__menu-wrapper";
const contentClass = "react-ahead__menu-content";
const noOptionClass = "react-ahead__menu-no-option";
const optionClass = "react-ahead__menu-option";
const activeClass = "react-head__menu-active-option";
const defaultGroupName = 'default';

export default class Dropdown extends React.Component {
  static propTypes = {
    display: PropTypes.func,
    grouped: PropTypes.bool,
    isCreateable: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    onLoadMore: PropTypes.func,
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
  };

  getGroupKey = item => {
    let groupKey =
      typeof item === 'object' ? item['group'] : defaultGroupName;

    if (typeof groupKey !== 'string' && typeof groupKey !== 'number') {
      groupKey = defaultGroupName;
    }

    groupKey = (groupKey.toString() || defaultGroupName);
    return groupKey.toUpperCase();
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

    let groups = {};
    let currGroup;
    
    if (grouped) {
      // get the labels ready for insertion
      options.forEach(option => {
        const key = this.getGroupKey(option);
        groups[key] = groups.hasOwnProperty(key) ? groups[key] + 1 : 1;
      });
    }

    return (
      <Fragment>
        {
          options.map((item, idx) => {
            const source = getItemLabel(item);
            const content = display ? display(item, 'option') : source;

            const optionItem = (
              <div
                className={
                  activeIdx === idx
                    ? this._classNames.active
                    : this._classNames.option
                }
                key={`__option_item_${source+idx}`}
                tabIndex={-1}
                onMouseOverCapture={evt => this.handleHighlight(evt, idx)}
                onClick={evt => this.handleItemSelection(evt, source, item)}
              >
                {content}
              </div>
            );

            if (grouped) {
              const key = this.getGroupKey(item);

              if (idx === 0 || key !== currGroup) {
                currGroup = key;

                return (
                  <Fragment key={`__option_label_${key}`}>
                    <GroupLabel
                      label={key}
                      count={groups[key]} 
                    />
                    {optionItem}
                  </Fragment>
                );                
              }
            }

            return optionItem;
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
        <div
          style={{
            display: this.props.shield ? 'default' : 'none',
            width: '100%',
            height: '100%',
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100000,
          }}
        >
        </div>
        <div className={this._classNames.content}>
          {contents}
        </div>
      </div>
    );
  }
}