---
title: Library Setup
---

[[toc]]

## Install for a Vue Application

The easiest way of using the `VueAhead` auto-complete control in your application is to add and install the package via package managers, e.g. `npm` or `yarn`.
  
At your project root where `package.json` file is loacted, run the command below to install and activate the package:

```javascript
// if use `yarn`
$ yarn add ssh://git@git.its.iastate.edu:7999/wl/webdev-react-typeahead.git

// if use `npm`
$ npm install ssh://git@git.its.iastate.edu:7999/wl/webdev-react-typeahead.git
```

Then in your application where you intend to use the control, add the following lines:

```vue
<template>
<!-- application code -->

<VueAhead 
  :initOptions="food"
  :placeholder="placeholder"
/>

<!-- more application code -->
</template>

<script>
import VueAhead from "vue-ahead";

export default {
  components: {
    // ... other components,
    VueAhead,
  },
  data: function () {
    return {
      food: new Array(
        { key: 0, label: 'Vegetables' },
        { key: 1, label: 'Cheese' },
        { key: 2, label: 'Whatever else humans are supposed to eat' }
      ),
      placeholder: "select your favorite food ... ",
    }
  },
};
</script>
```

## Install for a Generic Application

Alternatively, you can import the VueJS runtime with the control in browser, and create a Vue instance to use the control.

For example, the `index.html` or `index.php` file below shows the simpliest way of importing the control and use it in your application:

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="/path/to/the/library/vue-ahead/dist/vue-ahead.min.js"></script>

<!-- application code -->

<div id="control">
  <vue-ahead 
    :init-options="food"
    :placeholder="placeholder"
  />
</div>

<!-- more application code -->

<script>
var control = new Vue({
  el: '#control',
  components: {
    "vue-ahead": vueahead.default,
  },
  data: function () {
    return {
      food: new Array(
        { key: 0, label: 'Vegetables' },
        { key: 1, label: 'Cheese' },
        { key: 2, label: 'Whatever else humans are supposed to eat' }
      ),
      placeholder: "select your favorite food ... ",
    }
  },
});
</script>
```

::: warning
Note: if using the control as a standalone Vue component in a `html` file, make sure to convert the control attributes from the `camelCase` to the `kebab-case`. 

See official documentation for [`Prop Casing`](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case) for more details.
:::
