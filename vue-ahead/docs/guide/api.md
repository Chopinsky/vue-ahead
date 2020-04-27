---
title: API Guide
---

[[toc]]

## Attributes

::: warning *** Use Correct Attribute Format ***

Due to limitations of the `VueJS` framework, when used as a standalone `Vue` component in browsers, control attribute names will be converted to the `kebab-case` from the default `camelCase`.

For example, when used as a standalone component, the `initOptions` attribute will become `init-options`, and `isMulti` will become `is-multi`, and so on. 

Binding data to the attribute of the incorrect name format will lead to the (silent) binding failure, and the `Vue` component will not receive or see the binding data.

For more related information, see the official documentation for [`Prop Casing`](https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case).

:::

### `class` _(String)_

  This attribute uses the defualt `class` attribute. The given class will be added to the out-most div layer of the control.

### `createable` _(Boolean)_

  This attribute controls whether the control will allow user to create a new entry based on the entries.

  If the attribute is toggled on, then the control will display an option matching the current user entry; if selected, the item will be added to the control selections and acknowledge the parent applicaiton. 

  If the `grouped` attribute is also toggled on, the created item will be shown under the `NEW` group. 

  ::: warning What values can be created

  It's noteworthy that __NOT__ all user entries can be a legal createable item. It has to meet the following criteria:

  1. user entered value must __NOT__ match any of the shown option's label text, which will be treated case-insensitive. For example, if the options contain an item with the label text of ` White ` (_i.e._ value with prefix and suffix spaces), then user entry of `white` will not be a createable entry.

  2. user entered value must __NOTE__ match any of the selected option's label text, which will be treated case-incensitive. For example, if the current selection contain an item with the label text of ` White ` (_i.e._ value with prefix and suffix spaces), then user entry of `white` will not be a createable entry.

  :::

### `customClassNames` _(Object)_

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

### `display` _(Function)_

  This attribute takes a function, which will be used to format the display value of the selected items. 

  The function is expected to return a string value (for the display text), and it will be passed with the arguments in the following order:

  * `label` _(String)_ -- the value from the `label` field of the `item`.

  * `item` _(Object)_ -- the same item object passed to the control from the `initOptions` array or from the remote server.

  * `type` _(String)_ -- denoting the type of the selection; it can be one of the two values: `selection` or `multi-selection`, corresponding to the selection mode under which the item is selected.

### `dropdownAutoScroll` _(Boolean)_

  This attribute is used to scroll the hovered option into the visible menu window. 
  
  This attribute is useful when the dropdown menu has too options such that it shows the scroll bar, in which case sometimes the hovered over option is half-burried below the visible menu window. If the attribute is set to `true`, we will try to scroll the menu window such that the original hovered over option will be able to show its full content.

  A side effect of setting this attribute is that if the mouse keep hovering at the first and last item half-shown in the menu window, the window will keep moving up and down, specifically. 

### `grouped` _(Boolean)_

  This attribute defines if the provided or searched options are grouped (i.e. the option item data object contains the `group` field), and the control will try to group the options by the `group` key. 

### `highlight` _(Boolean)_

  This attribute controls if we shall display extra highlights on the option items matching the search terms. The default matching behavior will bolden the portion of the string that matches the search term, and give this portion of the string an underline. 

### `initOptions` _(Array)_

  This attribute is used to provide the local search options. It's required if all searches are to be performed locally, _i.e._ the `remote` attribute is ignored.

  `initOptions` is expecting to receive an array of objects, and each object could at least contain the following fields:

  * `label` _(String/Required)_ -- the (default) display value for the item in the dropdown menu or as the selected item.

  * `key` _(String/Optional)_ -- the unique key string that represents the option item; this field can be ignored, and the control will generate a unique id for this specific item; the `key` field is primarily used to identify the item as the default selected item if it matches a string value from the `initSelections` array.

  * `group` _(String/Optional)_ -- the string to identify which group the item shall belong to if the `grouped` attribute is set to `true`. If `grouped` is `true`, and the `group` field is left blank, the item will be put into the `DEFAULT` group. 

  * any other properties that shall be associated with the option item, but which will not be desired by the control at the moment.
  
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

