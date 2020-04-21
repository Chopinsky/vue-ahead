---
title: Library Setup
---

## Install for a Vue Application

The easiest way of using the `VueAhead` auto-complete control in your application is to add and install the package via package managers, e.g. `npm` or `yarn`. 

<br />
  
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
  :initOptions="..."
  :placeholder="..."
/>
<!-- other application code -->
</template>

<script>
import VueAhead from "vue-ahead";

export default {
  components: {
    // ... other components,
    VueAhead,
  }
}
</script>
```

## Install for a Generic Application

Alternatively, you can import the VueJS runtime with the 