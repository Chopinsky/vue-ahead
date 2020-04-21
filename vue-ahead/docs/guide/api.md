---
title: API Guide
---

## Options

* grouped

The example below shows the auto-complete control with 

### Example 1: Grouped, Default Selections

<vh1></vh1>

* Data provided to the above control:
```javascript
data: function () {
  return {
    colors: [
      // the `group` field tells the control to put the option under the 
      // specific group label in the dropdown menu
      { label: 'White',  group: "group a" },
      // the `key` field denotes to a specific key for initSelection
      { label: 'Blue',   key: "dflt" },  
      { label: 'Green',  group: "group b" },
      { label: 'Gray',   group: "group a" },
      { label: 'Black',  group: "group b" },
      { label: 'Yellow', group: "group c" },
      { label: 'many-many-colors-that-dont-yet-have-a-name-for-whatever-it-is-and-will-be' },
    ],
  };
},
```

* Options defined to the above control:
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

## Public APIs
