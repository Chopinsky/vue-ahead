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
        :createable="true"
        :grouped="true"
        :initOptions="colors"
      />
    </div>

    <div class="container row">
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
				{ label: 'White', group: "group a" },
				{ label: 'Blue', key: 1 },  // denote a specific key for initSelection
				{ label: 'Green', group: "group b" },
				{ label: 'Gray', group: "group a" },
				{ label: 'Black', group: "group b" },
				{ label: 'Yellow', group: "group c" },
				{ label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-to-be' },
      ],
    };
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
</style>
