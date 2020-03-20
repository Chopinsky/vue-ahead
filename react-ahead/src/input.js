import React from "react";
import PropTypes from "prop-types";
import styles from "./shared.css";

const defaultClass = "react-ahead__input-wrapper";

export default class Input extends React.Component {
  static propTypes = {};

  state = {
    value: '',
    width: 0,
  }

  constructor(props) {
    super(props);

    this._div = React.createRef();
    this._input = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this._input.current.style);
    }, 100);
  }

  handleTextChange = evt => {
    const val = evt.target.value;
    let { width } = this.state;

    if (this._div && this._div.current) {
      this._div.current.innerText = val;
      width = this._div.current.offsetWidth;
    }

    this.setState({
      value: val,
      width,
    });
  };

  handleFocus = evt => {
    if (this._input && this._input.current) {
      this._input.current.focus();
    }
  };

  render() {
    return (
      <div
        tabIndex={0}
        className={styles[defaultClass] || defaultClass}
        onFocus={this.handleFocus}
      >
        <div
          style={{
            display: "inline-block",
          }}
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
              marginTop: "4px",
              width: `${this.state.width || 2}px`,
              outline: "none",
              border: 0
            }}
            onChange={this.handleTextChange}
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
      </div>
    );
  }
}
