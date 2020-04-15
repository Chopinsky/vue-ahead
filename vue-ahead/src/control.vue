<template>
<div :class="className">
	<Shield 
		:on="shield" 
		@mousedown.capture.stop="handleShieldClick" 
	/>
	<Input 
		ref="inputControl"
		:active="focusStatus !== 0"
		:customClassName="customClassName"
		:isMulti="isMulti"
		:placeholder="placeholder"
		:selection="selection.items"
		:value="value"
		@change="handleInputChange"
		@mousedown="handleInputClick"
		@focus="handleFocus"
		@blur="handleInputBlur"
		@icon-event="handleIconEvent"
		@special-key="handleSpecialKey"
		@item-removal="handleItemRemoval"
	/>
	<Dropdown
		v-if="open"
		:className="(customClassName && customClassName.dropdown) || ''"
		:open="open"
		:options="options"
		:shield="shield"
		@item-selection="handleItemSelection"
	/>
</div>
</template>

<script>
import Shield from './components/shield.vue';
import Input from './components/input.vue';
import Dropdown from './components/dropdown.vue';
import { hasProperty, randomSuffix } from './helpers/common';

const focusStatus = {
	None: 0,
	Input: 1,
	Icon: 2,
	Container: 3,
	Dropdown: 4,
	Shield: 5,
	Pending: -1,
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
		customClassName: Object,
		initOptions: Array,
		initSelections: Array,
		isMulti: Boolean,
		placeholder: String,
	},
	data() {
		let initState = null;
		const source = this.prepareOptions(this.initOptions);

		if (this.initSelections && this.initSelections.length > 0) {
			initState = this.prepareInitState(source);
		}

		return {
			className: this.getClassName(),
			focusStatus: focusStatus.None,
			open: false,
			options: initState ? initState.options : source,
			selection: initState ? initState.selection : { items: [], indices: {}, },
			source,
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
		getClassName: function () {
			let className = "control_container";

			if (this.class) {
				className += " " + this.class;
			}

			if (this.customClassName && this.customClassName.control) {
				className += " " + this.customClassName.control;
			}

			return className;
		},
		getOptions: function () {
			return this.source;
		},
		prepareOptions: function (options = []) {
			const keys = {};

			const result = 
				options
					.filter(item => item !== null && item !== undefined)
					.map((item, idx) => {
						if (!hasProperty(item, 'key')) {
							item['key'] = idx.toString();
						}

						let key = item['key'];
						if (typeof key !== 'string') {							
							if (key === null || key === undefined) {
								key = randomSuffix();
							} else {
								key = key.toString();
							}
						}

						while (hasProperty(keys, key)) {
							key += randomSuffix();
						}

						item['key'] = key;
						keys[key] = null;

						return item;
					});

			// console.log('keys:', keys);

			return result || [];
		},
		prepareInitState: function (options) {
			const indices = {};

			for (let i = 0; i < this.initSelections.length; i++) {
				let key = this.initSelections[i];

				if (typeof key !== 'string') {
					key = key.toString();
				}

				indices[key] = null;

				if (!this.isMulti) {
					break;
				}
			}

			const remainder = [];
			const items = [];

			for (let i = 0; i < options.length; i++) {
				if (
					hasProperty(indices, options[i]['key']) 
					&& (this.isMulti || items.length === 0)
				) {
					items.push(options[i]);
				} else {
					remainder.push(options[i]);
				}				
			}

			return {
				options: remainder,
				selection: {
					items,
					indices,
				}
			};
		},
		reset: function () {
			this.value = '';
			this.source = this.prepareOptions(this.initOptions);

			let options = this.source;
			let selection = {
				items: [],
				indices: {},
			};

			if (this.initSelections && this.initSelections.length > 0) {
				const initState = this.prepareInitState(options);
				
				options = initState.options;
				selection = initState.selection;
			}

			this.options = options;
			this.selection = selection;
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

					//todo: reset the options with the remote

					this.selection = {
						items: [],
						indices: {},
					};

					this.options = this.getOptions();

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

			if (this.focusStatus <= focusStatus.Icon || force) {
				this.focusStatus = focusStatus.Pending;

				setTimeout(() => {
					// if some other control has grabbed the focus, we're done
					if (this.focusStatus !== focusStatus.Pending) {
						return;
					}

					this.focuseReset();
				}, 0);				
			}
		},
		handleInputChange: function (evt, value) {
			this.value = value;
			this.open = true;
		},
		handleItemSelection: function (evt, key) {
			// console.log('dropdown clicked ...', evt);
			if (hasProperty(this.selection.indices, key)) {
				return;
			}

			const options = this.getOptions();
			let { items, indices } = this.selection;

			if (!this.isMulti) {
				items = [];
				indices = {};
			}

			for (let i = 0; i < options.length; i++) {
				if (options[i].key !== key) {
					continue;
				}
			
				items.push(options[i]);
				indices[key] = null;

				break;					
			}

			this.selection = {
				items,
				indices,
			};

			// reset the value to empty after a selection
			if (this.value !== '') {
				this.value = '';
			}

			this.options = 
				this.getOptions().filter(item => !hasProperty(indices, item.key));
			

			// console.log(idx, this.selection.items, this.selection.indices);

			this.focusStatus = focusStatus.Dropdown;
			this.focusInput();
		},
		handleItemRemoval: function (evt, item) {
			// invalid item removal
			if (!this.isMulti || !item || !item.key) {
				return;
			}

			const { key } = item;
			let { items, indices } = this.selection;
			let { options } = this;

			items = items.filter(item => item.key !== key);
			delete indices[key];

			this.selection = {
				items,
				indices,
			};

			// filter the options against the original list
			this.options = 
				this.getOptions().filter(item => !hasProperty(indices, item.key));

			// console.log(this.options);

			this.focusStatus = focusStatus.Icon;
			this.focusInput();
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
	watch: {
		class: function () {
			this.className = this.getClassName();
		},
		customClasses: function () {
			this.className = this.getClassName();
		},
		initOptions: function () {
			this.reset();
		},
		initSelections: function () {
			this.reset();
		},
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
  min-height: 32px;
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
  padding: 0 2px;
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