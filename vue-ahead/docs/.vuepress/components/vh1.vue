<template>
<div class="container">
  <VueAhead
    :grouped="true"
    :initOptions="colors"
    :initSelections="[1]"
    class="control"
    placeholder="select a color"
  />
</div>
</template>

<script>
import VueAhead from '../../../src/main.js';

export default {
  components: {
    VueAhead,
  },
  data: function () {
		return {
			colors: [
				{ label: 'White',  group: "group a" },
				{ label: 'Blue',   key: 1 },  // denote a specific key for initSelection
				{ label: 'Green',  group: "group b" },
				{ label: 'Gray',   group: "group a" },
				{ label: 'Black',  group: "group b" },
				{ label: 'Yellow', group: "group c" },
				{ label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-will-be' },
      ],
    };
  },
}
</script>

<style scoped>
.container {
  margin: 20px 0;
  padding: 20px;
  max-width: 800px;
  background-color: #E3F2FD;
  border-radius: 8px;
}

.control {
  max-width: 360px;
}
</style>