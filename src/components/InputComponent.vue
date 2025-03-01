<template>
	<div class="form-input">
		<input type="text" :name="nameProps" :id="idProps" v-model="modelValue" />
		<label :for="forProps">{{ labelNameProps }}</label>
	</div>
</template>

<script setup lang="ts">
import type { IInputComponentEmits, IInputComponentProps } from '@/types/componentTypes'
import { defineComponent, ref, toRefs, watch } from 'vue'

defineComponent({ name: 'InputComponent' })

const props = defineProps<IInputComponentProps>()
const { modelProps } = toRefs(props)

const emits = defineEmits<IInputComponentEmits>()

const modelValue = ref<number>(modelProps.value)

watch(modelValue, (newValue) => emits('inputEmit', newValue), { immediate: true })
</script>

<style scoped lang="scss">
.form-input {
	margin-bottom: 20px;
	width: 200px;
	display: block;
	position: relative;
	box-sizing: border-box;
}

input[type='text'] {
	padding: 24px 16px 8px;
	height: 50px;
	font-size: 16px;
	line-height: 24px;
	text-overflow: unset;
	outline: none;
	box-sizing: border-box;
	transition:
		color 0.2s ease-out,
		border-color 0.2s ease-out;
	width: 100%;
	color: #212121;
	border: 1px solid #d6d9e0;
	font-family: inherit;
	margin: 0px;
	appearance: none;
	backface-visibility: hidden;
	border-radius: 8px;
}

input[type='text']:hover {
	border: 1px solid #039be5;
}

input[type='text'] ~ label {
	font-size: 12px;
	line-height: 14px;
	top: 8px;
	transform: none;
	display: block;
	color: rgb(104, 112, 130);
	transition: 0.2s;
	position: absolute;
	left: 0px;
	padding: 0px 16px;
	box-sizing: border-box;
	pointer-events: none;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	z-index: 1;
}
</style>
