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

    if (!this.state.dropdownOpen) {
       // the dropdown shall remain open even if all text are cleared
      targetState.dropdownOpen = true;
    }

    //todo: do the search with the vlaue

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

    if (this.props.multiSel) {
      selection.push(val);
    } else {
      selection = [val];
    }

    this.handleFocusMove(null);

    this.setState({
      selection,
      value: '',
    });
  };

  handleKeepFocus = evt => {
    console.log("keep focus...");
    this._focusType = 2;
  }

  handleFocusMove = evt => {
    if (this._input && this._input.current) {
      this._input.current.focus();
    }
  };

  handleGetFocus = evt => {
    if (this._focusType !== 1) {
      this._focusType = 1;

      //todo: do the search on opening the dropdown menu  

      this.setState({
        dropdownOpen: true,  // open with full values
      });
    }
  };

  handleLoseFocus = evt => {
    if (this._focusType === 2) {
      // the focus type will remain
      this._focusType = 1;
    } else {
      this._focusType = 0;

      this.setState({
        value: '',
        dropdownOpen: false,
      });
    }
  };

  handleSelectionRemoval = val => {

  };

  handleClear = () => {
    this._focusType = 2;

    if (this._input && this._input.current) {
      this._input.current.handleTextChange(null, { value: '' });
    }

    this.setState({
      value: '',
      selection: [],
    });
  };

  handleDropdownOpen = () => {
    this._focusType = 2;

    this.setState({
      dropdownOpen: true,
    })
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
      <div className={(className || '') + " " + this._classNames.container}>
        <div
          className={(customClassNames.input || '') + " " + this._classNames.wrapper}
          onMouseDown={this.handleKeepFocus}
          onClick={this.handleFocusMove}
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
        />
      </div>
    );
  }
}