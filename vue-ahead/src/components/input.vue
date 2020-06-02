<template>
<div
	:class="classes.wrapper"
	@dblclick.capture.stop="$emit('dblclick', $event)"
	@mousedown.stop="$emit('mousedown', $event)"
	@focus.capture="handleFocus"
	@blur.capture="$emit('blur', $event)"
>
	<div
		class="vue_ahead__input_container"
		:title="phContent.title"
	>
		<div
			v-if="phContent.content !== ''"
			:class="classes.placeholder"
		>
			<div 
				v-if="!singleSelRenderer || !selection.length"
				:class="singleValClass"
			>
				{{ phContent.content }}
			</div>
			<component
				v-else
				:is="singleSelRenderer"
				:class="singleValClass"
				:defaultText="phContent.content"
				:display="display"
				:item="selection[0]['src']"
			/>
		</div>

		<div
			v-for="(item, index) in selection"
			:key="getSelectionKey(item, index)"
		>
			<SelectionItem
				v-if="isMulti"
				:class="getItemClass(item)"
				:item="item"
				:itemRenderer="multiSelRenderer"
				:index="index"
				@item-removal="$emit('item-removal', $event, item)"
				@special-key="$emit('special-key', 'tab-out')"
			/>
		</div>

		<div :style="styles.field">
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

	<div class="vue_ahead__icons_container">
		<ControlIcon
			class="vue_ahead__action_icon vue_ahead__clear_icon"
			title="clear all"
			:path="path.clear"
			:size="18"
			@mousedown.native.stop="$emit('icon-event', $event, 'clear')"
			@keydown.stop="handleIconKeydown($event, 'clear')"
		/>
		<span class="vue_ahead__action_icon_separator"></span>
		<ControlIcon
			class="vue_ahead__action_icon vue_ahead__dropdown_icon"
			title="dropdown menu"
			:path="path.dropdown"
			:size="18"
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
	width: "2px",
	height: "100%",
	outline: "none",
	border: 0,
	padding: "0",
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

const fieldStyle = {
	display: "inline-block",
	padding: "0 0 0 1px",
};

const clearIconPath = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";

const dropdownIconPath = "M 4.516 7.548 c 0.436 -0.446 1.043 -0.481 1.576 0 l 3.908 3.747 l 3.908 -3.747 c 0.533 -0.481 1.141 -0.446 1.574 0 c 0.436 0.445 0.408 1.197 0 1.615 c -0.406 0.418 -4.695 4.502 -4.695 4.502 c -0.217 0.223 -0.502 0.335 -0.787 0.335 s -0.57 -0.112 -0.789 -0.335 c 0 0 -4.287 -4.084 -4.695 -4.502 s -0.436 -1.17 0 -1.615 Z";

