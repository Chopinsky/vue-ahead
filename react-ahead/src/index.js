import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Dropdown from './dropdown';
import Placeholder from './placeholder';
import MultiSelection from './selection';
import DropdownIcon from './icon';
import styles from "./shared.css";

const containerClass = "react-ahead__control-container";
const wrapperClass = "react-ahead__control-wrapper";
const activeClass = "react-ahead__control-active";
const inputWrapperClass = "react-ahead__input-wrapper";

export default class ReactAhead extends React.Component {
  static propTypes = {
    customClassNames: PropTypes.object,
    displayFormatter: PropTypes.func,
    isCreateable: PropTypes.bool,
    isMulti: PropTypes.bool,
    initOptions: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    customClassNames: {
      input: '',
      dropdown: '',
      active: '',
    }
  };

  state = {
    dropdownOpen: false,
    options: [],
    selection: [],
    value: ''
  };

  constructor(props) {
    super(props);

    this._input = React.createRef();
    this._dropdown = React.createRef();

    this._focusType = 0;
    this._lastVal = '';
    this._initDropdownState = false;
    this._selKeys = {};

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = props.initOptions;
    }

    this._classNames = {
      container: styles[containerClass] || containerClass,
      wrapper: styles[wrapperClass] || wrapperClass,
      active: styles[activeClass] || activeClass,
      inputWrapper: styles[inputWrapperClass] || inputWrapperClass,
    }
  }

  handleEntryChanged = (_evt, value) => {
    //todo: do the search with the vlaue

    this._lastVal = value;
    this.setState({
      value,
      dropdownOpen: true,
    });
  };

  handleSelectionMove = (_evt, side) => {
    if (!this.state.dropdownOpen) {
      return;
    }

    this._dropdown 
    && this._dropdown.current 
    && this._dropdown.current.handleCursorMove(side);
  };

  handleSelectionChoice = (evt, key, val) => {
    if (!key || this._selKeys.hasOwnProperty(key)) {
      return;
    }

    let { selection } = this.state;
    this._lastVal = '';

    // add the selection to the list
    if (this.props.isMulti) {
      selection.push(val);
      this._selKeys[key] = null;
    } else {
      selection = [val];
      
      this._selKeys = {};
      this._selKeys[key] = null;
    }

    // filter out selected items
    const options = this.props.initOptions.filter(item => {
      if (typeof item === 'object') {
        return !this._selKeys.hasOwnProperty(item['source']);
      }

      return !this._selKeys.hasOwnProperty(item);
    });

    // set focus type to prepare for transferring the focus
    this._focusType = 1;
    this.handleControlFocus(evt);

    // close the dropdown for now
    setTimeout(() => {
      this.setState({
        dropdownOpen: false,
      });
    }, 0);

    this.setState({
      options,
      selection,
      value: '',
    });
  };

  handleKeepFocus = evt => {
    this._focusType = 2;
    this._initDropdownState = this.state.dropdownOpen;
  }

  handleControlFocus = evt => {
    // console.log('focus input ...');
    this._input && this._input.current && this._input.current.focus();
  };

  handleGetFocus = evt => {
    // console.log('get focus ... ', this._focusType);

    switch (this._focusType) {
      case 0:
      case 2:
        this._focusType = 1;
        let value = this._lastVal;

        //todo: do the search on opening the dropdown menu  

        this.setState({
          value,
          dropdownOpen: true,  // open with full values
        });
        
        break;
    
      case 3:
        //reset focus only
        this._focusType = 1;
        return;

      case 1:
        // really losing focus
        this.setState({
          dropdownOpen: true,  // open with full values
        });

        return;

      default:
        break;
    }
  };

  handleLoseFocus = evt => {
    // console.log(this._focusType);

    switch (this._focusType) {
      case 2:
        // clicked within the control, the focus type will remain
        this._focusType = 1;        
        break;

      case 3:
        // clicked within the dropdown menu, make sure the focus will move back
        this._focusType = 1;
        this.handleControlFocus(evt);
        break;
    
      default:
        this._focusType = 0;

        this.setState({
          value: '',
          dropdownOpen: false,
        });

        break;
    }
  };

  handleSelectionRemoval = val => {

  };

  handleClear = () => {
    this._focusType = 2;
    this._lastVal = '';
    this._selKeys = {};

    if (this._input && this._input.current) {
      this._input.current.handleTextChange(null, { value: '' });
    }

    this.setState({
      value: '',
      selection: [],
      options: this.props.initOptions,
    });
  };

  handleDropdownOpen = () => {
    if (this._initDropdownState) {
      let lastVal = this.state.value;

      setTimeout(() => {
        this._lastVal = lastVal;

        this.setState({
          value: '',
          dropdownOpen: false,
        });
      }, 0);
    }
  };

  handleLoadMore = () => {

  };

  renderInput = () => {
    const {
      isMulti,
      placeholder,
    } = this.props;

    const singleSelDone = !isMulti && this.state.selection.length === 1;
    
    let text;
    if (singleSelDone) {
      text = this.state.selection[0];

      if (typeof text === 'object') {
        text = text['source'] || '<No display>';
      } else {
        text = text.toString();
      }
    } else {
      text = placeholder;
    }

    return (
      <div className={this._classNames.inputWrapper}>
        <Placeholder 
          show={
            (placeholder && this.state.selection.length === 0 && !this.state.value)
            || (singleSelDone && !this.state.value)
          } 
          text={text}
          valueDisplayMode={singleSelDone}
        />
        {
          isMulti
            ?
            <MultiSelection
              selection={this.state.selection}
              onSelectionRemoval={this.handleSelectionRemoval}
            />
            :
            null
        }
        <Input
          ref={this._input}
          onEntryChange={this.handleEntryChanged}
          onSelectionMove={this.handleSelectionMove}
          value={this.state.value}
        />
      </div>
    );
  };

  render() {
    const {
      className,
      customClassNames,
      displayFormatter,
      isCreateable,
    } = this.props;

    const {
      dropdownOpen,
    } = this.state;

    let options;
    if (isCreateable && this.state.value) {
      options = [...this.state.options];
      // don't add the createable if there're exact matches
      let exactMatch = false;
      for (let i = 0; i < options.length; i++) {
        //todo: use display funciton to get the display value??
        if (this.state.value === options[i].source) {
          exactMatch = true;
          break; 
        }
      }

      if (!exactMatch) {
        options.push({ source: `Create ${this.state.value}` });
      }
    } else {
      options = this.state.options;
    }

    let wrapperClassName = (className || '') + " " + this._classNames.container;
    let inputClassName = (customClassNames.input || '') + " " + this._classNames.wrapper;
    if (this._focusType !== 0) {
      inputClassName = (customClassNames.active || this._classNames.active) + " " + inputClassName;
    }

    return (
      <div 
        className={wrapperClassName}
        onMouseDown={this.handleKeepFocus}
      >
        <div
          className={inputClassName}
          onClick={this.handleControlFocus}
          onFocus={this.handleGetFocus}
          onBlur={this.handleLoseFocus}
        >
          {this.renderInput()}
          <DropdownIcon
            onClear={this.handleClear}
            onDropdown={this.handleDropdownOpen}
          />
        </div>
        <Dropdown
          ref={this._dropdown}
          className={customClassNames.dropdown}
          display={displayFormatter}
          open={dropdownOpen}
          options={options}
          onSelection={this.handleSelectionChoice}
          onLoadMore={this.handleLoadMore}
        />
      </div>
    );
  }
}