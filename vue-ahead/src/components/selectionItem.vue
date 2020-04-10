<template>
  
</template>

<script>
export default {

}
</script>

<style>
.selection_container {
  background-color: rgb(230, 230, 230);
  display: flex;
  min-width: 0px;
  box-sizing: border-box;
  border-radius: 2px;
  margin: 2px 4px 2px 0;
}

.selection_content {
  color: rgb(51, 51, 51);
  font-size: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  padding: 2px 3px 4px 6px;
}

.selection_removal {
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
  border-radius: 2px;
}

.selection_removal:hover {
  background-color: rgb(255, 189, 173);
  color: rgb(222, 53, 11);
}
</style>