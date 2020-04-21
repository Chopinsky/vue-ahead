<template>
  <div id="app" class="container">
		<div class="row d-flex justify-content-center">
			<img alt="Vue logo" src="./assets/logo.png" tabindex="0">
		</div>
    <div class="control row">
			<VueAhead
				:grouped="true"
        :initOptions="colors"
				:initSelections="[1]"
				placeholder="select a color"
      />
    </div>
    <div class="control row">
      <VueAhead
				:isMulti="true"
				:initOptions="majors"
				:initSelections="[1, 2]"
				placeholder="select a major"
			/>
    </div>
    <div class="control row">
      <VueAhead
				:remote="remote"
				:itemRenderer="item"
				placeholder="select a twitter handle"
			/>
    </div>
  </div>
</template>

<script>
import VueAhead from 'vue-ahead';
import OptionItem from './Item.vue';

const parser = function (data) {
	return data.map(item => {
		return {
			label: item['name'],
			extraData: item,
		};
	});
};

const prefetcher = async function (cb) {
	// await cb([
	// 	{ label: 'ab' },
	// 	{ label: 'bc' },
	// 	{ label: 'cd' },
	// 	{ label: 'de' },
	// ]);
	cb([]);
};

const remote = {
	settings: {
		method: 'get',
		url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
		timeout: 1000,      
	},
	dataParser: parser,
	prefetch: prefetcher,
};

export default {
	name: 'App',
	components: {
		VueAhead,
	},
	data: function () {
		return {
			colors: [
				{ label: 'White', group: "group a" },
				{ label: 'Blue', key: 1 },  // denote a specific key for initSelection
				{ label: 'Green', group: "group b" },
				{ label: 'Gray', group: "group a" },
				{ label: 'Black', group: "group b" },
				{ label: 'Yellow', group: "group c" },
				{ label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-to-be' },
			],
			majors: [
				{ label: 'Science' },
				{ label: 'Physics', key: 1 }, // denote a specific key for initSelection
				{ label: 'Math', key:2 },     // denote a specific key for initSelection
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
			remote,
			item: OptionItem,
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
