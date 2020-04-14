<template>
<div :class="classes" @click="$emit('click', $event)">
  <div 
    class="dropdown_content"
    ref="contentWrapper"
  >
    <div v-for="(item, idx) in options" :key="getItemKey(item, idx)">
      <GroupLabel
        v-if="groups && groups.hasOwnProperty(idx)"
        :data="groups[idx]"
      />
      <Item
        @mouseover="handleMouseOver"
        @mousedown.stop="handleItemClick"
        :active="activeIdx === idx"
        :item="item"
        :index="idx"
      />
    </div>
    <div
      v-if="!options || options.length === 0"
      class="dropdown_empty_options"
    >
      No options
    </div>
  </div>
</div>
</template>

<script>
import Item from "./dropdownItem.vue";

export default {
  props: {
    className: String,
    grouped: Boolean,
    options: Array,
    groups: Object,
  },
  components: {
    Item,
  },
  data: function () {
    return {
      activeIdx: 0,
      classes: this.getClassName(),
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
    getItemKey: function (item, idx) {
      return idx.toString() + "#" + item.label;
    },
    handleMouseOver: function (evt, idx) {
      if (idx < this.options.length) {
        this.activeIdx = idx;        
      } else {
        this.activeIdx = this.options.length - 1;
      }
    },
    handleItemClick: function (evt, idx) {
      this.$emit('item-selection', evt, idx);
    },
  },
  watch: {
    className: function () {
      this.classes = this.getClassName();
    },
  }
}
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