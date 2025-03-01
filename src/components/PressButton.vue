<script setup lang="ts">
import type { IPressButtonProps } from '@/types/componentTypes';

const props = defineProps<IPressButtonProps>();
</script>

<template>
	<button class="btn" @click="func">{{ props.text }}</button>
</template>

<style scoped lang="scss">
.btn {
	min-width: 102px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	color: white;
	background-color: #66b2f3;
	padding: 5px;
	font-weight: bold;
}

.btn:hover {
	opacity: 0.8;
}

.btn:active {
	opacity: 0.7;
}

.active {
	background-color: #5187ec;
}
</style>
