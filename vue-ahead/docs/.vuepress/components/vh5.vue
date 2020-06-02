<template>
<div class="control_container">
	<form>
		<h4 style="text-decoration: underline;">A Form Example</h4>

		<h5>Fields:</h5>
		<div class="control form-group">
			<label for="formGroupExampleInput2">A generic input</label>
			<input type="text" class="form-control" id="formGroupExampleInput2" placeholder="A generic input placeholder">
		</div>

		<div class="control form-group">
			<label for="formGroupExampleInput">A Vue-Ahead input control</label>
			<VueAhead
				id="formGroupExampleInput"
				placeholder="Select a createable color"
				theme="bootstrap4"
				@selection="handleSelection"
				:createable="true"
				:grouped="true"
				:isMulti="true"
				:initOptions="colors"
			/>
		</div>

		<div class="row" style="padding: 5px 20px;">
			<h5>Text: the standard Lorem Ipsum passage, used since the 1500s</h5>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>
	</form>
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
				{ label: 'White', group: "group a", class: "vh_control vh_control_white" },
				{ label: 'Blue', key: 1, class: "vh_control vh_control_dark vh_control_blue" },  // denote a specific key for initSelection
				{ label: 'Green', group: "group b", class: "vh_control vh_control_dark vh_control_green" },
				{ label: 'Gray', group: "group a", class: "vh_control vh_control_dark vh_control_gray" },
				{ label: 'Black', group: "group b", class: "vh_control vh_control_dark vh_control_black" },
				{ label: 'Yellow', group: "group c", class: "vh_control vh_control_yellow" },
				{ label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-to-be' },
			],
		};
	},
	methods: {
		handleSelection: function (data, callback) {
			if (data.items && data.items.length > 1) {
				const selection = [data.items[data.items.length - 1]];
				callback(selection);
			}
		},
	},
}
</script>

<style>
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

.app_control {
	max-width: 360px;
	padding: 2px 0;
}

.vh_control {
	border-radius: 6px;
	padding: 2px 4px;
	margin-top: 0;
	font-weight: bold;
}

.vh_control_dark .vue_ahead__selection_content {
	color: white;
}

.vh_control .vue_ahead__selection_content span {
	padding-right: 4px;
}

.vh_control_blue {
	background-color: blue;
}

.vh_control_white {
	background-color: wheat;
}

.vh_control_green {
	background-color: green;
}

.vh_control_gray {
	background-color: gray;
}

.vh_control_black {
	background-color: black;
}

.vh_control_yellow {
	background-color: darkgoldenrod;
}
</style>
