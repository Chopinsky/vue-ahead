<template>
<div
	class="vue_ahead__control_input_shield"
	:style="style"
	@mousedown="$emit('mousedown', $event)"
>
</div>
</template>

<script>
const style = {
	display: "none",
	backgroundColor: "transparent",
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 100000,
};

export default {
	props: {
		on: Boolean,
	},
	data: function () {
		return {
			style: Object.assign({}, style),
		};
	},
	watch: {
		on: function () {
			this.style.display = this.on ? "inherit" : "none";
		},
	},
};
</script>

<style>
.vue_ahead__control_input_shield {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100000;
}
</style>