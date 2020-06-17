<template>
<div :class="className">
	<div
		v-if="shield"
		:style="styles.shield"
		@mousedown.capture.stop="$emit('shield-click', $event)"
	>
		<h5 v-show="shieldVisible" :style="styles.title">
			Loading ...
		</h5>
	</div>
	<div
		class="container"
		ref="contentWrapper"
	>
		<div v-for="(item, idx) in options" :key="item.key">
			<GroupLabel
				v-if="groups && groups.hasOwnProperty(idx)"
				:data="groups[idx]"
				@mousedown.stop="handleLabelClicked"
			/>
			<Item
				v-if="!optionRenderer"
				:active="activeIdx === idx"
				:class="(customClassNames && customClassNames.activeItem) || ''"
				:created="item['type'] === 'created'"
				:highlightSource="highlightSource"
				:item="getMenuItem(item)"
				:index="idx"
				@mouseover="handleMouseOver"
				@mousedown.stop="$emit('item-selection', $event, item.key)"
				@item-activated="handleItemActivated"
			/>
			<div
				v-else
				:class="(customClassNames && customClassNames.activeItem) || ''"
				:created="item['type'] === 'created'"
				:ref="'item_' + idx.toString()"
				@mouseover="handleMouseOver($event, idx)"
				@mousedown.stop="$emit('item-selection', $event, item.key)"
			>
				<component
					:is="optionRenderer"
					:active="activeIdx === idx"
					:highlightSource="highlightSource"
					:item="getMenuItem(item)"
					:index="idx"
				/>
			</div>
		</div>
		<div
			v-if="!options || options.length === 0"
			class="empty_options"
		>
			{{ emptyText }}
		</div>
	</div>
</div>
</template>

<script>
import Item from "./dropdownItem.vue";
import GroupLabel from './dropdownLabel.vue';

const shieldStyle = {
	position: 'absolute',
	display: 'default',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	textAlign: 'center',
	justifyContent: 'center',
	zIndex: 65535,
	backgroundColor: 'transparent',
	userSelect: 'none',
};

const shieldTitleStyle = {
	position: 'absolute',
	top: '50%',
	left: '0',
	textAlign: 'center',
	margin: '-12px 0 0 0',
	padding: 0,
	width: '100%',
	height: '100%',
	opacity: 1,
};

