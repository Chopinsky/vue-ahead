<template>
<div class="control_container">
  <VueAhead
    :highlight="true"
    :isMulti="true"
    :initOptions="majors"
    :initSelections="['phy', 'math']"
    class="control"
    placeholder="select a major"
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
			majors: [
				{ label: 'Science' },
				{ label: 'Physics', key: "phy" }, // denote a specific key for initSelection
				{ label: 'Math', key:"math" },     // denote a specific key for initSelection
				{ label: 'Technology' },
				{ label: 'Engineering' },
				{ label: 'Arts' },
				{ label: 'Medicine' },
				{ label: 'Medical Equipment' },
				{ label: 'Biology' },
				{ label: 'Architecture' },
				{ label: 'Earth' },
				{ label: 'Moon' },
				{ label: 'Mars' },
				{ label: 'Sun' },
				{ label: 'History' },
				{ label: 'Mythology' },
			],
    };
  },
}
</script>

<style scoped>
.control_container {
	display: block;
	text-align: left;
	color: #495057;
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