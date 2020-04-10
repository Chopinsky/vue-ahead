<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
		<br/>
    <div class="control">
			<VueAhead 
        :initOptions="colors"
				placeholder="select a color"
      />
    </div>
    <br/>
    <div class="control">
      <VueAhead 
				placeholder="select a number"
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
			],
		};
	},
	mounted: function () {
		console.log(VueAhead);
	},
	methods: {
		handleClick() {
			console.log('done ....');
		}
	}
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
