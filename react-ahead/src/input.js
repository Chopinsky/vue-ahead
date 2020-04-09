import React from "react";
import PropTypes from "prop-types";

export default class Input extends React.Component {
  static propTypes = {
    inputWidth: PropTypes.number,
    onEntryChange: PropTypes.func.isRequired,
    onSpecialKey: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  static defaultProps = {
    inputWidth: 2,
    value: '',
  }

  constructor(props) {
    super(props);

    this._div = React.createRef();
    this._input = React.createRef();
  }

  focus = () => {
    this._input && this._input.current && this._input.current.focus();
  };

  blur = () => {
    this._input && this._input.current && this._input.current.blur();
  };

  clear = () => {
    let width = this.props.inputWidth;

    if (this._div && this._div.current) {
      this._div.current.innerText = '';
      width = this._div.current.offsetWidth;
    }

    return width;
  };

  handleTextChange = evt => {
    const val = evt && evt.target && evt.target.value || '';
    let width = this.props.inputWidth;

    if (this._div && this._div.current) {
      this._div.current.innerText = val;
      width = this._div.current.offsetWidth;
    }

    if (this.props.onEntryChange) {
      this.props.onEntryChange(evt, val, width);
    }
  };

  handleKeydown = evt => {
    if (!evt) {
      return;
    }

    const { keyCode } = evt;

    // console.log('key pressed:', keyCode);
    
    switch (keyCode) {
      case 8:
        // backspace
        if (this.props.value === '') {
          this.props.onSpecialKey('backspace');
        }

        break;

      case 9:
        // tab
        if (!evt.shiftKey) {
          this.props.onSpecialKey('tab');    
        }

        break;

      case 13:
        // enter: selection
        evt.preventDefault();
        this.props.onSpecialKey('enter');  

        break;

      case 27:
        // esc
        evt.preventDefault();
        this.props.onSpecialKey('esc'); 
        
      case 38:
        // arrow up
      case 40:
        // arrow down
        evt.preventDefault();
        this.props.onSpecialKey(keyCode === 38 ? 'up' : 'down');

        break;
    
      default:
        break;
    }
  };

  render() {
    return (
      <div style={{ display: "inline-block", }}>
        <input
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          type="text"
          ref={this._input}
          style={{
            boxSizing: "content-box",
            color: "inherit",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            minWidth: "1px",
            marginTop: "2px",
            width: `${this.props.inputWidth || 2}px`,
            outline: "none",
            border: 0
          }}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          value={this.props.value}
        />
        <div
          ref={this._div}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            visibility: "hidden",
            height: "0px",
            width: "min-content",
            overflow: "auto",
            whiteSpace: "pre",
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontStyle: "normal",
            letterSpacing: "normal",
            textTransform: "none"
          }}
        >
        </div>
      </div>
    );
  }
}
