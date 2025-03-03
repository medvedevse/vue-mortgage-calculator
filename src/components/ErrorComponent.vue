<template>
	<div class="error">{{ message }}</div>
</template>

<script setup lang="ts">
export interface IErrorComponentProps {
	message?: string;
}

const errorMessage: string = 'При запросе возникла ошибка!';

withDefaults(defineProps<IErrorComponentProps>(), { message: errorMessage });
</script>

<style scoped lang="scss">
.error {
	max-width: 250px;
	padding: 2px 6px;
	background: lightcoral;
	color: white;
	border-radius: 4px;
}
</style>
