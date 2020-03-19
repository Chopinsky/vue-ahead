import React from 'react';
import Input from './input';
import Dropdown from './dropdown';
import Selection from "./selection";

export default class ReactAhead extends React.Component {
  state = {
    dropdownOpen: false,
    hasFocus: false,
    selection: []
  };

  renderPlaceholder = () => {
    if (this.props.placeholder && this.state.selection.length === 0) {
      return (
        <div className={"react-ahead__placeholder"}>
          {this.props.placeholder}
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div>
        {this.renderPlaceholder()}
        <Selection
          multiSelection={this.props.multiSelection}
          selection={this.state.selection}
        />
        <Input selection={this.state.selection[0]} />
        <Dropdown values={this.props.options} />
      </div>
    );
  }
}