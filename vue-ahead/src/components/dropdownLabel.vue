<template>
<div class="group_label" @mousedown="$emit('mousedown', $event)">
    <span>
      {{ data.label || "Default" }}
    </span>
    <span class="group_label_icon">
      {{ data.count || 0 }}
    </span>
</div>
</template>

<script>
export default {
	props: {
		data: Object,
	}
};
</script>

<style scoped>
.group_label {
  color: rgb(153, 153, 153);
  cursor: default;
  display: block;
  font-size: 75%;
  font-weight: 500;
  margin-bottom: 0.25em;
  padding: 2px 12px;
  text-transform: uppercase;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group_label_icon {
  background-color: #EBECF0;
  border-radius: 0.75em;
  color: #172B4D;
  display: inline-block;
  font-size: 10;
  font-weight: normal;
  line-height: 1;
  text-align: center;
  min-width: 1;
  padding: 0.16666666666667em 0.5em;
}
</style>