<template>
  <div class="control_container">
		<Shield 
			v-bind:on="shield" 
			@click="handleShieldClick" 
		/>
		<Input 
			ref="inputControl"
			:value="value"
			@change="handleInputChange"
			@click="handleInputClick"
			@focus="handleFocus"
			@blur="handleInputBlur"
		/>
		<Dropdown
			v-if="open"
			:open="open"
			@click="handleDropdownClick"
		/>
  </div>
</template>

<script>
import Shield from './components/shield.vue';
import Input from './components/input.vue';
import Dropdown from './components/dropdown.vue';

const focusStatus = {
	None: 0,
	Input: 1,
	InputControl: 2,
	Dropdown: 3,
	Shield: 4,
};

export default {
	inheritAttrs: false,
	name: "VueAhead",
	components: {
		Shield,
		Input,
		Dropdown,
	},
	props: {
		initOptions: Array,
	},
	data() {
		this._initDropdownOpen = false;

		return {
			focusStatus: focusStatus.None,
			open: false,
			shield: false,
			shieldDisplay: "none",
			value: '',
		};
	},
	methods: {
		focusInput: function () {
			setTimeout(() => {
				console.log('moving focus to the input, before:', this.focusStatus);

				if (this.focusStatus !== focusStatus.Input) {
					this.$refs.inputControl.focus();
					this.open = true;
				}

				this.focusStatus = focusStatus.Input;
			}, 0);
		},
		handleFocus: function (evt) {
			console.log('control get focus ... ', this.focusStatus);

			if (this.focusStatus === focusStatus.None) {
				this.focusInput();	
			}
		},
		handleShieldClick: function (evt) {
			// move the cursor back to the input field
			this.focusStatus = focusStatus.Shield;
			this.focusInput();
			
			console.log("shield clicked ... ", evt);
		},
		handleInputClick: function (evt) {
			this.focusStatus = focusStatus.InputControl;
			this.focusInput();

			console.log('input clicked ...', evt);
		},
		handleInputBlur: function (evt) {
			if (this.focusStatus <= focusStatus.Input) {
				this.focusStatus = focusStatus.None;

				this.open = false;
				this.value = '';
			}

			console.log('blur?', this.focusStatus);
		},
		handleInputChange: function (evt, value) {
			this.value = value;
		},
		handleDropdownClick: function (evt) {
			this.focusStatus = focusStatus.Dropdown;
			this.focusInput();

			console.log('dropdown clicked ...', evt);
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