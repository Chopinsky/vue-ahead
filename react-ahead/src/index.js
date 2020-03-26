import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Dropdown from './dropdown';
import Placeholder from './placeholder';
import Selection from './selection';
import DropdownIcon from './icon';
import styles from "./shared.css";

const containerClass = "react-ahead__control-container";
const wrapperClass = "react-ahead__control-wrapper";
const inputWrapperClass = "react-ahead__input-wrapper";

export default class ReactAhead extends React.Component {
  static propTypes = {
    isMulti: PropTypes.bool,
    initOptions: PropTypes.arrayOf(PropTypes.object),
    customClassNames: PropTypes.object,
  };

  static defaultProps = {
    customClassNames: {
      input: '',
      dropdown: '',
    }
  };

  state = {
    cursorIndex: 0,
    dropdownOpen: false,
    options: [],
    selection: [],
    value: ''
  };

  constructor(props) {
    super(props);

    this._input = React.createRef();
    this._focusType = 0;
    this._lastVal = '';
    this._initDropdownState = false;

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = props.initOptions;
    }

    this._classNames = {
      container: styles[containerClass] || containerClass,
      wrapper: styles[wrapperClass] || wrapperClass,
      inputWrapper: styles[inputWrapperClass] || inputWrapperClass,
    }
  }

  handleEntryChanged = (_evt, value) => {
    let targetState = { value };

    //todo: do the search with the vlaue

    this._lastVal = value;
    this.setState(targetState);
  };

  handleSelectionMove = (_evt, side) => {
    let { cursorIndex } = this.state;

    if (side === 'up' && cursorIndex >= 0) {
      cursorIndex--;
    } else if (side === 'down') {
      if (cursorIndex === this.state.options.length - 1) {
        //todo: send query for more options, then add them to the list
        
      } else {
        cursorIndex--;
      }
    }

    if (cursorIndex !== this.state.cursorIndex) {
      this.setState({
        cursorIndex,
      });
    }
  };

  handleSelectionChoice = (val) => {
    if (!val) {
      return;
    }

    let { selection } = this.state;
    this._lastVal = '';
    console.log('selection, reset last value:', this._lastVal);

    if (this.props.multiSel) {
      selection.push(val);
    } else {
      selection = [val];
    }

    // this.handleControlFocus(null);

    this.setState({
      selection,
      value: '',
    });
  };

  handleKeepFocus = evt => {
    this._focusType = 2;
    this._initDropdownState = this.state.dropdownOpen;
  }

  handleControlFocus = evt => {
    if (this._input && this._input.current) {
      this._input.current.focus();
    }
  };

  handleGetFocus = evt => {
    console.log('get focus ... ', this._focusType);
    let { value } = this.state;

    switch (this._focusType) {
      case 0:
      case 2:
        this._focusType = 1;
        value = this._lastVal;

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
        this.setState({
          dropdownOpen: true,  // open with full values
        });

        return;

      default:
        break;
    }
  };

  handleLoseFocus = evt => {
    console.log('lose focus ... ', this._focusType);

    if (this._focusType === 2) {
      // the focus type will remain
      this._focusType = 1;
    } else if (this._focusType === 3) {
      this._focusType = 1;
      this.handleControlFocus(evt);
    } else {
      this._focusType = 0;

      this.setState({
        value: '',
        dropdownOpen: false,
      });
    }
  };

  handleDropdownSelection = evt => {
    console.log('dropdown clicked ... ', this._focusType);
    this._focusType = 3;
    this.handleControlFocus(evt);
  }

  handleSelectionRemoval = val => {

  };

  handleClear = () => {
    console.log('clear ... ');

    this._focusType = 2;
    this._lastVal = '';

    if (this._input && this._input.current) {
      this._input.current.handleTextChange(null, { value: '' });
    }

    this.setState({
      value: '',
      selection: [],
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

  renderInput = () => {
    const singleSelDone = !this.props.isMulti && this.state.selection.length === 1;

    return (
      <div className={this._classNames.inputWrapper}>
        <Placeholder 
          show={
            (this.props.placeholder && this.state.selection.length === 0 && !this.state.value)
            || (singleSelDone && !this.state.value)
          } 
          text={singleSelDone ? this.state.selection[0] : this.props.placeholder}
          valueDisplayMode={singleSelDone}
        />
        <Selection
          isMulti={this.props.isMulti}
          selection={this.state.selection}
          onSelectionRemoval={this.handleSelectionRemoval}
        />
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
      options,
    } = this.props;

    const {
      cursorIndex,
      dropdownOpen,
    } = this.state;

    return (
      <div 
        className={(className || '') + " " + this._classNames.container}
        onMouseDown={this.handleKeepFocus}
      >
        <div
          className={(customClassNames.input || '') + " " + this._classNames.wrapper}
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
          className={customClassNames.dropdown}
          open={dropdownOpen}
          options={options}
          cursorIndex={cursorIndex}
          onSelection={this.handleSelectionChoice}
          onMouseDown={this.handleDropdownSelection}
        />
      </div>
    );
  }
}