<template>
<div
	ref="elem"
  :class="className"
  @mouseover.capture="$emit('mouseover', $event, index)"
  @mousedown="$emit('mousedown', $event, index)"
>
  {{ item.label }}
</div>
</template>

<script>
import { getItemLabel } from '../helpers/utils';

export default {
	props: {
		active: Boolean,
		item: Object,
		index: Number,
	},
	data: function () {
		return {
			className: this.getClassName(),
			content: getItemLabel(this.item),
		};
	},
	methods: {
		getClassName: function () {
			return this.active ? "menu_option menu_option_active" : "menu_option";
		},
	},
	watch: {
		active: function () {
			this.className = this.getClassName();

			if (this.active) {
				const { offsetTop, offsetHeight } = this.$refs.elem;
				this.$emit('item-activated', offsetTop, offsetHeight);
			}
		},
	},
};
</script>

<style scoped>
.menu_option {
  background-color: transparent;
  color: inherit;
  cursor: default;
  display: block;
  font-size: inherit;
  width: 100%;
  user-select: none;
  box-sizing: border-box;
  padding: 6px 12px;
}

.menu_option.menu_option_active {
  background-color: rgb(222, 235, 255);
}
</style>