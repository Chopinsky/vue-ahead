import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Engine from './engine';
import Input from './input';
import Dropdown from './dropdown';
import Placeholder from './placeholder';
import MultiSelection from './selection';
import ActionIcons from './actionIcons';
import { getItemLabel } from './utils';
import styles from "./shared.css";

const containerClass = "react-ahead__control-container";
const wrapperClass = "react-ahead__control-wrapper";
const activeClass = "react-ahead__control-active";
const inputWrapperClass = "react-ahead__input-wrapper";

const classNames = {
  container: styles[containerClass] || containerClass,
  wrapper: styles[wrapperClass] || wrapperClass,
  active: styles[activeClass] || activeClass,
  inputWrapper: styles[inputWrapperClass] || inputWrapperClass,
};

/**
 * The React UI for the auto-complete control
 */
export default class ReactAhead extends React.Component {
  static propTypes = {
    /**
     * An object containing the custom class names that we shall apply for 
     * each component of the control. Avaliable fields are: 
     * - `input`: for the input control
     * - `active`: for the input control but applied when the control has focus
     * - `dropdown`: for the dropdown menu
     * 
     * Example:
     * <ReactAhead
     *   customClassNames={{
     *     active: "app-control-active",
     *     input: "app-control-input",
     *     dropdown: "app-control-dropdown",
     *   }}
     * />
     */
    customClassNames: PropTypes.object,

    /**
     * The index number of the option that shall be treated as the default value
     * to the control.
     */
    defaultSelection: PropTypes.number,

    /**
     * A callback function for generating display text for options and values. 
     * 
     * If supplied, it will be invoked on the following occasions to generate 
     * a customizable text (or React component) that shall be used as the 
     * display content to the end user:
     * 
     * a) when rendering options in the dropdown menu;
     * b) when a selection has been made;
     * 
     * The function takes 2 parameters:
     * 1) `source` -- the default source value from the item definition
     * 2) `item`   -- the item (either string, number, or object, whichever provided
     *                by the `initOption` or fetched from remote) that to be 
     *                rendered.
     * 3) `type`   -- enumerate, possible values: 'selection' or 'option', the former 
     *                indeicates that the rendered content will be for the selected
     *                item, while the later denotes to the items to be rendered in 
     *                the dropdown options menu.
     */
    displayFormatter: PropTypes.func,

    /**
     * Indicate if we shall display options in the dropdown menu in the grouped
     * mode. Requires `options` data to contain the `group` property.
     */
    grouped: PropTypes.bool,

    /**
     * Indicate if we allow user created options to appear and selectable
     */
    isCreateable: PropTypes.bool,

    /**
     * Indicate if we allow mulitple value selections for the control
     */
    isMulti: PropTypes.bool,

    /**
     * An array of the options to be displayed as the initial values. You must provide
     * either `initOptions`, or the remote option such that we can fetch the options
     * from the remote server
     */
    initOptions: PropTypes.arrayOf(PropTypes.object),

    /**
     * Callback function which will be invoked when a selection change has been made,
     * it can be either an addition or deletion.
     */
    onSelectionChange: PropTypes.func,

    /**
     * An object containing the necessary information to contact a remote server for
     * options. TODO: more info ...
     */
    remote: PropTypes.object,

    /**
     * Callback function which will decide the order of the options to be displayed
     * in the dropdown menu
     */
    sort: PropTypes.func,
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
    inputWidth: 2,
    options: [],
    selection: [],
    shield: false,
    value: '',
  };

  constructor(props) {
    super(props);

    this._input = React.createRef();
    this._dropdown = React.createRef();

    this._focusType = 0;
    this._lastDispVal = null;
    this._lastSearch = null;
    this._initDropdownState = false;
    this._selKeys = {};

    this._engine = new Engine({ remote: props.remote });

    if (Array.isArray(props.initOptions) && props.initOptions.length > 0) {
      let options = 
        !props.grouped ? props.initOptions : this.groupOptions(props.initOptions);

      if (props.sort) {
        options = props.sort(options);
      }
      
      this.state.options = options;
      this._engine.add(this.state.options);
    }
  }

