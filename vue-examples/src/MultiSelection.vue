<template>
<div>
	<i :class="icon"></i>
	{{ defaultText }}
</div>
</template>

<script>
export default {
	props: {
		item: Object,
		defaultText: String,
		display: Function,
	},
	data: function () {
		let text = this.defaultText;
		let icon;

		if (!text) {
			let text = this.item['label'];

			if (text && text.length > 12) {
				text = text.substr(0, 10) + "...";
			}
		}

		switch (text[0].toLowerCase()) {
			case 'a':
				icon = "fas fa-palette";
				break;

			case 'e':
				icon = "fas fa-cogs";
				break;

			case 'm':
				icon = "fas fa-pills";
				break;

			case 'p':
				icon = "fas fa-atom";
				break;

			case 's':
				icon = "fas fa-microscope";
				break;

			case 't':
				icon = "fas fa-microchip";
				break;
		
			default:
				icon = "fas fa-book";
				break;
		}

		return {
			text: this.defaultText,
			icon,
		};
	},
	watch: {
		item: function () {
			if (this.defaultText) {
				return;
			}


		},
	},
};
</script>

<style>

</style>