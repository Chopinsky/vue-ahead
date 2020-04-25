<template>
<div
  aria-hidden="true"
  tabIndex="0"
  @click="$emit('click', $event)"
  @keydown="$emit('keydown', $event)"
>
  <svg
    x="0px" 
    y="0px"
    focusable="false"
    aria-hidden="true"
    class="icon"
    :width="size"
    :height="size"
    :viewBox="viewBox"
  >
    <path :d="path" />
  </svg>
</div>
</template>

<script>
export default {
	props: {
		path: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			default: 16,
		},
		viewBox: {
			type: String,
			default: "0 0 18 18",
		},
	},
};
</script>

<style scoped>
.icon {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
</style>