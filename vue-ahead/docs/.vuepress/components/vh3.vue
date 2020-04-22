<template>
<div class="container">
  <VueAhead
    :remote="remote"
    :itemRenderer="item"
    class="control"
    placeholder="select a twitter handle"
  />
</div>
</template>

<script>
import VueAhead from '../../../src/main.js';
import OptionItem from './item.vue';

const parser = function (data) {
	return data.map(item => {
		return {
			label: item['name'],
			extraData: item,
		};
	});
};

const prefetcher = async function (cb) { 
  cb([]); 
};

const remote = {
	settings: {
		method: 'get',
		url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search',
		timeout: 1000,      
	},
	dataParser: parser,
	prefetch: prefetcher,
};

export default {
  components: {
    VueAhead,
  },
  data: function () {
		return {
      remote,      
			item: OptionItem,
    };
  },
}
</script>

<style scoped>
.container {
  margin: 20px 0;
  padding: 20px;
  max-width: 800px;
  background-color: #E3F2FD;
  border-radius: 8px;
}

.control {
  max-width: 360px;
}
</style>