<template>
<div :class="classes">
  <div
    v-if="shield"
    :style="styles.shield"
    @mousedown.capture.stop="$emit('shield-click', $event)"
  >
    <h3 :style="styles.title">
      Loading ...
    </h3>
  </div>
  <div 
    class="dropdown_content"
    ref="contentWrapper"
  >
    <div v-for="(item, idx) in options" :key="item.key">
      <GroupLabel
        v-if="groups && groups.hasOwnProperty(idx)"
        :data="groups[idx]"
      />
      <Item
        v-if="!$options.components.CustomItem"
        :active="activeIdx === idx"
        :item="item"
        :index="idx"
        @mouseover="handleMouseOver"
        @mousedown.stop="$emit('item-selection', $event, item.key)"
        @item-activated="handleItemActivated"
      />
      <div 
        v-else
        :ref="'item_' + idx.toString()"
        @mouseover="handleMouseOver($event, idx)"
        @mousedown.stop="$emit('item-selection', $event, item.key)"
        @item-activated="handleItemActivated"
      >
        <CustomItem
          :active="activeIdx === idx"
          :item="item"
          :index="idx"
        />
      </div>
    </div>
    <div
      v-if="!options || options.length === 0"
      class="dropdown_empty_options"
    >
      {{ emptyText }}
    </div>
  </div>
</div>
</template>

<script>
import Item from "./dropdownItem.vue";

const shieldStyle = {
	position: 'absolute',
	display:  'default',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	textAlign: 'center',
	justifyContent: 'center',
	backgroundColor: '#F5F5F5',
	zIndex: 100000,
	opacity: 0.5,
	userSelect: 'none',
};

const shieldTitleStyle = {
	position: 'absolute',
	top: '50%',
	left: '0',
	textAlign: 'center',
	margin: '-12px 0 0 0',
	padding: 0,
	width: '100%',
	height: '100%',
};

export default {
	props: {
		className: String,
		groups: Object,
		options: {
      type: Array,
      default: new Array(),
    },
    isRemoteInit: Boolean,
    itemRenderer: Object,
		shield: Boolean,
	},
	components: {
		Item,
  },
  beforeMount() {    
		if (this.itemRenderer) {
      this.updateCustomItem();
		}
  },
	data: function () {
    this._manualMove = "";

		return {
			activeIdx: 0,
			classes: this.getClassName(),
			styles: {
				shield: shieldStyle,
				title: shieldTitleStyle,
      },
      emptyText: this.getEmptyText(),
		};
	},
	methods: {
		getClassName: function () {
			let className = "dropdown_container";

			if (this.className && this.className.dropdown) {
				className += " " + this.className.dropdown;
			}

			return className;
    },
    getEmptyText: function () {
      console.log('remote init?', this.isRemoteInit);

      return this.isRemoteInit ? "Type to search" : "No option";
    },
    updateCustomItem: function () {
			this.$options.components.CustomItem = this.itemRenderer;
    },
    move: function (dir) {
      let { activeIdx } = this;

      if (dir === 'down') {
        activeIdx++;
      } else {
        activeIdx--;
      }

      if (activeIdx >= this.options.length) {
        activeIdx = this.options.length - 1;
      }

      if (activeIdx < 0) {
        activeIdx = 0;
      }

      if (activeIdx !== this.activeIdx) {
        this._manualMove = dir;
        this.activeIdx = activeIdx;
      }
    },
    select: function () {
      if (this.activeIdx < 0 || this.activeIdx >= this.options.length) {
        return;
      }

      const item = this.options[this.activeIdx];
      this.$emit('item-selection', null, item.key);
    },
    handleItemActivated: function (offsetTop, offsetHeight = 30) {
      // console.log('offset top: ', offsetTop, offsetHeight);

      if (this.options.length < 4 || !this._manualMove) {
        return;
      }

      const wrapper = this.$refs.contentWrapper;
      const { height } = wrapper.getBoundingClientRect();
      const adjustedHeight = offsetHeight + 10;

      if (offsetTop > height - adjustedHeight && this._manualMove === 'down') {
        wrapper.scrollTo(0, offsetTop + adjustedHeight - height);
      } else if (offsetTop < wrapper.scrollTop && this._manualMove === 'up') {
        wrapper.scrollTo(0, wrapper.scrollTop - offsetHeight);
      }

      this._manualMove = '';
    },
		handleMouseOver: function (evt, idx) {
      // console.log('mouse over:', idx);

			if (idx < this.options.length) {
				this.activeIdx = idx;        
			} else {
        this.activeIdx = this.options.length - 1;
      }
      
      if (this.activeIdx < 0) {
        this.activeIdx = 0;
      }
		},
	},
	watch: {
    activeIdx: function () {
      if (!this.$options.components.CustomItem) {
        return;
      }

      const itemKey = `item_${this.activeIdx}`;

      if (this.$refs[itemKey] && this.$refs[itemKey].length === 1) {
        const { offsetTop, offsetHeight } = this.$refs[itemKey][0];
				this.handleItemActivated(offsetTop, offsetHeight);
      }
    },
		className: function () {
			this.classes = this.getClassName();
    },
    isRemoteInit: function () {
      this.emptyText = this.getEmptyText();
    },
    itemRenderer: function () {
      this.updateCustomItem();
    },
    options: function () {
      this.activeIdx = 0;
      this.$refs.contentWrapper.scrollTo(0, 0);
    },
	}
};
</script>

<style scoped>
.dropdown_container {
  top: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  margin: 2px 0;
  position: absolute;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  border-radius: 2px;
  animation: menu-appear 50ms;
}

@keyframes menu-appear {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.dropdown_content {
  max-height: 300px;
  overflow-y: auto;
  padding: 6px 0;
  position: relative;
  box-sizing: border-box;
  text-align: start;
}

.dropdown_empty_options {
  color: rgb(153, 153, 153);
  cursor: default;
  text-align: center;
  box-sizing: border-box;
  padding: 6px 12px;
}
</style>