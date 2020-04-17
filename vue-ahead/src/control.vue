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
		@dblclick="handleDbClick"
		@change="handleInputChange"
		@blur="handleInputBlur"
		@focus="handleFocus"
		@mousedown="handleInputClick"
		@icon-event="handleIconEvent"
		@special-key="handleSpecialKey"
		@item-removal="handleItemRemoval"
	/>
	<Dropdown
		v-if="open"
		ref="dropdownControl"
		:className="(customClassName && customClassName.dropdown) || ''"
		:open="open"
		:options="options"
		:isRemoteInit="remote && value === ''"
		:itemRenderer="itemRenderer"
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
import Engine from './helpers/engine';

const focusStatus = {
	None: 0,
	Input: 1,
	Icon: 2,
	Container: 3,
	Dropdown: 4,
	Shield: 5,
	Pending: -1,
};

const debounceTimeout = 120;

export default {
	inheritAttrs: false,
	name: "VueAhead",
	components: {
		Shield,
		Input,
		Dropdown,
	},
	beforeMount: function () {
	},
	beforeDestroy: function () {
		//todo: send any remainder data to remote, if configured
	},
	props: {
		customClassName: Object,
		initOptions: Array,
		initSelections: Array,
		isMulti: Boolean,
		itemRenderer: {
			type: Object,
			default: null,
		},
		placeholder: String,
		remote: Object,
	},
	data() {
		const { source, initState } = this.init();

		this._engine = new Engine({ remote: this.remote || null });
		this._engine.add(source);
		
		this._shieldId = null;
		this._debounceId = null;

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
		init: function () {
			let source = [];
			let initState = null;

			if (this.remote) {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch);
				}
			} else {
				source = this.prepareOptions(this.initOptions);
				if (this.initSelections && this.initSelections.length > 0) {
					initState = this.prepareInitState(source);
				}
			}

			return { source, initState, };
		},
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
			this.resetOptions();
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
		resetOptions: function () {
			if (this.remote) {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}
			} else {
				this.options = this.getOptions();
			}
		},
		getOptions: function (source) {
			
			if (!source) {
				source = this.source;
			}

			const { indices } = this.selection || {};
			if (!indices) {
				return source;
			}

			// console.log('filtering:', indices, source);

			return source.filter(item => !hasProperty(indices, item.key));
		},
		prepareOptions: function (options = []) {
			const keys = {};

			const result = 
				options
					.filter(item => item !== null && item !== undefined)
					.map((item, idx) => {
						if (!hasProperty(item, 'key')) {
							item['key'] = idx.toString() + "#" + randomSuffix();
						}

						let key = item['key'];
						if (typeof key !== 'string') {							
							key = (key === null || key === undefined) 
								? randomSuffix()
								: key.toString();
						}

						while (hasProperty(keys, key)) {
							key += randomSuffix();
						}

						item['key'] = key;
						keys[key] = null;

						let label = item['label'];
						if (typeof label !== 'string') {				
							label = (label === null || label === undefined) 
								? ''
								: label.toString();
						}

						item['label'] = label;

						return item;
					});

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
		clear: function () {
			this.selection = {
				items: [],
				indices: {},
			};

			this.value = '';

			if (!this.remote) {
				this.options = this.getOptions();				
			} else {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}
			}
		},
		reset: function () {
			const { source, initState } = this.init();

			this.value = '';

			this.options = 
				initState ? initState.options : source;

			this.selection = 
				initState ? initState.selection : { items: [], indices: {}, } ;
		},
		runPrefetcher: function (prefetcher) {
			prefetcher(data => {
				setTimeout(() => {
					this.source = this.prepareOptions(data);
					this.options = this.getOptions();
				}, 0);
			});
		},
		shieldAction: function (up) {
			if (this._shieldId) {
				clearTimeout(this._shieldId);
			}

			if (up) {
				this._shieldId = setTimeout(() => {
					this.shield = true;
				}, 50);
			} else {
				this._shieldId = null;
				this.shield = false;
			}
		},
		handleFocus: function (evt, targetType) {
			this.focusStatus = targetType === "input" ? focusStatus.Input : focusStatus.Icon;

			if (this.focusStatus === focusStatus.Input) {
				this.open = true;
			}

			// console.log('control get focus ... ', this.focusStatus, targetType);
		},
		handleShieldClick: function (evt) {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();
			
			// console.log("shield clicked ... ", evt);
		},
		handleDbClick: function (evt) {
			// console.log('double click');

			setTimeout(() => {
				this.$refs.inputControl.select();
			}, 0);
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
					this.clear();
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

			if (value === '') {
				this.resetOptions();
				return;
			}

			this.shieldAction(true);

			if (this._debounceId) {
				clearTimeout(this._debounceId);
			}

			this._debounceId = setTimeout(() => {
				this._engine.query(value, (data = []) => {
					console.log(data);

					// for remote search, the source change every time on a search
					// term, hence we need to update the source all the time
					if (this.remote) {
						this.source = this.prepareOptions(data);
						this.options = this.getOptions();
					} else {
						this.options = this.getOptions(data);
					}
					
					this.shieldAction(false);
					this._debounceId = null;
				});
			}, debounceTimeout);
		},
		handleItemSelection: function (evt, key) {
			// console.log('item selection ...', key, this.selection.indices);
			
			if (hasProperty(this.selection.indices, key)) {
				return;
			}

			let { items, indices } = this.selection;

			if (!this.isMulti) {
				items = [];
				indices = {};
			}

			for (let i = 0; i < this.options.length; i++) {
				if (this.options[i].key !== key) {
					continue;
				}
			
				items.push(this.options[i]);
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

			this.options = this.getOptions();

			// console.log(idx, this.selection.items, this.selection.indices);

			this.focusStatus = focusStatus.Dropdown;
			this.focusInput();
		},
		handleItemRemoval: function (evt, item) {
			// console.log('item removal: ', item);

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

			this.focusStatus = focusStatus.Icon;
			this.focusInput();
		},
		handleSpecialKey: function (key, focusInput) {
			// console.log('getting special key: ', key);

			switch (key) {
				case 'enter':
					this.$refs.dropdownControl
						&& this.$refs.dropdownControl.select();

					break;

				case 'esc':
					this.open = false;
					break;

				case 'clear':
					this.clear();
					break;

				case 'dropdown':
					this.open = !this.open;
					break;

				case 'up':
				case 'down':
					if (!this.open) {
						this.open = true;
					} else {
						this.$refs.dropdownControl
							&& this.$refs.dropdownControl.move(key);
					}

					break;

				case 'tab':
					this.focusStatus = focusStatus.Icon;
					break;

				case 'tab-out':
					this.focuseReset();
					break;
			
				default:
					break;
			}

			if (focusInput) {
				this.focusInput();
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