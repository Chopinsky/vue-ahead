<template>
<div class="container" @click="$emit('click', $event)">
  
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
}
</style>