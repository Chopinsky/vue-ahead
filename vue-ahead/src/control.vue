<template>
  <div :class="control-wrapper">
    <h1>control ... </h1>
  </div>
</template>

<script>
export default {
	inheritAttrs: false,
	name: "VueAhead",
	data() {
		console.log('vue ahead loaded');

		return {

		};
	},
};
</script>

<style scoped>
.control-wrapper {
  padding: 10px;
}
</style>