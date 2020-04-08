<template>
  <div class="control_container" @mousedown="onControlClick" >
		<div class="control_input_shield" v-bind:style="{ display: shieldDisplay, backgroundColor: 'black' }"></div>
    <h1>control ... </h1>
		<div>content</div>
  </div>
</template>

<script>

export default {
	inheritAttrs: false,
	name: "VueAhead",
	data() {
		this._initDropdownOpen = false;

		return {
			focuseStatus: 0,
			open: false,
			shield: false,
			shieldDisplay: "none",
		};
	},
	methods: {
		onControlClick() {
			this.focuseStatus = 2;
			this._initDropdownOpen = this.open;

			this.shield = !this.shield;
			this.shieldDisplay = this.shield ? "inherit" : "none";

			console.log(this.shieldDisplay)
		},
	},
	computed: {
	},
};
</script>

<style scoped>
.control_container {  
	position: relative;
  box-sizing: border-box;
}

.control_wrapper {	
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding-left: 6px;
  padding-right: 2px;
  min-height: 38px;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  border: 1px solid rgb(204, 204, 204);
  cursor: default;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: all 100ms ease 0s;
  outline: 0px !important;
}

.control_active {
  border: 1px solid blue;
}

.control_input_shield {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100000;
}

.input_container {	
  padding: 2px;
  color: rgb(51, 51, 51);
  position: relative;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow: hidden;
  visibility: visible;
  box-sizing: border-box;
  width: 100%;
}
</style>