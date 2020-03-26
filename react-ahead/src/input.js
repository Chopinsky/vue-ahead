import React from "react";
import PropTypes from "prop-types";
import styles from "./shared.css";

const inputClass = "react-ahead__input-inner-wrapper";

export default class Input extends React.Component {
  static propTypes = {
    onEntryChange: PropTypes.func,
    onSelectionMove: PropTypes.func,
    value: PropTypes.value,
  };

  state = {
    width: 0,
  }

  constructor(props) {
    super(props);

    this._div = React.createRef();
    this._input = React.createRef();

    this._inputStyle = styles[inputClass] || inputClass;
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    // if (prevProps.value !== this.props.value) {
    //   if (this._div && this._div.current) {
    //     this._div.current.innerText = val;
    //     width = this._div.current.offsetWidth;
    //   }
    // }
  }

  focus = () => {
    if (this._input && this._input.current) {
      this._input.current.focus();
    }
  };

  handleTextChange = (evt, forceUpdate) => {
    const val = (evt && evt.target && evt.target.value) || (forceUpdate && forceUpdate.value) || '';
    let { width } = this.state;

    if (this._div && this._div.current) {
      this._div.current.innerText = val;
      width = this._div.current.offsetWidth;
    }

    if (!forceUpdate && this.props.onEntryChange) {
      this.props.onEntryChange(evt, val);
    }

    this.setState({
      width,
    });
  };

  handleKeydown = evt => {
    if (!evt) {
      return;
    }

    const { keyCode } = evt;

    if (keyCode === 38 || keyCode === 40) {
      evt.preventDefault();

      if (typeof this.props.onSelectionMove === 'function') {
        this.props.onSelectionMove(evt, keyCode === 38 ? "up" : "down");
      }
    }

    return;
  };

  render() {
    return (
      <div
        style={{
          display: "inline-block",
        }}
        className={this._inputStyle}
      >
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
            width: `${this.state.width || 2}px`,
            outline: "none",
            border: 0
          }}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          // onBlur={evt => evt.stopPropagation()}
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
        ></div>
      </div>
    );
  }
}
