<template>
<div class="container">
  <VueAhead
    :customClassNames="customClassNames"
    :highlight="true"
    :initOptions="drinks"
    class="app_control"
    placeholder="select your favorite beverage"
  />
</div>
</template>

<script>
import VueAhead from '../../../dist/vue-ahead.umd';

export default {
  components: {
    VueAhead,
  },
  data: function () {
		return {
			drinks: [
				{ label: 'Beer' },
				{ label: 'Water' },
				{ label: 'Coffee' },
				{ label: 'Tea' },
				{ label: 'Milk' },
				{ label: 'Wine' },
				{ label: 'Energy Drink' },
				{ label: 'Cider' },
				{ label: 'Soft Drink' },
				{ label: 'Whisky' },
      ],
      customClassNames: {
        active: "app_control_active",
        input: "app_control_input",
        dropdown: "app_control_dropdown",
      },
    };
  },
}
</script>

<style>
.container {
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

.control_wrapper.app_control_input {
  border: 2px solid black;
  border-radius: 0;
}

.control_wrapper.app_control_input.app_control_active {
  border: 2px solid red;
}

.app_control_input .input_container {
  padding: 6px 0;
}

.control_container .dropdown_wrapper.app_control_dropdown {
  margin: 2px 0;
  border: 2px solid blueviolet;
  border-radius: 0;
}

.dropdown_wrapper.app_control_dropdown .dropdown_container {
  max-height: 200px;
}

.dropdown_container::-webkit-scrollbar {
  width: 1em;
}
 
.dropdown_container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
.dropdown_container::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>