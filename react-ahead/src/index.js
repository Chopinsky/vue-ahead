import React from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import Dropdown from './dropdown';
import Selection from './selection';
import styles from "./shared.css";

const wrapperClass = "react-ahead__control-wrapper";
const placeholderClass = "react-ahead__placeholder";
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

  renderPlaceholder = () => {
    if (this.props.placeholder && this.state.selection.length === 0 && !this.state.value) {
      const styleClass = styles[placeholderClass] || placeholderClass;

      return (
        <div
          className={styleClass}
        >
          {this.props.placeholder}
        </div>
      );
    }

    return null;
  };

  render() {
    const styleClass = styles[wrapperClass] || wrapperClass;
    const inputStyleClass = styles[inputWrapperClass] || inputWrapperClass;

    return (
      <div
        className={this.props.className + " " + styleClass}
        onFocus={this.handleGetFocus}
        onBlur={this.handleLoseFocus}
      >
        <div 
          className={inputStyleClass}
          onClick={this.handleFocusMove}
        >
          {this.renderPlaceholder()}
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
        <Dropdown 
          options={this.props.options}
          cursorIndex={this.state.cursorIndex}
          onSelection={this.handleSelectionChoice}
        />
      </div>
    );
  }
}