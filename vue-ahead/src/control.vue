<template>
<div :class="className">
	<Shield
		:on="shield"
		@mousedown.capture.stop="handleShieldClick"
	/>
	<Input
		ref="inputControl"
		:active="focusStatus !== 0"
		:customClassNames="customClassNames"
		:display="display"
		:multiSelRenderer="multiSelRenderer"
		:isMulti="isMulti"
		:placeholder="placeholder"
		:selection="selection.items"
		:singleSelRenderer="singleSelRenderer"
		:theme="theme"
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
		:autoScroll="dropdownAutoScroll"
		:createable="createable"
		:customClassNames="customClassNames"
		:groups="groups"
		:highlightSource="highlight ? value.trim() : null"
		:isRemoteInit="remote && value === ''"
		:optionRenderer="optionRenderer"
		:open="open"
		:options="options"
		:reason="reason"
		:shield="shield"
		@item-selection="handleItemSelection"
	/>
</div>
</template>

<script>
import Shield from './components/shield.vue';
import Input from './components/input.vue';
import Dropdown from './components/dropdown.vue';
import { buildItem, hasProperty, randomSuffix } from './helpers/common';
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
		createable: Boolean,
		customClassNames: Object,
		display: Function,
		dropdownAutoScroll: Boolean,
		grouped: Boolean,
		highlight: Boolean,
		initOptions: Array,
		initSelections: Array,
		isMulti: Boolean,
		multiSelRenderer: {
			type: Object,
			defualt: null,
		},
		optionRenderer: {
			type: Object,
			default: null,
		},
		placeholder: String,
		remote: Object,
		singleSelRenderer: {
			type: Object,
			default: null,
		},
		theme: String,
	},
	data() {
		if (this.remote && (!this.remote.settings && !this.remote.proxy)) {
			throw new Error("the remote expects the remote object to have a 'settings' property, but found nothing ... ");
		}

		this._keys = null;
		this._shieldId = null;
		this._debounceId = null;

		const { source, options, selection, groups } = this.init();

		this._engine = new Engine({ remote: this.remote || null });
		this._engine.add(source);

		return {
			className: this.getClassName(),
			focusStatus: focusStatus.None,
			groups,
			open: false,
			options,
			reason: 0,
			selection,
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
				if (typeof this.remote["prefetch"] === 'function') {
					this.runPrefetcher(this.remote["prefetch"]);
				}
			} else {
				source = this.prepareOptions(this.initOptions);
				if (this.initSelections && this.initSelections.length > 0) {
					initState = this.prepareInitState(source, this.initSelections);
				}
			}

			const initOptions = initState ? initState['options'] : source;
			const selection = initState ? initState['selection'] : { items: [], indices: {}, };

			const { options, groups } = this.grouped ? this.buildOptionGroups(initOptions) : { options: initOptions, groups: null };

			return { source, options, selection, groups, };
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
			let className = "vue_ahead__control_container";

			if (this.class) {
				className += " " + this.class;
			}

			if (this.customClassNames && this.customClassNames.control) {
				className += " " + this.customClassNames.control;
			}

			return className;
		},
		resetOptions: function () {
			this.reason = 0;

			if (this.remote) {
				if (typeof this.remote.prefetch === 'function') {
					this.runPrefetcher(this.remote.prefetch, true);
				} else {
					this.source = [];
					this.options = this.getOptions();
				}

				return;
			}

			this.options = this.getOptions();
		},
		buildOptionGroups: function (options) {
			if (!options || options.length === 0) {
				return { options, groups: null };
			}

			options = options.sort((a, b) => {
				if (a.type === "created") {
					return 1;
				}

				if (b.type === "created") {
					return -1;
				}

				if (a.group === "default") {
					return -1;
				}

				if (b.group === "default") {
					return 1;
				}

				if (a.group === b.group) {
					return 0;
				}

				return a.group > b.group ? 1 : -1;
			});

			const groups = {};
			let currKey = '';
			let lastIdx = -1;
			let count = 0;

			for (let i = 0; i < options.length; i++) {
				if (options[i].group !== currKey) {
					if (lastIdx >= 0) {
						groups[lastIdx] = { label: currKey, count, };
					}

					lastIdx = i;
					currKey = options[i].group;
					count = 0;
				}

				count++;
			}

			if (currKey !== '' && lastIdx >= 0) {
				// push the last group into the store
				groups[lastIdx] = { label: currKey, count, };
			}

			// console.log('groups:', groups, options);

			return { options, groups, };
		},
		getOptions: function (source) {
			if (!source) {
				source = this.source || [];
			}

			const { indices } = this.selection || {};
			if (!indices) {
				return source;
			}

			// console.log('filtering:', indices, source);

			let result = source.filter(item => !hasProperty(indices, item.key));

			if (this.grouped) {
				const { options, groups } = this.buildOptionGroups(result);
				result = options;
				this.groups = groups;
			}

			return result;
		},
		prepareOptions: function (options = []) {
			this._keys = {};

			const result =
				options
					.filter(item => typeof item === "object" && !!item)
					.map((item, idx) => {
						const controlItem = buildItem(item, idx, this._keys, this.grouped);

						this._keys[controlItem.key] = null;

						return controlItem;
					});

			// console.log('keys:', this._keys, result);

			return result || [];
		},
		prepareInitState: function (options, selections) {
			const indices = {};
			const remainder = [];
			const items = [];

			for (let i = 0; i < selections.length; i++) {
				let key = selections[i];
				if (typeof key !== 'string') {
					key = key.toString();
				}

				indices[key] = null;

				if (!this.isMulti) {
					break;
				}
			}

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
			const oldItems = this.selection.items;

			this.selection = {
				items: [],
				indices: {},
			};

			this.value = '';
			this.reason = 1;

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
			
			if (oldItems && oldItems.length > 0) {
				this.$emit("selection", {
					type: "clear",
					items: [],
					removed: oldItems.map(item => {
						return item["type"] === "created" ? item : item["src"]
					}),
				});
			}
		},
		reset: function () {
			const oldItems = this.selection.items;
			const { options, selection, groups } = this.init();

			this.value = '';
			this.reason = 1;
			this.options = options;
			this.groups = groups;
			this.selection = selection;
			
			if (oldItems && oldItems.length > 0) {
				this.$emit("selection", {
					type: "clear",
					items: [],
					removed: oldItems.map(item => {
						return item["type"] === "created" ? item : item["src"]
					}),
				});
			}
		},
		isValueCreateable: function (value = '', options = []) {
			if (value === '') {
				return false;
			}

			if (options.length === 0) {
				return true;
			}

			value = value.trim().toLowerCase();

			for (let i = 0; i < options.length; i++) {
				const label = options[i]['label'];

				if (label.trim().toLowerCase() === value) {
					return false;
				}
			}

			if (this.selection.items && this.selection.items.length > 0) {
				for (let i = 0; i < this.selection.items.length; i++) {
					const key = this.selection.items[i]['label'];

					if (key.trim().toLowerCase() === value) {
						return false;
					}
				}
			}

			return true;
		},
		runPrefetcher: function (prefetcher, keepSelections) {
			/* 
			 * The prefetcher is used to fetch default menu options, it should 
			 * not need interaction with the `createable` features.
			 */
			prefetcher((data, selections = []) => {
				setTimeout(() => {

					let source = this.prepareOptions(data);
					let initOptions = source;
					let selection = this.selection;

					if (
						selections
						&& selections.length > 0
						&& (!keepSelections || !this.selection.items.length)
					) {
						const initState = this.prepareInitState(source, selections);
						selection = initState.selection;
						initOptions = initState.options;
					}

					const { options, groups } = this.grouped ? this.buildOptionGroups(initOptions) : { options: initOptions, groups: null };

					this.source = source;
					this.options = options;
					this.selection = selection;
					this.groups = groups;
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
				}, 10);
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
		handleShieldClick: function (_evt) {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();

			// console.log("shield clicked ... ", evt);
		},
		handleDbClick: function (_evt) {
			// console.log('double click');

			setTimeout(() => {
				this.$refs.inputControl.select();
			}, 0);
		},
		handleInputClick: function (_evt) {
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

			if (value === '' || value.trim() === '') {
				this.resetOptions();
				return;
			}

			this.shieldAction(true);

			if (this._debounceId) {
				clearTimeout(this._debounceId);
			}

			this._debounceId = setTimeout(() => {
				this._engine.query(value, (data = []) => {
					// console.log(data);
					let source;

					// for remote search, the source change every time on a search
					// term, hence we need to update the source all the time
					if (this.remote) {
						this.source = this.prepareOptions(data);
						source = this.source;
					} else {
						source = data;
					}

					if (this.createable && this.isValueCreateable(value, source)) {
						let key = value.trim().toLowerCase();

						while (hasProperty(this._keys, key)) {
							key += randomSuffix();
						}

						source.push({ 
							label: value, 
							key,
							group: "new",
							type: "created",
						});
					}

					this.reason = 0;
					this.options = this.getOptions(source);

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
			let last = null;

			if (!this.isMulti) {
				last = items[0]["type"] === "created" ? items[0] : items[0]["src"];
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

			this.$emit("selection", {
				type: "add",
				items: this.selection.items.map(item => {
					return item["type"] === "created" ? item : item["src"]
				}),
				replaced: last,
				value: this.value,
			});

			// reset the value to empty after a selection
			if (this.value !== '') {
				this.value = '';
			}

			this.reason = 1;
			this.options = this.getOptions();

			// console.log(key, this.selection.items, this.selection.indices);

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
			let deleted = null;

			delete indices[key];
			items = items.filter(item => {
				if (item.key === key) {
					deleted = item;
					return false;
				}

				return true;
			});

			this.selection = {
				items,
				indices,
			};

			this.$emit("selection", {
				type: "remove",
				items: this.selection.items.map(item => {
					return item["type"] === "created" ? item : item["src"]
				}),
				removed: [deleted],
			});

			// filter the options against the original list
			this.reason = 1;
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

<style>
.vue_ahead__control_container {
	position: relative;
  box-sizing: border-box;
}
</style>
