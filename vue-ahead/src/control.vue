<template>
  <div class="control_container">
		<Shield 
			v-bind:on="shield" 
			@click="handleShieldClick" 
		/>
		<Input 
			ref="inputControl"
			:placeholder="placeholder"
			:isMulti="isMulti"
			:selection="selection"
			:value="value"
			@change="handleInputChange"
			@mousedown="handleInputClick"
			@focus="handleFocus"
			@blur="handleInputBlur"
			@icon-event="handleIconEvent"
			@special-key="handleSpecialKey"
		/>
		<Dropdown
			v-if="open"
			:open="open"
			@click="handleDropdownClick"
		/>
  </div>
</template>

<script>
import Shield from './components/shield.vue';
import Input from './components/input.vue';
import Dropdown from './components/dropdown.vue';

const focusStatus = {
	None: 0,
	Input: 1,
	Container: 2,
	Icon: 3,
	Dropdown: 4,
	Shield: 5,
};

export default {
	inheritAttrs: false,
	name: "VueAhead",
	components: {
		Shield,
		Input,
		Dropdown,
	},
	props: {
		initOptions: Array,
		isMulti: Boolean,
		placeholder: String,
	},
	data() {
		this._initDropdownOpen = false;

		return {
			focusStatus: focusStatus.None,
			open: false,
			selection: [{ label: 'ab' }, { label: 'cd' }],
			shield: false,
			shieldDisplay: "none",
			value: '',
		};
	},
	methods: {
		focusInput: function (dropdownState = null) {
			setTimeout(() => {
				// console.log('moving focus to the input, before:', this.focusStatus);

				if (this.focusStatus !== focusStatus.Input) {
					this.$refs.inputControl.focus();
					this.open = dropdownState === null ? true : dropdownState;
				}

				this.focusStatus = focusStatus.Input;
			}, 0);
		},
		focuseReset: function () {
			this.focusStatus = focusStatus.None;
			this.open = false;
			this.value = '';
		},
		handleFocus: function (evt, targetType) {
			this.open = true;
			this.focusStatus = targetType === "input" ? focusStatus.Input : focusStatus.Icon;

			// console.log('control get focus ... ', this.focusStatus, targetType);
		},
		handleShieldClick: function (evt) {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();
			
			// console.log("shield clicked ... ", evt);
		},
		handleInputClick: function (evt) {
			this.focusStatus = focusStatus.Container;
			this.focusInput();

			// console.log('input clicked ...', evt);
		},
		handleIconEvent: function (evt, type) {
			// handle icon's click event, this event will NOT be bubbled up and thus
			// we need to work on state setups we should do from the 
			// 'handleInputClick' handler.
			this.focusStatus = focusStatus.Container;

			switch (type) {
				case "clear":
					this.value = '';

					//todo: reset the options

					break;

				case "dropdown":
					this.open = !this.open;

					break;
			
				default:
					break;
			}

			// if the dropdown icon is clicked, toggle the dropdown menu, otherwise,
			// keep it open.
			this.focusInput(type === "dropdown" ? this.open : null);
		},
		handleInputBlur: function (evt, force) {
			// console.log('blur?', this.focusStatus);

			if (this.focusStatus <= focusStatus.Input || force) {
				this.focuseReset();
			}
		},
		handleInputChange: function (evt, value) {
			this.value = value;
		},
		handleDropdownClick: function (evt) {
			this.focusStatus = focusStatus.Dropdown;
			this.focusInput();

			// console.log('dropdown clicked ...', evt);
		},
		handleSpecialKey: function (key) {
			// console.log('getting special key: ', key);

			switch (key) {
				case 'tab':
					this.focusStatus = focusStatus.Icon;
					break;

				case 'tab-out':
					this.focuseReset();
					break;
			
				default:
					break;
			}
		},
	},
	computed: {
	},
};
</script>

<style scoped>
.control_container {  
	position: relative;
  box-sizing: border-box;
}

.control_wrapper {	
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding-left: 6px;
  padding-right: 2px;
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

.control_active {
  border: 1px solid blue;
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
</style>