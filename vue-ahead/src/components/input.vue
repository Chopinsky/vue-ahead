<template>
<div 
  class="control_wrapper" 
  @mousedown.stop="$emit('mousedown', $event)"
  @focus.capture="handleFocus"
  @blur.capture="$emit('blur', $event)"
>

  <div class="input_container">

    <div 
      v-if="phText !== ''"
      :class="classes.placeholder"
    >
      {{ phText }}
    </div>

    <div v-if="isMulti && selection.length > 0">
      <div
        v-for="(item, index) in selection" 
        :key="getSelectionKey(item, index)"
      >
        <SelectionItem 
          :item="item"
          :index="index"
        />
      </div>
    </div>

    <div style="display: 'inline-block';">

      <input           
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        type="text" 
        ref="input"
        :value="value"
        :style="styles.input"
        @keydown="handleKeydown"
        @input="handleInput"
      />

      <div 
        ref="contentHolder"
        :style="styles.container"
      >
      </div>

    </div>

  </div>

  <div class="icons_container">
    <ControlIcon 
      class="action_icon"
      :path="path.clear"
      @mousedown.native.stop="$emit('icon-event', $event, 'clear')"
      @keydown.stop="handleIconKeydown($event, 'clear')"
    />
    <span class="action_icon_separator"></span>
    <ControlIcon
      class="action_icon" 
      :path="path.dropdown"
      @mousedown.native.stop="$emit('icon-event', $event, 'dropdown')"
      @keydown.stop="handleIconKeydown($event, 'dropdown')"
    />
  </div>

</div>
</template>

<script>
import SelectionItem from './selectionItem.vue';
import ControlIcon from './controlIcon.vue';
import { getItemLabel, getDisplay } from '../helpers/utils';

const inputStyle = {
  boxSizing: "content-box",
  color: "inherit",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  minWidth: "1px",
  marginTop: "2px",
  width: "2px",
  outline: "none",
  border: 0,
};

const contentHolderStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  visibility: "hidden",
  height: "0",
  width: "min-content",
  overflow: "auto",
  whiteSpace: "pre",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  fontStyle: "normal",
  letterSpacing: "normal",
  textTransform: "none",
};

const clearIconPath = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";
const dropdownIconPath = "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z";

export default {
  props: {
    display: Function,
    isMulti: Boolean,
    placeholder: {
      type: String,
      default: '',
    },
    selection: { 
      type: Array,
      default: [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    ControlIcon,
    SelectionItem,
  },
  data: function () {
    let placeholder, phText;

    if (!this.isMulti && this.selection.length === 1) {
      placeholder = "placeholder placeholder_values";
      phText = getDisplay(this.selection[0], this.display, 'selection');
    } else {
      placeholder = "placeholder";
      phText = this.placeholder || '';
    }

    return {
      styles: {
        container: contentHolderStyle,
        input: Object.assign({}, inputStyle),
      },
      classes: {
        placeholder,
      },
      path: {
        clear: clearIconPath,
        dropdown: dropdownIconPath,
      },
      width: 2,
      phText,
    }
  },
  methods: {
    clear: function () {
      this.$refs.contentHolder.innerText = '';
      this.styles.input.width = "2px";
    },
    focus: function () {
      this.$refs.input.focus();
    },
    getSelectionKey: function (item, index) {
      return index.toString() + '#' + getItemLabel(item).substr(0, 5);
    },
    handleFocus: function (evt) {
      // check if it's the icons that get the focus
      let focusInput = evt && evt.target && evt.target.nodeName === "INPUT";

      // bubble up the icon focus information
      this.$emit('focus', evt, focusInput ? 'input' : 'icon');
    },
    handleInput: function (evt) {
      const val = evt && evt.target && evt.target.value || '';

      this.$refs.contentHolder.innerText = val;
      this.styles.input.width = `${this.$refs.contentHolder.offsetWidth + 2}px`;

      this.$emit('change', evt, val);
    },
    handleKeydown: function (evt) {
      if (!evt) {
        return;
      }

      const keyCode = evt.keyCode || 0;

      // console.log('key pressed:', keyCode, evt);
      
      switch (keyCode) {
        case 8:
          // backspace
          if (this.value === '') {
            this.$emit('special-key', 'backspace');
          }

          break;

        case 9:
          // tab
          if (!evt.shiftKey) {
            this.$emit('special-key', 'tab');
          }

          break;

        case 13:
          // enter: selection
          evt.preventDefault();
          this.$emit('special-key', 'enter');

          break;

        case 27:
          // esc
          evt.preventDefault();
          this.$emit('special-key', 'esc');

          break;          
          
        case 38:
          // arrow up
        case 40:
          // arrow down
          evt.preventDefault();
          this.$emit('special-key', keyCode === 38 ? 'up' : 'down');

          break;
      
        default:
          break;
      }
    },
    handleDropdown: function (evt) {
      
      this.$emit('icon-event', evt, 'dropdown');
    },
    handleIconKeydown: function (evt, type) {
      const {keyCode} = evt;

      switch (keyCode) {
        case 13:
          // space
        case 32:
          // enter

          break;

        case 38:
          // up
        case 40:
          // down

          break;
      
        case 9:
          // tab
          if (type === 'dropdown' && !evt.shiftKey) {
            this.$emit('special-key', 'tab-out')
          }

          break;

        default:
          break;
      }
    },
  },
  watch: {
    value: function () {
      if (this.value === '') {
        // reset the input control width
        this.clear();

        // update the display style and/or content
        if (!isMulti && this.selection.length === 1) {
          this.classes.placeholder = "placeholder placeholder_values";
          this.phText = getDisplay(this.selection[0], this.display, 'selection');
        } else {
          this.classes.placeholder = "placeholder";
          this.phText = this.placeholder || '';
        }
      } else if (this.phText) {
        // reset the placeholder text
        this.phText = '';
      }
    },
  }
}
</script>

<style scoped>
.control_wrapper {	
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding-left: 6px;
  padding-right: 4px;
  min-height: 38px;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  border: 1px solid rgb(204, 204, 204);
  cursor: default;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: all 100ms ease 0s;
  outline: 0px !important;
}

.input_container {
  padding: 2px;
  color: rgb(51, 51, 51);
  position: relative;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow: hidden;
  visibility: visible;
  box-sizing: border-box;
  width: 100%;
}

.placeholder {
  position: absolute;
  top: 50%;
  color: rgb(128, 128, 128);
  margin: 0;
  padding: 2px 2px 0 2px;
  transform: translateY(-50%);
  box-sizing: border-box;
}

.placeholder.placeholder_values {
  color: inherit;
}

.icons_container {
  -webkit-box-align: center;
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
}

.action_icon {
  color: rgb(204, 204, 204);
  display: flex;
  box-sizing: border-box;
  padding: 10px 6px;
  transition: color 150ms ease 0s;
}

.action_icon:hover {
  cursor: pointer;
  color: rgb(153, 153, 153);
}

.action_icon:active {
  outline: none !important;
  color: rgb(92, 92, 92);
}

.action_icon:focus {
  color: rgb(153, 153, 153);
  outline: 2px dotted gray;
}

.action_icon_separator {
  align-self: stretch;
  background-color: rgb(204, 204, 204);
  margin-bottom: 8px;
  margin-top: 8px;
  width: 1px;
  box-sizing: border-box;
}
</style>