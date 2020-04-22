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