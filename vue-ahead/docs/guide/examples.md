---
title: Examples
---

## Example 1: Grouped, Default Selections

<vh1></vh1>

* Features enabled in this example:

  1. options are grouped, count of options in the group is shown as well
  2. the control is default to the selection of the color 'Blue'

* Source data provided to the above control:

```javascript
data: {
  colors: [
    // the `group` field tells the control to put the option under the 
    // specific group label in the dropdown menu
    { label: 'White',  group: "group a" },
    // the `key` field denotes to a specific key for initSelection; when 
    // the `group` field is omitted for a grouped control, the option 
    // will be sent to the `default` group
    { label: 'Blue',   key: "dflt" },  
    { label: 'Green',  group: "group b" },
    { label: 'Gray',   group: "group a" },
    { label: 'Black',  group: "group b" },
    { label: 'Yellow', group: "group c" },
    { label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is' },
  ],
},
```

* Example's attribute definitions:

```javascript
<VueAhead
  // the control will attempt to display options in grouped manner in
  // the dropdown menu
  :grouped="true"
  // use `this.colors` as the default dropdown options
  :initOptions="colors"
  // select the option with default key of `dflt`, if the control is set 
  // to allow multiple-selections, provide the full list of the options
  // with keys of each in the array.
  :initSelections="['dflt']"
  // the placeholder display text
  placeholder="select a color"
/>
```

## Example 2: Extra Matching Highlight, Multi-Selections, Default Selections

<vh2></vh2>

* Features enabled in this example:

  1. options matching a search term will display extra highlights
  2. we can select more than 1 options from the searches
  3. the control is default to the selection of the major 'Physcis' and 'Math'


* Source data provided to the above control:

```javascript
data: {
  majors: [
    { label: 'Science' },
    { label: 'Physics', key: "phy" }, // denote a specific key for initSelection
    { label: 'Math', key:"math" },    // denote a specific key for initSelection
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
},
```

* Example's attribute definitions:

```javascript
<VueAhead
  // enable extra highlight
  :highlight="true"
  // enable multi-selection
  :isMulti="true"
  // provide source data
  :initOptions="majors"
  // provide default selections
  :initSelections="['phy', 'math']"
  placeholder="select a major"
/>
```

## Example 3: Search with a Remote Source, Custom Option Item Display

<vh3></vh3>

* Features enabled in this example:

  1. searching using a remote server
  2. items are displayed using a custom component (i.e. defined in the user space instead of in the library space)

* Source data provided to the above control:

```javascript
import CustomItem from '/path/to/the/component.vue';

export default {
  // definitions and settings ... 
  data: function () {
    const parser = function (data) {
      return data.map(item => {
        return {
          label: item['name'],
          extraData: item,
        };
      });
    };

    const remote = {
      settings: {
        method: 'get',
        url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
        timeout: 1000,      
      },
      dataParser: parser,
    };

    return {
      remote,
      item: CustomItem,
    }
  },
  // more definitions and settings ... 
};
```

* Example's attribute definitions:

```javascript
<VueAhead
  :remote="remote"
  :itemRenderer="item"
  class="control"
  placeholder="select a twitter handle"
/>
```

* The custom item's component definition:

```javascript
// in `path/to/the/component.vue`:

<template>
<div ref="elem" :class="className">
  <img 
    class="avatar" 
    :src="info && info.profile_image_url_https"
  />
  <div class="info">
    <div class="name"><b>{{ item.label || '' }}</b></div>
    <div class="screen_name">
      @{{ info && info.screen_name || '' }}
    </div>
    <div class="description">
      {{ info && info.description || '' }}
    </div>
  </div>
</div>
</template>

<script>
export default {
	props: {
		active: Boolean,
		item: Object,
		index: Number,
	},
	data: function () {
		return {
			className: this.getClassName(),
			info: this.item && this.item.extraData,
		};
	},
	methods: {
		getClassName: function () {
			return this.active ? "menu_option menu_option_active" : "menu_option";
		},
	},  
	watch: {
		active: function () {
			this.className = this.getClassName();
		},
		item: function () {
			this.info = (this.item && this.item.extraData) || null;
		},
	},
};
</script>

<style scoped>
.menu_option {
  position: relative;
  background-color: transparent;
  color: inherit;
  cursor: default;
  display: block;
  font-size: inherit;
  width: 100%;
  height: fit-content;
  user-select: none;
  box-sizing: border-box;
  padding: 6px 12px;
  text-align: left;
}

.menu_option.menu_option_active {
  background-color: rgb(222, 235, 255);
}

.avatar {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 52px;
  height: 52px;
  border: 2px solid #ccd6dd;
  border-radius: 5px;
}

.info {
  min-height: 60px;
  padding-left: 60px;
}

.name {
  font-weight: 500;
  display: inline-block;
}

.screen_name {
  color: #8899a6;
  display: inline-block;
  padding-left: 5px;
  font-size: 14px;
}

.description {
  margin-top: 5px;
  font-size: 12px;
  line-height: 14px;
  overflow: hidden;
  text-overflow: clip;
}
</style>
```

## Example 4: Styled Control

<vh4></vh4>

::: tip
To understand how `CSS` overrides work for the control, it's important to discuss `VueAhead`'s `CSS` class hierarchy, as shown below:

* `control_container [class]`
  * `control_wrapper [customClassNames.input / customClassNames.active]`
    * `input_container` (_levels below omitted_)
    * `icons_container` (_levels below omitted_)
  * `dropdown_wrapper [customClassNames.dropdown]`
    * `dropdown_container` (_levels below omitted_)

In this structure, `control_container` controls the outmost geometry of the whole control, such as the width, maximum height, paddings, margins, etc.. It will be compounded with the value set to the `class` attribute.

`control_wrapper` controls the input control's looks and geometry, such as border style (or focused style), border radius, etc.. An extra class with the value set in the `customClassNames.input` field will be added if the `customClassNames` attribute is set; and if the control is focused, it will take the compounded value from `customClassNames.input customClassNames.active` as the additional class names.

`input_container` controls the looks and geometry of the real input field, where users type the search terms; and `icons_container` controls the  looks and geometry of the action icons (i.e. the `cancel all` and `dropdown` icons at the right side end of the input control).

`dropdown_wrapper` controls the wrapping div over the dropdown menu, and it's usually used to control the positioning and look of the dropdown menu. An extra class with the value set in the `customClassNames.dropdown` field will be added as an additional class, such that control users can take charge of the dropdown menu styling. 

`dropdown_container` is where the actual contents are held in the dropdown menu, and it controls the inner content menu's height, width, etc..
:::

:::tip
With the knowledge of the `VueAhead`'s class hierarchy, it will be easy to override the default control styling.

For example, for the `customClassNames` set to the following:
```javascript
customClassNames = {
  input: "app_control_input",
  active: "app_control_active",
  dropdown: "app_control_dropdown",
};
```

You can define the following selector rules to guarantee the styling overrides:

```css
.control_wrapper.app_control_input {
  /* override the `control_wrapper` styles */
}

.control_wrapper.app_control_input.app_control_active {
  /* override the `control_wrapper` styles when focused */
}

.app_control_input .input_container {
  /* override the `input_container` styles */
}

.control_container .dropdown_wrapper.app_control_dropdown {
  /* override the `dropdown_wrapper` styles */
}

.dropdown_wrapper.app_control_dropdown .dropdown_container {
  /* override the `dropdown_container` styles */
}
```
:::

::: warning
Due to `CSS` selector rules, the class definitions should **_NOT_** be scoped, otherwise they may not apply correctly to the corresponding control elements.
:::