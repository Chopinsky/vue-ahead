<template>
<div>
	{{ main }}<div :style="style">{{ supp }}</div>
</div>
</template>

<script>
export default {
	props: {
		defaultText: String,
		display: Function,
		item: Object,
	},
	data: function () {
		const { main, supp } = this.handleDisplayValues(this.item);

		return {
			main,
			supp,
			style: {
				display: "inline-block",
				marginLeft: "4px",
				textTransform: "uppercase",
				opacity: 0.5,
			},
		};
	},
	methods: {
		handleDisplayValues: function (item) {
			let main = '', supp = '';

			if (item) {
				main = item['label'];
				supp = `(@${item['group'] || 'N/A'})`;
			}

			if (main && main.length > 24) {
				main = main.substr(0, 20) + ' ... ';
			}

			return { main, supp };
		}
	},
	watch: {
		selection: function () {
			const { main, supp } = this.handleDisplayValues(this.item);

			this.main = main;
			this.supp = supp;
		},
	}
};
</script>

<style>

</style>