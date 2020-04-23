<template>
<div
	ref="elem"
  :class="className"
  @mouseover.capture="$emit('mouseover', $event, index)"
  @mousedown="$emit('mousedown', $event, index)"
>
  <span :style="styles.text">{{ content[0] }}</span><span v-if="content[1]" :style="styles.hl">{{ content[1] }}</span><span v-if="content[2]" :style="styles.text">{{ content[2] }}</span>
</div>
</template>

<script>
import { getItemLabel } from '../helpers/utils';

export default {
	props: {
		active: Boolean,
		highlightSource: String,
		item: Object,
		index: Number,
	},
	data: function () {
		return {
			className: this.getClassName(),
			content: this.getDisplay(),
			styles: {
				text: {
					padding: 0,
					margin: 0,
					opacity: this.highlightSource ? 0.8 : 1,
				},
				hl: {
					padding: 0,
					margin: 0,
					fontWeight: 600,
					textDecoration: "underline",
				},
			}
		};
	},
	methods: {
		getClassName: function () {
			let base = this.active ? "vue_ahead__menu_option vue_ahead__menu_option_active" : "vue_ahead__menu_option";

			if (this.class && this.active) {
				base += " " + this.class;
			}

			return base;
		},
		getDisplay: function () {
			const base = getItemLabel(this.item);

			if (this.highlightSource && base) {
				const src = base.trim().toLowerCase();
				const tgt = this.highlightSource.trim().toLowerCase();
				const pos = src.indexOf(tgt);

				if (pos >= 0) {
					return [
						pos === 0 ? null : base.substring(0, pos),
						base.substring(pos, pos + tgt.length),
						base.substring(pos + tgt.length),
					];
				}
			}

			return [base, null, null];
		},
	},
	watch: {
		active: function () {
			this.className = this.getClassName();

			if (this.active) {
				const { offsetTop, scrollHeight } = this.$refs.elem;
				this.$emit('item-activated', offsetTop, scrollHeight);
			}
		},
		highlightSource: function () {
			this.content = this.getDisplay();
			this.styles.text['opacity'] = this.highlightSource ? 0.8 : 1;
		},
	},
};
</script>

<style>
.vue_ahead__menu_option {
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

.vue_ahead__menu_option.vue_ahead__menu_option_active {
  background-color: rgb(222, 235, 255);
}
</style>