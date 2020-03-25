import React from 'react';
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
  };

  state = {
    cursorIndex: 0,
    dropdownOpen: false,
    hasFocus: false,
    options: [],
    selection: [],
    value: ''
  };

  constructor(props) {
    super(props);

    this._oldVal = '';
    this._input = React.createRef();

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      this.state.options = props.initOptions;
    }
  }

  handleEntryChanged = (_evt, value) => {
    this.setState({
      value: value,
    });
  };

  handleSelectionMove = (evt, side) => {
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

    this._oldVal = this.state.value;

    this.setState({
      selection,
      value: '',
    });
  };

  handleFocusMove = evt => {
    if (this._input && this._input.current) {
      this._input.current.focus();
    }
  };

  handleGetFocus = evt => {
    let value = this.state.value;

    if (this._oldVal) {
      value = this._oldVal;

      //todo: do the search

    }

    this.setState({
      value,
      hasFocus: true,
      dropdownOpen: true,
    });
  };

  handleLoseFocus = evt => {
    this._oldVal = this.state.value;

    this.setState({
      value: '',
      hasFocus: false,
      dropdownOpen: false,
    });
  };

  handleSelectionRemoval = val => {

  };

  handleClear = () => {
    this.handleFocusMove();

    this._oldVal = '';

    this.setState({
      value: '',
      selection: [],
    })
  };

  handleDropdownOpen = () => {
    this.handleFocusMove();
  }

  renderInput = () => {
    const inputStyle = styles[inputWrapperClass] || inputWrapperClass;

    return (
      <div
        className={inputStyle}
        onClick={this.handleFocusMove}
      >
        <Placeholder 
          show={this.props.placeholder && this.state.selection.length === 0 && !this.state.value} 
          text={this.props.placeholder}
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
    const containerStyle = styles[containerClass] || containerClass;
    const wrapperStyle = styles[wrapperClass] || wrapperClass;

    return (
      <div className={this.props.containerClassName + " " + containerStyle}>
        <div
          className={this.props.className + " " + wrapperStyle}
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
          options={this.props.options}
          cursorIndex={this.state.cursorIndex}
          onSelection={this.handleSelectionChoice}
        />
      </div>
    );
  }
}