export default {
	props: {
		active: Boolean,
		customClassNames: Object,
		display: Function,
		isMulti: Boolean,
		multiSelRenderer: Object,
		placeholder: {
			type: String,
			default: '',
		},
		singleSelRenderer: Object,
		selection: Array,
		theme: String,
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
		const { placeholder, phContent } = this.getPlaceholder();

		return {
			classes: {
				wrapper: this.getWrapperClassName(),
				placeholder,
			},
			path: {
				clear: clearIconPath,
				dropdown: dropdownIconPath,
			},
			phContent,
			styles: {
				container: contentHolderStyle,
				input: Object.assign({}, inputStyle),
				field: fieldStyle,
			},
			width: 2,
		};
	},
	methods: {
		clear: function () {
			this.$refs.contentHolder.innerText = '';
			this.styles.input.width = "2px";
		},
		focus: function () {
			this.$refs.input.focus();
		},
		select: function () {
			if (this.value === '') {
				return;
			}

			const { input } = this.$refs;
			const start = input.selectionStart;
			const end = input.selectionEnd;

			if (start < end) {
				input.setSelectionRange(this.value.length, this.value.length);
			} else {
				input.select();
			}
		},
		getWrapperClassName: function () {
			let wrapperClassName = !this.theme
				? "vue_ahead__control_wrapper vue_ahead__regular_theme"
				: "vue_ahead__control_wrapper form-control";

			// console.log(this.theme);

			if (this.customClassNames && this.customClassNames.input) {
				wrapperClassName += " " + this.customClassNames.input;
			}

			if (this.active) {
				if (this.customClassNames && this.customClassNames.active) {
					wrapperClassName += " " + this.customClassNames.active;
				} else {
					wrapperClassName += !this.theme
						? " vue_ahead__control_active"
						: " vue_ahead__themed_control_active";
				}
			}

			return wrapperClassName;
		},
		getSelectionKey: function (item, index) {
			return index.toString() + '#' + getItemLabel(item).substr(0, 5);
		},
		getPlaceholder: function () {
			const ph = {
				placeholder: "vue_ahead__plain_text",
				phContent: {
					content: '',
					title: '',
				},
			};

			if (this.value !== '') {
				ph.phContent.content = '';
				ph.phContent.title = this.value;

				return ph;
			}

			if (!this.isMulti && this.selection.length === 1) {
				ph.placeholder += " vue_ahead__plain_text_values";
				ph.phContent.content =
					getDisplay(this.selection[0], this.display, 'selection');
			} else if (this.selection.length === 0) {
				ph.phContent.content = this.placeholder || '';
			}

			// the selection renderer shall take care of the title (i.e. the
			// hover over tip)
			ph.phContent.title = ph.phContent.content;

			if (ph.phContent.content && ph.phContent.content.length > 32) {
				ph.phContent.content = ph.phContent.content.substr(0, 30) + " ...";
			}

			return ph;
		},
		getItemClass: function (item) {
			if (!item) {
				return null;
			}

			return item["src"]["class"] || null;
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
		handleKeydown: function (evt, keyCode) {
			if (!keyCode) {
				if (!evt) {
					return;
				}

				keyCode = evt.keyCode || 0;
			}

			switch (keyCode) {
				case 8:
					// backspace
					if (this.isMulti && this.value === '' && this.selection.length > 0) {
						// this.$emit('special-key', 'backspace');
						const item = this.selection[this.selection.length - 1];
						this.$emit('item-removal', evt, item);
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
		handleIconKeydown: function (evt, type) {
			const {keyCode} = evt;

			switch (keyCode) {
				case 13:
					// space
				case 32:
					// enter
					this.$emit('special-key', type, type === 'clear');
					break;

				case 38:
					// up
				case 40:
					// down
					this.$emit('special-key', keyCode === 38 ? 'up' : 'down', true);
					break;

				case 9:
					// tab
					if (type === 'dropdown' && !evt.shiftKey) {
						this.$emit('special-key', 'tab-out');
					}

					break;

				default:
					break;
			}
		},
	},
	computed: {
		singleValClass: function () {
			if (this.selection && this.selection.length === 1) {
				return this.getItemClass(this.selection[0]);
			}

			return null;
		},
	},
	watch: {
		value: function () {
			if (this.value === '') {
				// reset the input control width
				this.clear();
			}

			// update the display style and/or content
			const { placeholder, phContent } = this.getPlaceholder();

			this.classes.placeholder = placeholder;
			this.phContent = phContent;
		},
		selection: function () {
			const { placeholder, phContent } = this.getPlaceholder();

			this.classes.placeholder = placeholder;
			this.phContent = phContent;
		},
		active: function () {
			this.classes.wrapper = this.getWrapperClassName();
		},
		customClassNames: function () {
			this.classes.wrapper = this.getWrapperClassName();
		},
	}
};
</script>

<style>
.vue_ahead__control_wrapper {
	-webkit-box-align: center;
	-webkit-box-pack: justify;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
}

.vue_ahead__regular_theme {
	padding: 0 6px;
	background-color: rgb(255, 255, 255);
	border: 1px solid rgb(204, 204, 204);
	border-radius: 2px;
	transition: all 100ms ease 0s;
}

/* Theme accommodations */
.vue_ahead__control_wrapper.form-control {
	padding-right: 6px;
	padding-top: 4px;
}

.vue_ahead__control_wrapper.vue_ahead__control_active {
	border: 1px solid blue;
}

/* Theme accommodations */
.vue_ahead__control_wrapper.vue_ahead__themed_control_active {
	color: #495057;
	background-color: #fff;
	border-color: #80bdff;
	outline: 0;
	box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.vue_ahead__input_container {
	padding: 2px 0;
	color: rgb(51, 51, 51);
	position: relative;
	display: flex;
	flex: 1 1 0;
	flex-wrap: wrap;
	box-sizing: border-box;
	overflow: hidden;
	visibility: visible;
	cursor: text;
	width: 100%;
}

.vue_ahead__plain_text {
	position: absolute;
	top: 50%;
	color: rgb(128, 128, 128);
	margin: 0;
	padding: 0 1px;
	transform: translateY(-50%);
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-ms-user-select: none;
	user-select: none;
}

.vue_ahead__plain_text.vue_ahead__plain_text_values {
	color: inherit;
}

.vue_ahead__icons_container {
	-webkit-box-align: center;
	align-items: center;
	align-self: stretch;
	display: flex;
	flex-shrink: 0;
	box-sizing: border-box;
	padding-bottom: 1px;
}

/* Theme accommodations */
.form-control > .vue_ahead__icons_container {
	padding-bottom: 2px;
}

.vue_ahead__action_icon {
	color: rgb(204, 204, 204);
	display: flex;
	box-sizing: border-box;
	padding: 4px 2px;
	transition: color 150ms ease 0s;
}

.vue_ahead__action_icon.vue_ahead__clear_icon {
	padding-right: 4px;
}

.vue_ahead__action_icon.vue_ahead__dropdown_icon {
	margin-bottom: 1px;
}

.vue_ahead__action_icon:hover {
	cursor: pointer;
	color: rgb(153, 153, 153);
}

.vue_ahead__action_icon:active {
	outline: none !important;
	color: rgb(92, 92, 92);
}

.vue_ahead__action_icon:focus {
	color: rgb(153, 153, 153);
	outline: 2px dotted gray;
}

.vue_ahead__action_icon_separator {
	align-self: stretch;
	background-color: rgb(204, 204, 204);
	margin: 6px 2px;
	width: 1px;
	box-sizing: border-box;
}
</style>
