<template>
<div class="control_wrapper" @click="$emit('click', $event)">
  <div class="input_container">
    <div class="contentHolder_container">
    </div>

    <div class="multi_selection_container">
    </div>

    <div style="display: 'inline-block';">
      <input           
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        type="text" 
        ref="input"
        :value="value"
        :style="inputStyle"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="handleKeydown"
        @input="handleInput"
      />
      <div 
        ref="contentHolder"
        :style="contentHolderStyle"
      >
      </div>
    </div>

  </div>
  <div class="icons_container">

  </div>
</div>
</template>

<script>
const inputStyle = {
  boxSizing: "content-box",
  color: "inherit",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  minWidth: "1px",
  marginTop: "2px",
  width: '2px',
  outline: "none",
  border: 0,
};

const contentHolderStyle = {
  position: "absolute",
  top: "0px",
  left: "0px",
  visibility: "hidden",
  height: "0px",
  width: "min-content",
  overflow: "auto",
  whiteSpace: "pre",
  fontSize: "inherit",
  fontFamily: "inherit",
  fontWeight: "inherit",
  fontStyle: "normal",
  letterSpacing: "normal",
  textTransform: "none",
};

export default {
  props: {
    value: String,
  },
  data: function () {
    return {
      contentHolderStyle,
      inputStyle: Object.assign({}, inputStyle),
      width: 2,
    }
  },
  methods: {
    focus: function () {
      this.$refs.input.focus();
    },
    handleInput: function (evt) {
      const val = evt && evt.target && evt.target.value || '';

      this.$refs.contentHolder.innerText = val;
      this.inputStyle.width = `${this.$refs.contentHolder.offsetWidth}px`;

      this.$emit('change', evt, val);
    },
    handleKeydown: function (evt) {
      const val = evt && evt.target && evt.target.value || '';
    },
  },
  watch: {
    value: function () {
      if (this.value === '') {        
        this.$refs.contentHolder.innerText = '';
        this.inputStyle.width = "2px";
      }
    }
  }
}
</script>

<style scoped>
.control_wrapper {	
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding-left: 6px;
  padding-right: 2px;
  min-height: 38px;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  border: 1px solid rgb(204, 204, 204);
  cursor: default;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: all 100ms ease 0s;
  outline: 0px !important;
}

.input_container {
  padding: 2px;
  color: rgb(51, 51, 51);
  position: relative;
  display: flex;
  flex: 1 1 0%;
  flex-wrap: wrap;
  box-sizing: border-box;
  overflow: hidden;
  visibility: visible;
  box-sizing: border-box;
  width: 100%;
}
</style>