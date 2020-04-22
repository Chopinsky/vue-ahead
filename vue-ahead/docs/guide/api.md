---
title: API Guide
---

[[toc]]

## Attributes

* __`class`__ _(String)_

  This attribute uses the defualt `class` attribute. The given class will be added to the out-most div layer of the control.

* __`customClassNames`__ _(Object)_

  This attribute is expecting an object that contains one or more the following fields:

  * `input`: the name string of the class which shall apply or override the default input container div.

  * `active`: the name string of the class which shall apply or override the default input contaioner div when it's focused. 

  * `dropdown`: the name string of the class which shall apply or override the default dropdown menu container.

  Note that all these classes shall be defined in the user-space, and made available to the control (i.e. not scoped).

  ::: details example

  In your component, define the `customClaassNames` object, and pass it to the `VueAhead` control:

  ```javascript
  // in template:
  <VueAhead :customClassNames="customClassNames" :initOptions="options" />

  // in the data definition:
  export default {
    data: {
      customClassNames: {
        active: "app_control_active",
        input: "app_control_input",
        dropdown: "app_control_dropdown",
      },
      options: [ ... ],
    },
    // ...
  };
  ```

  And somewhere in your application, define the styles that match the given class names, and accessible to the control (_i.e._ not scoped):

  ```css
  // in styles definition:
  .app_control_input {
    padding: 6px 4px;
    border: 2px solid black;
    border-radius: 0;
  }

  .app_control_input.app_control_active {
    border: 2px solid red;
  }

  .app_control_dropdown {
    margin: 2px 0;
    border: 2px solid blueviolet;
    border-radius: 0;
  }
  ```
  :::

* __`grouped`__ _(Boolean)_

  This attribute defines if the provided or searched options are grouped (i.e. the option item data object contains the `group` field), and the control will try to group the options by the `group` key. 

* __`highlight`__ _(Boolean)_

  This attribute controls if we shall display extra highlights on the option items matching the search terms. The default matching behavior will bolden the portion of the string that matches the search term, and give this portion of the string an underline. 

* __`initOptions`__ _(Array)_

  This attribute is used to provide the local search options. It's required if all searches are performed locally, i.e. the `remote` attribute is ignored. 
  
  ::: tip

  If both `initOptions` and `remote` are provided, the `initOptions` will be ignored and no-op. Use the `prefetcher` field of the `remote` object to define the default options available before the search.

  :::

  ::: details example
  
  In your component, define the `initOptions` object, and pass it to the `VueAhead` control:

  ```javascript
  // somewhere in template:
  <VueAhead :initOptions="colors" :grouped:"true" />

  // in the data definition:
  export default {
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
    // ...
  };
  ```
  :::

* __`initSelections`__ _(Array)_

  This attribute defines the default options that will be selected when rendering for the first time, or reseting the control. 
  
  It expects an array of strings representing the `key` of the items that shall be selected by default before any searches are run. If such string matches an option item with the same value in its `key` field, the item will be used as the default selection in the control. 

  ::: tip
    
  1. if both `initSelections` and `remote` are provided, the `initSelections` attribute will be ignored and no-op. Use the `prefetcher` field of the `remote` object to define the default selections.

  2. if the control is in the single-selection-mode (_i.e._ `isMulti` is not set or to set to `false`), the first option item whose `key` string is presented in the array will be used as the default selection. This behavior could lead to quirky results, so always use the single element array when operating in the single-selection-mode.

  :::

* __`isMulti`__ _(Boolean)_

  This attribute controls if we allow users to select more than 1 option from the option list. 

  For `remote` searches where the option list may differ on every new search terms, we will keep the selected items even if they won't match the new search term.

* __`itemRenderer`__ _(Object)_

  This attribute takes a `Vue` component object as the input, and it will be used to render the option items in the dropdown menu.

  The component shall take (at least) the following `props`, which may drive the behavior of the item display or rendering result:

  * `active` _(Boolean)_ -- if this item is activated, _i.e._ when the item has been hovered upon, or when the selection cursor has moved to this item.

  * `highlightSource` _(String)_ -- if the `highlight` attribute is set to true, this property will contain the search string the user has entried. The component can decide if they want to use the information to render the component differently (or not).

  * `item` _(Object)_ -- the original information of the item object to be rendered. It will be the same object from the `initOptions` array or from the remote resource. 

  * `index` _(Number)_ -- the index of the item in the current option list. 

  ::: details example

  Once the item is defined, import it to your component using the control, and provide the customized item component as the data source to the `itemRenderer` attribute:

  ```javascript
  // in template
  <VueAhead :initOptions="options" :itemRenderer="customizedItem" />

  // in your script
  import CustomizedItem from '/path/to/item.vue';

  export default {
    data: {
      customizedItem: CustomizedItem,
      options: [ ... ],
    },
    // ...
  };
  ```
  :::

* __`placeholder`__ _(String)_

  This attribute controls the text shown as the `placeholder` of the input field. The `placeholder` will be shown when no selection has been made, and there is no user entry in the input field.

* __`remote`__ _(Object)_

  //TODO: _complex stuff_

  ::: tip

  If your component only need to fetch the search options once, and then run all the searches against this static array of options, you should **NOT** use the `remote` object. 
  
  Instead, fetch the options data from the remote resources as the application launches, and then provide the data to the `initOptions` attribute.

  :::

  ::: details example
  :::

::: warning *** Use Correct Attribute Format ***

Due to limitations of the `VueJS` framework, when used as a standalone `Vue` component in browsers, control attribute names will be converted to the `kebab-case` from the default `camelCase`.

For example, when used as a standalone component, the `initOptions` attribute will become `init-options`, and `isMulti` will become `is-multi`, and so on. 

Binding data to the attribute of the incorrect name format will lead to the (silent) binding failure, and the `Vue` component will not receive or see the binding data.

For more related information, see the official documentation for [`Prop Casing`](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case).

:::

## Public APIs and Events

// TODO ...
