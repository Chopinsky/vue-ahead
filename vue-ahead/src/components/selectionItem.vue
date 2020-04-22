<template>
<div class="vue_ahead__selection_container">
  <div class="vue_ahead__selection_content" :title="title">
    {{ text }}
  </div>
  <ControlIcon
    class="vue_ahead__selection_removal"
    title="remove selection"
    :path="iconPath"
    @mousedown.native.stop="$emit('item-removal', $event)"
    @keydown.stop="handleRemovalKeydown($event)"
  />
</div>
</template>

<script>
import ControlIcon from './controlIcon.vue';

const clearIconPath = "M 14.348 14.849 c -0.469 0.469 -1.229 0.469 -1.697 0 l -2.651 -3.03 l -2.651 3.029 c -0.469 0.469 -1.229 0.469 -1.697 0 c -0.469 -0.469 -0.469 -1.229 0 -1.697 l 2.758 -3.15 l -2.759 -3.152 c -0.469 -0.469 -0.469 -1.228 0 -1.697 s 1.228 -0.469 1.697 0 l 2.652 3.031 l 2.651 -3.031 c 0.469 -0.469 1.228 -0.469 1.697 0 s 0.469 1.229 0 1.697 l -2.758 3.152 l 2.758 3.15 c 0.469 0.469 0.469 1.229 0 1.698 Z";

export default {
	props: {
		display: Function,
		item: Object,
		index: Number,
	},
	components: {
		ControlIcon,
	},
	data: function () {
		const { text, title } = this.getDisplayText();
		return {
			text,
			title,
			iconPath: clearIconPath,
		};
	},
	methods: {
		getDisplayText: function () {
			const title = this.item.label || "...";
			let text = title;

			if (text && text.length > 8) {
				text = text.substr(0, 6) + "...";
			}

			return {
				text,
				title,
			};
		},
		handleRemovalKeydown: function (evt, key) {
			if (!evt) {
				return;
			}

			const { keyCode } = evt;

			if (keyCode === 13 || keyCode === 32) {
				this.$emit('item-removal', evt, key);
				evt.preventDefault();
			}
      
			if (this.index === 0 && keyCode === 9 && evt.shiftKey) {
				this.$emit('special-key');
			}
		},
	},
};
</script>

<style>
.vue_ahead__selection_container {
  background-color: rgb(230, 230, 230);
  display: flex;
  min-width: 0px;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 2px;
}

.vue_ahead__selection_content {
  color: rgb(51, 51, 51);
  font-size: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  padding: 2px 2px 2px 4px;
}

.vue_ahead__selection_removal {
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  padding-left: 0;
  padding-right: 2px;
  box-sizing: border-box;
  border-radius: 2px;
}

.vue_ahead__selection_removal:hover {
  background-color: rgb(255, 189, 173);
  color: rgb(222, 53, 11);
}
</style>