<template>
  <div id="app" class="container">
		<div class="row d-flex justify-content-center">
			<img alt="Vue logo" src="./assets/logo.png" tabindex="0">
		</div>
    <div class="control row">
			<VueAhead
				placeholder="select a color"
				:grouped="true"
        :initOptions="colors"
				:initSelections="[1]"
				:singleSelRenderer="singleSelRenderer"
				@selection="handleSelection(1, ...arguments)"
      />
    </div>
    <div class="control row">
      <VueAhead
				placeholder="select a major"
				:highlight="true"
				:isMulti="true"
				:initOptions="majors"
				:initSelections="[1, 2]"
				:multiSelRenderer="multiSelRenderer"
				@selection="handleSelection(2, ...arguments)"
			/>
    </div>
    <div class="control row">
      <VueAhead
				placeholder="select a twitter handle"
				:display="display"
				:dropdownAutoScroll="true"
				:remote="remote"
				:optionRenderer="optionRenderer"
				@selection="handleSelection(3, ...arguments)"
			/>
    </div>
		<div class="control row">
      <VueAhead
				placeholder="select a createable color"
				:createable="true"
				:grouped="true"
				:initOptions="colors"
				@selection="handleSelection(4, ...arguments)"
			/>
    </div>
  </div>
</template>

<script>
import VueAhead from 'vue-ahead';
import OptionItem from './Item.vue';
import Selection from './Selection.vue';
import MultiSelection from './MultiSelection.vue';

const parser = function (data) {
	return data.map(item => {
		return {
			label: item['name'],
			extraData: item,
		};
	});
};

const prefetcher = async function (cb) { cb([]); };

const remote = {
	settings: {
		method: 'get',
		url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
		timeout: 1000,      
	},
	dataParser: parser,
	prefetch: prefetcher,
};

const displayFormatter = function (label, item) {
	if (item && item.extraData) {
		const data = item.extraData;
		return data['name'] + " (@" + data['screen_name'] + ")";
	}

	return label;
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
			display: displayFormatter,
			remote,
			optionRenderer: OptionItem,
			singleSelRenderer: Selection,
			multiSelRenderer: MultiSelection,
		};
	},
	methods: {
		handleSelection: function (number, data) {
			console.log('selection made in control #', number, ', with data:', data);
		},
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