  componentDidMount() {
    if (this.props.remote && this.props.remote.prefetch) {
      this.props.remote.prefetch(
        options => this.findOptionsCallback(options, '')
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.grouped !== this.props.grouped && this.props.grouped) {
      let { options } = this.state;

      this.setState({
        options: this.groupOptions(options),
      });
    }

    if (prevProps.remote !== this.props.remote) {
      this._engine.setOption('remote', remote);

      if (this.props.remote && this.props.remote.prefetch) {
        this.props.remote.prefetch(
          options => this.findOptionsCallback(options, '')
        );
      }
    }
  }

  getSelection = () => {
    return this.state.selection;
  };

  groupOptions = options => {
    if (!Array.isArray(options) || !options.length) {
      return options || [];
    }

    options.sort((a, b) => {
      let ag = a['group'];
      let bg = b['group'];

      if (ag === bg) {
        return 0;
      }

      if (ag === null || ag === undefined) {
        return -1;
      }

      if (bg === null || bg === undefined) {
        return 1;
      }

      if (typeof ag !== 'string') {
        ag = ag.toString();
      }

      if (typeof bg !== 'string') {
        bg = bg.toString();
      }

      if (ag < bg) {
        return -1;
      }

      return 1;
    });

    return options;
  }

  getOptions = (options = [], selection, group) => {
    if (!selection) {
      selection = this.state.selection;
    }

    if (options.length === 0) {
      return options;
    }

    if (this.props.sort) {
      options = this.props.sort(options);
    }

    if (group) {
      options = this.groupOptions(options);
    }

    if (!selection || !selection.length) {
      return options;
    }

    return options.filter(item => {
      return !this._selKeys.hasOwnProperty(getItemLabel(item));
    });
  };

  getOptionsSource = () => {
    return !this.props.remote ? this.props.initOptions : this._lastSearch;
  };

  findOptionsCallback = (options, value) => {
    if (this.props.grouped) {
      options = this.groupOptions(options);
    }

    // cache the original search results, before being filtered
    this._lastSearch = options;

    // filter: against current selections, and since we've alraedy
    //         handled the grouping use case, always set group parameter 
    //         to false.
    options = this.getOptions(options, this.state.selection, false);

    this._lastDispVal = {
      value,
      options,
    };

    this.setState({
      options,
      shield: false,
    });
  };

  moveCursor = side => {
    if (!this.state.dropdownOpen || !side) {
      return;
    }

    this._dropdown
      && this._dropdown.current
      && this._dropdown.current.handleCursorMove(side);
  };

  handleEntryChanged = (_evt, value, width) => {
    // console.log('entry change???', value);

    if (typeof value !== 'string') {
      value = value.toString();
    }

    if (value === this.state.value) {
      // nothing has changed
      if (this.state.shield) {
        this.setState({ shield: false });
      }

      return;
    }

    value = value.trimStart();

    let state = {
      dropdownOpen: true,
      inputWidth: width,
      shield: true,
      value,
    };

    if (value !== '') {
      this._engine.find(
        value.trimEnd(), 
        !!this.props.remote, 
        options => this.findOptionsCallback(options, value)
      );      
    } else {
      state['options'] = 
        this.getOptions(this.props.initOptions, null, this.props.grouped);
      
      this._lastDispVal = {
        value,
        options: state['options'],
      };

      state['shield'] = false;
    }

    this.setState(state);
  };

  handleKeepFocus = evt => {
    this._focusType = 2;
    this._initDropdownState = this.state.dropdownOpen;
  };

  handleControlFocus = evt => {
    // console.log('focus input ...');
    this._input && this._input.current && this._input.current.focus();
  };

  handleKeyAction = (key, info) => {
    switch (key) {
      case 'enter':
        this._dropdown 
        && this._dropdown.current
        && this._dropdown.current.select();
        
        break;

      case 'tab':
        this._focusType = 4;
        break;

      case 'up':
      case 'down':
        this.moveCursor(key);
        break;

      case 'move':
        this.handleControlFocus();

        if (this.state.dropdownOpen) {
          // only respect the cursor move if the dropdown is still open
          setTimeout(() => this.moveCursor(info), 0)          
        }

        break;

      case 'esc':
        this.setState({
          dropdownOpen: false,
        });

        break;

      case 'backspace':
        if (this.props.isMulti && this.state.selection.length > 0) {
          this.handleSelectionRemoval(null, this.state.selection.length - 1, true);
        }

        break;
    
      default:
        break;
    }
  };

  handleGetFocus = evt => {
    // console.log('get focus ... ', this._focusType);

    switch (this._focusType) {
      case 0:
      case 2:
        this._focusType = 1;
        let value, options = this.state.options;

        if (this._lastDispVal) {
          value = this._lastDispVal['value'];
          options = this._lastDispVal['options'];
        }

        this.setState({
          value,
          options,
          dropdownOpen: true,  // open with full values
        });
        
        break;

      case 1:
        // really losing focus
        this.setState({
          dropdownOpen: true,  // open with full values
        });

        return;

      case 3:
      case 4:
        //reset focus only
        this._focusType = 1;
        return;

      default:
        break;
    }
  };

  handleLoseFocus = evt => {
    // console.log('lose focus ... ', this._focusType);

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

      case 4:
        // moving focus between sub-components
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

  handleSelectionAddition = (evt, source, item) => {
    if (!source || this._selKeys.hasOwnProperty(source)) {
      return;
    }

    let { selection } = this.state;
    this._lastDispVal = null;

    if (
      this.props.isCreateable 
      && item['__itemType'] === 'created' 
      && this.props.onItemCreated
    ) {
      // adding any extra information to the created item
      item = Object.assign(item, this.props.onItemCreated(source));

      // maintain the 'source' property
      if (item['source'] !== source) {
        item['source'] = source;
      }
    }

    // add the selection to the list
    if (this.props.isMulti) {
      selection.push(item);
      this._selKeys[source] = null;
    } else {
      selection = [item];

      this._selKeys = {};
      this._selKeys[source] = null;
    }

    // set focus type to prepare for transferring the focus
    this._focusType = 1;
    this.handleControlFocus(evt);

    const optionsSource = this.getOptionsSource();
    this.setState({
      options: this.getOptions(optionsSource, selection, this.props.grouped),
      selection,
      value: '',
    });

    // acknowledge the selection change
    this.props.onSelectionChange && this.props.onSelectionChange(selection);
  };

  handleSelectionRemoval = (_evt, idx, inPlaceRemoval) => {
    if (!this.props.isMulti) {
      return;
    }

    let { selection, options, value } = this.state;
    if (!selection || idx >= selection.length) {
      return;
    }

    let [ item ] = selection.splice(idx, 1);
    delete this._selKeys[getItemLabel(item)];

    if (value !== '') {
      // rerun the value
      options = this.getOptions(this._lastSearch || [], selection);
    } else {
      options = this.getOptions(this.props.initOptions, selection, this.props.grouped);
    }

    // update stores
    if (!inPlaceRemoval) {
      this._focusType = 4;      
    }

    this._lastDispVal = {
      value,
      options,
    };

    // update state
    this.setState({
      selection,
      options,
    });

    // acknowledge the selection change
    this.props.onSelectionChange && this.props.onSelectionChange(selection);
  };

  handleClear = () => {
    this._focusType = 2;
    this._lastSearch = null;
    this._lastDispVal = null;
    this._selKeys = {};

    let state = {
      value: '',
      selection: [],
      inputWidth: this.state.inputWidth,
    };

    if (this.props.remote && this.props.remote.prefetch) {
      // pushing the prefetch to the back of the event loop so we 
      // won't run into the 'locked-out-shield', because prefetch may
      // not always be an async IO, and it could return immediately, hence
      // lower the shield first, before the shield state is set at the end
      // of this function call.
      setTimeout(() => {
        this.props.remote.prefetch(
          options => this.findOptionsCallback(options, '')
        );        
      }, 0);

      // running prefetch, bring up the shield
      state['shield'] = true;
    } else {
      // using default options in the dropdown menu after clearing the selections
      state['options'] = this.getOptions(this.props.initOptions, null, this.props.grouped);
    }

    if (this.state.value !== '') {
      state.inputWidth = 
        this._input
        && this._input.current
        && this._input.current.clear();
    }

    this.handleControlFocus();
    
    this._dropdown
    && this._dropdown.current
    && this._dropdown.current.resetCursor();

    this.setState(state);
  };

  handleDropdownOpen = force => {
    // console.log('drop down action:', force, this._initDropdownState);

    if (force) {
      // only happens when clicking / typing on the dropdown menu button
      const { dropdownOpen } = this.state;

      this.setState({
        dropdownOpen: !dropdownOpen,
      });

      return;
    }

    if (this._initDropdownState) {
      let { value, options } = this.state;

      setTimeout(() => {
        this._lastDispVal = {
          value,
          options,
        };

        this.setState({
          value: '',
          dropdownOpen: false,
        });
      }, 0);
    }
  };

  handleShieldClick = evt => {
    evt && evt.preventDefault();

    this._focusType = 4;
    this.handleControlFocus();
  }

  handleLoadMore = () => {
    //todo: if there are more to load for the options, communicate with the remote
    //      to do so
  };

  renderInput = () => {
    const {
      displayFormatter,
      isMulti,
      placeholder,
    } = this.props;

    const {
      selection,
      inputWidth,
      value,
    } = this.state;

    const singleSelDone = !isMulti && selection.length === 1;
    
    let text;
    if (singleSelDone) {
      text = getItemLabel(selection[0]);

      if (displayFormatter) {
        text = displayFormatter(text, selection[0], 'selection');
      }
    } else {
      text = placeholder;
    }

    return (
      <div className={classNames.inputWrapper}>
        <Placeholder 
          show={
            (placeholder && selection.length === 0 && !value)
            || (singleSelDone && !value)
          }
          text={text}
          valueDisplayMode={singleSelDone}
        />
        {
          isMulti
            ?
            <MultiSelection
              selection={selection}
              onSelectionRemoval={this.handleSelectionRemoval}
            />
            :
            null
        }
        <Input
          inputWidth={inputWidth}
          ref={this._input}
          onEntryChange={this.handleEntryChanged}
          onSpecialKey={this.handleKeyAction}
          value={value}
        />
      </div>
    );
  };

  render() {
    const {
      className,
      customClassNames,
      defaultSelection,
      displayFormatter,
      grouped,
      isCreateable,
    } = this.props;

    const {
      dropdownOpen,
      shield,
      value,
    } = this.state;

    let options;
    if (isCreateable && this.state.value) {
      options = [...this.state.options];

      // don't add the createable if there're exact matches
      let exactMatch = false;
      for (let i = 0; i < options.length; i++) {
        const label = getItemLabel(options[i]);
        if (this.state.value === label) {
          exactMatch = true;
          break; 
        }
      }

      if (!exactMatch) {
        options.push({ 
          source: `Create ${this.state.value}`,
          __itemType: 'created',
          __createdValue: this.state.value,
        });
      }
    } else {
      options = this.state.options || [];
    }

    let wrapperClassName = (className || '') + " " + classNames.container;
    let inputClassName = (customClassNames.input || '') + " " + classNames.wrapper;

    if (this._focusType !== 0) {
      inputClassName = (customClassNames.active || classNames.active) + " " + inputClassName;
    }

    return (
      <div 
        className={wrapperClassName}
        onMouseDown={this.handleKeepFocus}
      >
        <div 
          style={{
            display: shield ? 'default' : 'none',
            width: '100%',
            height: '100%',
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100000,
          }}
          onClick={this.handleShieldClick}
        >
        </div>
        <div
          className={inputClassName}
          onClick={this.handleControlFocus}
          onFocus={this.handleGetFocus}
          onBlur={this.handleLoseFocus}
        >
          {this.renderInput()}
          <ActionIcons
            onClear={this.handleClear}
            onDropdown={this.handleDropdownOpen}
            onSpecialKey={this.handleKeyAction}
          />
        </div>
        <Dropdown
          ref={this._dropdown}
          className={customClassNames.dropdown}
          defaultSelection={defaultSelection}
          display={displayFormatter}
          grouped={grouped}
          open={dropdownOpen}
          options={options}
          onSelection={this.handleSelectionAddition}
          onLoadMore={this.handleLoadMore}
          onShieldClick={this.handleShieldClick}
          shield={shield}
          showRemoteMessage={!!this.props.remote && !value}
        />
      </div>
    );
  }
}