### `initSelections` _(Array)_

  This attribute defines the default options that will be selected when rendering for the first time, or reseting the control. 
  
  It expects an array of strings representing the `key` of the items that shall be selected by default before any searches are run. If such string matches an option item with the same value in its `key` field, the item will be used as the default selection in the control. 

  ::: tip
    
  1. if both `initSelections` and `remote` are provided, the `initSelections` attribute will be ignored and no-op. Use the `prefetcher` field of the `remote` object to define the default selections.

  2. if the control is in the single-selection-mode (_i.e._ `isMulti` is not set or to set to `false`), the first option item whose `key` string is presented in the array will be used as the default selection. This behavior could lead to quirky results, so always use the single element array when operating in the single-selection-mode.

  :::

### `isMulti` _(Boolean)_

  This attribute controls if we allow users to select more than 1 option from the option list. 

  For `remote` searches where the option list may differ on every new search terms, we will keep the selected items even if they won't match the new search term.

### `multiSelRenderer` _(Vue-Object)_

  This attribute takes a `Vue` component object as the input, and it will be used to render the selected option in the input field in the multi-selection-mode (i.e. `isMulti` is set to `true`).

  The component shall take (at least) the following `props`, which may drive the behavior of the item display or rendering result:

  * `defaultText` _(String)_ -- this is the default text content that will be displayed in the multi-seleciton items if the `multiSelRenderer` is not set. Note that this text is post-formatted with the `display` functoin, if it's made available to the control.

  * `display` _(Function)_ -- this is the same `display` function passed to the control in the `display` attribute, and it should be used to format the display string if desired.

  * `item` _(Object)_ -- the original item object passed on to the control. It will be the same object from the `initOptions` array or from the `remote` resource.

  ::: details example

  Once the item is defined, import it to your component using the control, and provide the customized item component as the data source to the `optionRenderer` attribute:

  ```javascript
  // in template
  <VueAhead :initOptions="options" :multiSelRenderer="multiSelection" />

  // in your script
  import MultiSelection from '/path/to/multiSelection.vue';

  export default {
    data: {
      multiSelection: MultiSelection,
      options: [ ... ],
    },
    // ...
  };
  ```
  :::

### `optionRenderer` _(Vue-Object)_

  This attribute takes a `Vue` component object as the input, and it will be used to render the option items in the dropdown menu.

  The component shall take (at least) the following `props`, which may drive the behavior of the item display or rendering result:

  * `active` _(Boolean)_ -- if this item is activated, _i.e._ when the item has been hovered upon, or when the selection cursor has moved to this item.

  * `highlightSource` _(String)_ -- if the `highlight` attribute is set to true, this property will contain the search string the user has entried. The component can decide if they want to use the information to render the component differently (or not).

  * `item` _(Object)_ -- the original item object passed on to the control. It will be the same object from the `initOptions` array or from the remote resource. 

  * `index` _(Number)_ -- the index of the item in the current option list. 

  ::: details example

  Once the item is defined, import it to your component using the control, and provide the customized item component as the data source to the `optionRenderer` attribute:

  ```javascript
  // in template
  <VueAhead :initOptions="options" :optionRenderer="customizedOption" />

  // in your script
  import CustomizedOption from '/path/to/option.vue';

  export default {
    data: {
      customizedOption: CustomizedOption,
      options: [ ... ],
    },
    // ...
  };
  ```
  :::

### `placeholder` _(String)_

  This attribute controls the text shown as the `placeholder` of the input field. The `placeholder` will be shown when no selection has been made, and there is no user entry in the input field.

