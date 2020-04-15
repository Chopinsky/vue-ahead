<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
		<br/>
    <div class="control">
			<VueAhead 
        :initOptions="colors"
				:initSelections="[1]"
				placeholder="select a color"
      />
    </div>
    <br/>
    <div class="control">
      <VueAhead 
				:isMulti="true"
				:initOptions="majors"
				:initSelections="[1, 2]"
				placeholder="select a major"
			/>
    </div>
  </div>
</template>

<script>
import VueAhead from 'vue-ahead';

export default {
	name: 'App',
	components: {
		VueAhead,
	},
	data: function () {
		return {
			colors: [
				{ label: 'white' },
				{ label: 'blue' },
				{ label: 'green' },
				{ label: 'gray' },
				{ label: 'black' },
				{ label: 'yellow' },
				{ label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-to-be' },
			],
			majors: [
				{ label: 'science' },
				{ label: 'physics' },
				{ label: 'math' },
				{ label: 'technology' },
				{ label: 'engineering' },
				{ label: 'arts' },
				{ label: 'meds' },
				{ label: 'biology' },
				{ label: 'architecture' },
			]
		};
	},
	methods: {
	},
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.buttonStyle {
  font-size: 16px;
  border-radius: 4px;
}

.control {
  margin: 20px auto;
  width: 360px;
}
</style>