export default {
	props: {
		autoScroll: Boolean,
		createable: Boolean,
		customClassNames: Object,
		groups: Object,
		highlightSource: String,
		isRemoteInit: Boolean,
		optionRenderer: Object,
		options: {
			type: Array,
			default: new Array(),
		},
		// Enum:
		// 0 -- new results;
		// 1 -- selection/removal;
		reason: Number,
		shield: Boolean,
	},
	components: {
		GroupLabel,
		Item,
	},
	data: function () {
		this._manualMove = "";
		this._moveDebounceId = null;
		this._debounceId = null;

		return {
			activeIdx: 0,
			className: this.getClassName(),
			shieldVisible: false,
			styles: {
				shield: shieldStyle,
				title: shieldTitleStyle,
			},
			emptyText: this.getEmptyText(),
		};
	},
	methods: {
		getClassName: function () {
			let className = "wrapper";

			if (this.customClassNames && this.customClassNames.dropdown) {
				className += " " + this.customClassNames.dropdown;
			}

			return className;
		},
		getEmptyText: function () {
			if (this.isRemoteInit) {
				return "Type to search";
			}

			if (this.createable) {
				return "No option and unable to create";
			}

			return "No option";
		},
		getMenuItem: function (item) {
			if (item['type'] === 'created') {
				return item;
			}

			return item['src'];
		},
		move: function (dir) {
			let { activeIdx } = this;

			if (dir === 'down') {
				activeIdx++;
			} else {
				activeIdx--;
			}

			if (activeIdx >= this.options.length) {
				activeIdx = this.options.length - 1;
			}

			if (activeIdx < 0) {
				activeIdx = 0;
			}

			if (activeIdx !== this.activeIdx) {
				this._manualMove = dir;
				this.activeIdx = activeIdx;
			}
		},
		select: function () {
			if (this.activeIdx < 0 || this.activeIdx >= this.options.length) {
				return;
			}

			const item = this.options[this.activeIdx];
			this.$emit('item-selection', null, item.key);
		},
		handleLabelClicked: function (evt) {
			const item = this.options[this.activeIdx];
			this.$emit('item-selection', evt, item.key);
		},
		handleItemActivated: function (offsetTop, offsetHeight = 30) {
			// console.log('scroll:', offsetTop, offsetHeight, this._manualMove);

			if (this.options.length < 4 || !this._manualMove) {
				return;
			}

			const wrapper = this.$refs.contentWrapper;
			// const { height } = wrapper.getBoundingClientRect();
			const { scrollTop, clientHeight } = wrapper;

			let target = scrollTop;

			if (
				offsetTop + offsetHeight > scrollTop + clientHeight // height
				&& this._manualMove === 'down'
			) {
				target = scrollTop + offsetHeight;
			} else if (
				offsetTop < scrollTop + 5
				&& this._manualMove === 'up'
			) {
				target = scrollTop - offsetHeight;
			}

			if (target !== scrollTop) {
				if (this._moveDebounceId) {
					clearTimeout(this._moveDebounceId);
				}

				if (this._moveDelay > 0) {
					this._moveDebounceId = setTimeout(() => wrapper.scrollTo(0, target), this._moveDelay);
				} else {
					wrapper.scrollTo(0, target);
				}
			}

			this._manualMove = '';
			this._moveDelay = 0;
		},
		handleMouseOver: function (_evt, idx) {
			// console.log('mouse over:', idx);

			if (idx < this.options.length) {
				this.activeIdx = idx;
			} else {
				this.activeIdx = this.options.length - 1;
			}

			if (this.activeIdx < 0) {
				this.activeIdx = 0;
			}
		},
	},
	watch: {
		activeIdx: function (_, oldVal) {
			if (this.autoScroll && !this._manualMove) {
				this._manualMove = this.activeIdx > oldVal ? "down" : "up";
				this._moveDelay = 200;
			}

			if (!this.optionRenderer) {
				return;
			}

			const itemKey = `item_${this.activeIdx}`;
			if (this.$refs[itemKey] && this.$refs[itemKey].length === 1) {
				const { offsetTop, offsetHeight } = this.$refs[itemKey][0];
				this.handleItemActivated(offsetTop, offsetHeight);
			}
		},
		className: function () {
			this.className = this.getClassName();
		},
		isRemoteInit: function (val) {
			if (val) {
				// only update the empty text here when resetting to the remote init
				// the search results will be updated when the shield is down.
				this.emptyText = this.getEmptyText();
			}
		},
		options: function () {
			if (this.reason === 0) {
				this.activeIdx = 0;
				this.$refs.contentWrapper.scrollTo(0, 0);
			} else if (this.activeIdx >= this.options.length) {
				this.activeIdx = this.options.length - 1;
			}
		},
		shield: function () {
			if (this.shield) {
				if (this._debounceId) {
					clearTimeout(this._debounceId);
				}

				this._debounceId = setTimeout(() => {
					this.shieldVisible = true;
					this.styles.shield['opacity'] = 0.75;
					this.styles.shield['backdrop-filter'] = 'blur(3px)';
					this.styles.shield['backgroundColor'] = '#F5F5F5';
				}, 300);
			} else {
				clearTimeout(this._debounceId);
				this._debounceId = null;

				this.shieldVisible = false;
				this.styles.shield['opacity'] = 1;
				this.styles.shield['backdrop-filter'] = '';
				this.styles.shield['backgroundColor'] = 'transparent';

				// the shield is done and the results are out, update the empty text
				this.emptyText = this.getEmptyText();
			}
		}
	}
};
</script>

<style scoped>
.wrapper {
	top: 100%;
	background-color: rgb(255, 255, 255);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
	margin: 8px 0;
	position: absolute;
	width: 100%;
	z-index: 1000;
	box-sizing: border-box;
	border-radius: 2px;
	animation: appear 50ms;
}

@keyframes appear {
	from { opacity: 0; }
	to   { opacity: 1; }
}

.container {
	max-height: 300px;
	overflow-y: auto;
	padding: 6px 0;
	position: relative;
	box-sizing: border-box;
	text-align: start;
}

.empty_options {
	color: rgb(153, 153, 153);
	cursor: default;
	text-align: center;
	box-sizing: border-box;
	padding: 6px 12px;
}
</style>