### `remote` _(Object)_

  This attribute takes an object as input, which defines a suite of behaviors the control shall follow to communicate with the remote server or resource on obtaining a suitable array of options to be displayed under the user entered search term. 

  The `settings` property from the `remote` object will be passed on to the `axios` module for sending communications and handling responses from the remote server/resources, and hence it will take the same configurations and hooks as expected by the `axios` module.

  ::: tip

  If your component only need to fetch the search options once, and then run all the searches against this static array of options, you should **NOT** use the `remote` object. 

  Instead, fetch the options data from the remote resources as the application launches, and then provide the data to the `initOptions` attribute.

  :::

  The object is expected to have the following properties:

  * `settings` _(Object/Required)_

    The remote protocal settings for the AJAX communication with the remote server/resource; since the control use the `axios` module for the remote communications, this object shall contain the same configurations and hooks as accepted by the `axios` module. 
  
    Please see the [full list](https://github.com/axios/axios#request-config) of the possible configurations and hooks. The `settings` object shall contain at least the `method` and `url` fields, which points to the remote endpoint that's expecting the search query from the control.
    
    For example, for the following settings:

    ```javascript
    settings: {
      method: 'get',
      url: 'https://www.example.com/search',
    },
    ```

    the control will send a `GET` request to `https://www.example.com/search?q=[value]`, with `[value]` being the user entered search term, and this search term will NOT be null. 
    
    The control is expecting a JSON array of objects (which shall follow the same rules as specified for the item objects in the `initOptions`), but you can always provide any data as you would like, and use the `dataParser` function to generate the acceptable object array.

  * `proxy` _(Function/Optional)_

    If provided, when running a search with the remote server, the `proxy` function will be invoked instead of through the default `axios` module to obtain the query responses.

    The function shall return a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object, which shall resolve with the query data returned from the remote server or resource on the user entered search term. The function will be invoked with a `settings` object, which is the same `settings` object as passed to the control in the `remote`, plus the updated `parameter` field in the `settings`, with the `q` field set to the user entered search string. 

    The `proxy` function can be useful to inject application defined caching or to short-circuit known search terms, plus more. 

    For example, the easiest implementation using the `axios` module would look similar to the following code:

    ```javascript
    remote: {
      proxy: function (settings) {
        const val = settings['params']['q'];

        if (this.searchTermSeen(val)) {
          // must return a Promise!
          return this.getCachedResults(val);
        }

        // continue the query with the remote server
        const defaultSettings = {
          method: 'get',
          url: 'https://www.example.com/search',
        };

        return axios(Object.assign({}, defaultSettings, settings));
      },
    },
    ```

  * `dataParser` _(Function/Optional)_

    The function that will be invoked upon receiving the responses from the remote server/resource.
    
    This function is expected to return an array of objects that follow the same rules as to the data passed to the `initOptions` attribute, and it will receive the raw body of the response. 

    Note that this hook function is invoked by the control, and alternatively, you can use `axios`'s `transformRequest` hook function or `transformResponse` hook function (_though they need to be set in the `settings` field_) to inject or update the requests before they're sent, or the responses before they're passed back to the control.
	
  * `prefetch` _(Function/Optional)_

    The function that will be invoked to obtain an array of options to be displayed in the dropdown menu before user enters anything to the control. 

    The function is expected to return an array of objects that follow the same rules as to the data passed to the `initOptions` attribute, and it will receive a `resolve` callback function as the sole argument. Make sure to invoke the `resolve` function with the prefetched data as the first argument, and an array of keys of the items to be selected by default (the array shall follow the same rules as the `initSelections` attribute requires).

    For example, for the following `prefetch` definition, the function will return a static list of options as the default display options, and the item that shall be selected by default in this control.

    ```javascript
    const prefetcher = function (resolve) {
      // you must call the `resolve` at the very end of the `prefetch` workflow.
      resolve(
        // array of the default options shown in the dropdown menu, before an user search
        [
          { label: 'White',  key: "white",  },
          { label: 'Blue',   key: "blur",   },
          { label: 'Green',  key: "green",  },
          { label: 'Gray',   key: "gray",   },
          { label: 'Black',  key: "black",  },
          { label: 'Yellow', key: "yellow", },
        ],
        // array of the keys of the options that shall be selected by default
        [ "white", ]
      );
    };

    // then in the remote settings:
    remote: {
      settings: { ... },
      dataParser: ...,
      prefetch: prefetcher,
    },
    ```

    Alternatively, you can invoke a query with the remote server to obtain the default options and selections, or retrieve such data from an in-memory database or browser local storage. 
    
    ::: warning

    Regardless how you obtain the prefetch data, you should always invoke the `resolve` function at the very end of the prefetch workflow, otherwise, the data will not flow back to the control and used for default options and/or selections.

    :::


::: details example 

The following example shows a valid remote object definition:

```javascript
// in template:
<VueAhead :remote="remote" />

// in script code:
const parser = function (data) {
	return data.map(item => { label: item['name'], extraData: item, });
};

const prefetcher = async function (resolve) { 
  resolve(
    // array of the default options shown in the dropdown menu, before an user search
    [
      { label: 'White',  key: "white",  },
      { label: 'Blue',   key: "blur",   },
      { label: 'Green',  key: "green",  },
      { label: 'Gray',   key: "gray",   },
      { label: 'Black',  key: "black",  },
      { label: 'Yellow', key: "yellow", },
    ],
    // array of the keys of the options that shall be selected by default
    [ "white", ]
  );
};

const remote = {
	settings: {
		method: 'get',
		url: 'https://www.example.com/search',
		timeout: 2000,      
	},
	dataParser: parser,
	prefetch: prefetcher,
};

export default {
  data: {
    remote,
  },
  // ...
};
```

:::

### `singleSelRenderer` _(Vue-Object)_

  This attribute takes a `Vue` component object as the input, and it will be used to render the selected option in the input field in the single-selection-mode (i.e. `isMulti` is set to `false`).

  The component shall take (at least) the following `props`, which may drive the behavior of the item display or rendering result:

  * `defaultText` _(String)_ -- this is the default text content that will be displayed for the seleciton items if the `singleSelRenderer` is not set. Note that this text is post-formatted with the `display` functoin, if it's made available to the control.

  * `display` _(Function)_ -- this is the same `display` function passed to the control in the `display` attribute, and it should be used to format the display string if desired.

  * `item` _(Object)_ -- the original item object passed on to the control. It will be the same object from the `initOptions` array or from the `remote` resource.

  ::: details example

  Once the item is defined, import it to your component using the control, and provide the customized item component as the data source to the `optionRenderer` attribute:

  ```javascript
  // in template
  <VueAhead :initOptions="options" :multiSelRenderer="multiSelection" />

  // in your script
  import MultiSelection from '/path/to/multiSelection.vue';

  export default {
    data: {
      multiSelection: MultiSelection,
      options: [ ... ],
    },
    // ...
  };
  ```
  :::

## Public APIs and Events

### Events

The control will emit the `selection` event when user selections have changed, such as on the event of a user selection, or a removal of the existing selections. 

The event will not be invoked on control initialization or reset, even if default selections are provided.

Note that when operating in the `single-selection-mode`, selecting a new option from the dropdown menu will replace and remove the existing selection, if presented. In such occasions, only one single `selection` event is going to be raised. You can look at the `replaced` field of the event object for the previously selected item.

The event will contain the following fields:

* `type` _(String / Required)_ 

  The type of the event, possible values can only be either `add`, `remove`, or `clear`. 

  * `add` denotes to the transpiring of a user selection; 
  
  * `remove` denotes to the transpiring of a removal of one or all user selections; 
  
  * `clear` denotes to the transpiring of the selections being removed from the control, it can be triggered by user clearing the control, or the parent application calling the `clear` or `reset` methods while there are existing selected items (regardless of they're default selections or user selections). Note that not all `clear` or `reset` will fire the `selection` event -- it's only fired if there're selected items in the control

* `items` _(Array / Required)_

  The list of the currently selected items. If the control contains no selections (either from default selections or user selections), an empty array will be returned.

* `replaced` _(Object / Optional)_

  The item that has been replaced by a user selection. This field is only provided in the `add` type of events in `single-selection-mode`, and it's only populated if an existing item has been selected in the control prior to the event.

* `value` _(String / Optional)_

  The string user entered that leads the user selection. This field is only provided in the `add` type of events. The value can be different from the search terms used to filter or firing the search process, which use the trimmed and lower-cased version. 

* `removed` _(Array / Optional)_
	
  The item that has been removed by a user removal. This field is only provided in the `clear` or `remove` type of events. 
  
  If provided in the `clear` event type, the array will contain all items currently selected by the control. The length will always be 1 if the control is operating under the `single-selection-mode`, and the length will be 1 or more under the `multi-selection-mode`. 

  If provided in the `remove` event type, the array length will always be 1, and the control is operatining under the `multi-selection-mode`. 

::: warning

1. depending on the nature of the vent, __NOT__ all fields except `type` and `items` will be presented in the event object.

2. If there are no selections made to the control, the `selection` event will not fire even if a `clear` or `reset` event has been invoked.

:::

### Public APIs

Most of the methods listed on the control visible to the parent application are however private methods, which handle and maintain internal control states. You are not expected to invoke them directly. 

The only exceptions are listed below:

* `clear`: this method will clear user selections as well as the user entries to control's input field, if any. 

* `reset`: this method will reset the control to its initial state, which could contain default selections if present. 

## Styles and Decorations

It is possible to decorate the majority portion of the control the way an application would need to. 

Nevertheless, such jobs still need a good understanding of how the `CSS` decorations work for the control, and it's important to discuss `VueAhead`'s `CSS` class hierarchy, as shown below:

:::tip `CSS` Class Hierarchy

* `vue_ahead__control_container [class]`
  * `vue_ahead__control_wrapper [customClassNames.input]` or `vue_ahead__control_wrapper [customClassNames.active]`
    * `vue_ahead__input_container`
      * (single-selection-mode) `vue_ahead__plain_text` or `vue_ahead__plain_text vue_ahead__plain_text_values`
      * (multi-selection-mode) `vue_ahead__selection_container`
        * `vue_ahead__selection_content`
        * `vue_ahead__selection_removal`
    * `vue_ahead__icons_container`
      * `vue_ahead__action_icon`
      * `vue_ahead__action_icon_separator`
  * `vue_ahead__dropdown_wrapper [customClassNames.dropdown]`
    * `vue_ahead__dropdown_container`
      * (active option) `vue_ahead__menu_option vue_ahead__menu_option_active` 
      * (normal option) `vue_ahead__menu_option` 

_(contents inside the `[ ... ]` refer to the values passed to the named attribute)_
:::

In this structure:

* `control_container` controls the out-most geometry of the whole control, such as the width, maximum height, padding, margins, etc. It will be compounded with the value set to the `class` attribute.

* `vue_ahead__control_wrapper` controls the input control's looks and geometry, such as border style (or focused style), border radius, etc. An extra class with the value set in the `customClassNames.input` field will be added if the `customClassNames` attribute is set; and if the control is focused, it will take the compounded value from `customClassNames.input customClassNames.active` as the additional class names.

* `vue_ahead__input_container` controls the looks and geometry of the real input field, where users type the search terms; and `icons_container` controls the  looks and geometry of the action icons (i.e. the `cancel all` and `dropdown` icons on the right side end of the input control).

* `vue_ahead__dropdown_wrapper` controls the wrapping div over the dropdown menu, and it's usually used to control the positioning and look of the dropdown menu. An extra class with the value set in the `customClassNames.dropdown` field will be added as an additional class, such that control users can take charge of the dropdown menu styling. 

* `vue_ahead__dropdown_container` is where the actual contents are held in the dropdown menu, and it controls the inner content menu's height, width, etc.
:::

:::tip Example
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
