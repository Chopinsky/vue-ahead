---
title: Examples
---

[[toc]]

## Example 1: Grouped, Default Selections

<vh1></vh1>

* Features enabled in this example:

  1. grouping options by group keys; also showing the count of options in the group
  2. selecting the color 'Blue' by default

::: details
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
:::

## Example 2: Extra Matching Highlight, Multi-Selections, Default Selections

<vh2></vh2>

* Features enabled in this example:

  1. matching items show extra highlights
  2. enabling multiple selections (i.e. more than 1 items can be now selected) 
  3. selecting the majors 'Physics' and 'Math' by default


::: details
* Source data provided to the above control:

```javascript
data: {
  majors: [
    { label: 'Science' },
    // the `key` field denotes to a specific key for  
    // the item defined in the `initSelection`
    { label: 'Physics', key: "phy" },
    // the `key` field denotes to a specific key for 
    // the item defined in the `initSelection`
    { label: 'Math', key:"math" },
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
:::

## Example 3: Search with a Remote Source, Custom Option Item Display

::: danger
Disclaimer: this control queries a remote server *NOT* owned by IASTATE. 

The control should only be used for demonstration purpose only, and used sparsely. Please limit your search frequency to at most 10 new searches per minute.

(Repeating a seen search should be okay, as the control caches the search results.)
:::

<vh3></vh3>

* Features enabled in this example:

  1. searching options using a remote server
  2. displaying items with a custom component (i.e. defined in the user space instead of in the library space)

::: details
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
:::

## Example 4: Styled Control with Extra Highlights

<vh4></vh4>

* Features enabled in this example:

  1. decorating the control however the user-space application wants
  2. matching items show extra highlights

::: details
* Source data provided to the above control:

```javascript
data: {
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
},
```

* Custom Classes Definitions:

```css
.app_control_input {
  border: 2px solid black;
  border-radius: 0;
}

.app_control_input.app_control_active {
  border: 2px solid red;
}

.app_control_input {
  padding: 6px 4px;
}

.app_control_input .vue_ahead__action_icon {
  color: black;
}

.app_control_active .vue_ahead__action_icon {
  color: red;
}

.app_control_active .vue_ahead__action_icon:hover {
  color: darkorange;
}

.app_control_input .vue_ahead__action_icon_separator {
  background-color: black;
}

.app_control_active .vue_ahead__action_icon_separator {
  background-color: red;
}

.app_control_dropdown {
  margin: 2px 0;
  border: 2px solid blueviolet;
  border-radius: 0;
}

.app_control_dropdown .vue_ahead__dropdown_container {
  max-height: 200px;
}

.app_control_dropdown .vue_ahead__dropdown_container::-webkit-scrollbar {
  width: 1em;
}
 
.app_control_dropdown .vue_ahead__dropdown_container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
.app_control_dropdown .vue_ahead__dropdown_container::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
```

* Example's attribute definitions:

```javascript
<VueAhead
  :customClassNames="customClassNames"
  :highlight="true"
  :initOptions="drinks"
  placeholder="select your favorite beverage"
/>
```
:::

::: details Control's `CSS` class hierarchy 

To understand how `CSS` overrides work for the control, it's important to discuss `VueAhead`'s `CSS` class hierarchy, as shown below:

* `vue_ahead__control_container [class]`
  * `vue_ahead__control_wrapper [customClassNames.input]` or `vue_ahead__control_wrapper [customClassNames.active]`
    * `vue_ahead__input_container` (_levels below omitted_)
    * `vue_ahead__icons_container` (_levels below omitted_)
  * `vue_ahead__dropdown_wrapper [customClassNames.dropdown]`
    * `vue_ahead__dropdown_container`
      * `vue_ahead__menu_option vue_ahead__menu_option_active` or `vue_ahead__menu_option` 

In this structure, `control_container` controls the out-most geometry of the whole control, such as the width, maximum height, padding, margins, etc. It will be compounded with the value set to the `class` attribute.

`vue_ahead__control_wrapper` controls the input control's looks and geometry, such as border style (or focused style), border radius, etc. An extra class with the value set in the `customClassNames.input` field will be added if the `customClassNames` attribute is set; and if the control is focused, it will take the compounded value from `customClassNames.input customClassNames.active` as the additional class names.

`vue_ahead__input_container` controls the looks and geometry of the real input field, where users type the search terms; and `icons_container` controls the  looks and geometry of the action icons (i.e. the `cancel all` and `dropdown` icons on the right side end of the input control).

`vue_ahead__dropdown_wrapper` controls the wrapping div over the dropdown menu, and it's usually used to control the positioning and look of the dropdown menu. An extra class with the value set in the `customClassNames.dropdown` field will be added as an additional class, such that control users can take charge of the dropdown menu styling. 

`vue_ahead__dropdown_container` is where the actual contents are held in the dropdown menu, and it controls the inner content menu's height, width, etc.

:::

::: details Tips on customizing the control appearence

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
.app_control_input {
  /* override the `vue_ahead__control_wrapper` styles */
}

.app_control_input.app_control_active {
  /* override the `vue_ahead__control_wrapper` styles when focused */
}

.app_control_input .vue_ahead__input_container {
  /* override the `vue_ahead__input_container` styles */
}

.app_control_dropdown {
  /* override the `vue_ahead__dropdown_wrapper` styles */
}

.app_control_dropdown .vue_ahead__dropdown_container {
  /* override the `vue_ahead__dropdown_container` styles */
}
```

:::

::: warning
Due to `CSS` selector rules, the class definitions should **_NOT_** be scoped, otherwise they may not apply correctly to the corresponding control elements.
:::


## Example 5: With Bootstrap 4 Theme, Grouped, and Createable

<vh5></vh5>

* Features enabled in this example:

  1. a classic Boostrap 4 form, with a generic input, a Vue-Ahead input control, and a text block _(the Bootstap 3 / IASTATE theme will be compatible as well, we're using the BS-4 here for demonstration, since this version is compatible with the overall website styling)_.
  2. users can choose to create new items, which does not exist in the provided options array
  3. options are grouped

::: details

To enable the themed control, set the theme attribute (currently only supporting the `bootstrap` theme) to the control:

```html{8}
<div class="control form-group">
  <label for="formGroupExampleInput">
    A Vue-Ahead input control
  </label>
  <VueAhead
    id="formGroupExampleInput"
    placeholder="Select a createable color"
    theme="bootstrap"
    :createable="true"
    :grouped="true"
    :initOptions="colors"
  />
</div>
```
:::
